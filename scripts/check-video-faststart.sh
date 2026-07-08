#!/usr/bin/env bash
# Scan videos in S3 and report whether the MP4 'moov' atom is positioned
# before the 'mdat' atom (faststart / progressive playback) or after it
# (player must seek to the end of the file before playback can start).
# Also reports duration/resolution/bitrate so files can be compared by
# actual encoding weight, not just perceived size.
#
# Requires: aws cli (configured with read access to the bucket), ffprobe.
#
# Usage:
#   AWS_S3_BUCKET_NAME=my-bucket AWS_REGION=ap-southeast-1 ./scripts/check-video-faststart.sh [prefix]
#
# [prefix] defaults to "course-video/". Output is CSV:
#   key,size_bytes,duration_s,resolution,bitrate_kbps,status

set -euo pipefail

BUCKET="${AWS_S3_BUCKET_NAME:?Set AWS_S3_BUCKET_NAME}"
REGION="${AWS_REGION:?Set AWS_REGION}"
PREFIX="${1:-course-video/}"

check_one() {
    local key="$1"
    local url
    url=$(aws s3 presign "s3://${BUCKET}/${key}" --region "$REGION" --expires-in 300)

    local size
    size=$(aws s3api head-object --bucket "$BUCKET" --key "$key" --region "$REGION" --query ContentLength --output text 2>/dev/null || echo "")

    local probe duration resolution bitrate
    probe=$(ffprobe -v error -select_streams v:0 \
        -show_entries stream=width,height,bit_rate:format=duration,bit_rate \
        -of default=noprint_wrappers=1 "$url" 2>/dev/null || echo "")
    duration=$(echo "$probe" | grep -m1 '^duration=' | cut -d= -f2)
    resolution="$(echo "$probe" | grep -m1 '^width=' | cut -d= -f2)x$(echo "$probe" | grep -m1 '^height=' | cut -d= -f2)"
    bitrate=$(echo "$probe" | grep '^bit_rate=' | head -1 | cut -d= -f2)
    if [ -n "${bitrate:-}" ] && [ "$bitrate" != "N/A" ]; then
        bitrate=$((bitrate / 1000))
    else
        bitrate="unknown"
    fi

    local matches moov_line mdat_line status
    matches=$(ffprobe -v trace -i "$url" 2>&1 | grep -n -E "type:'(moov|mdat)'" || true)
    moov_line=$(echo "$matches" | grep "type:'moov'" | head -1 | cut -d: -f1)
    mdat_line=$(echo "$matches" | grep "type:'mdat'" | head -1 | cut -d: -f1)

    if [ -n "${moov_line:-}" ] && [ -n "${mdat_line:-}" ]; then
        if [ "$moov_line" -lt "$mdat_line" ]; then
            status="OK (faststart)"
        else
            status="NEEDS FIX (moov after mdat)"
        fi
    elif [ -n "${moov_line:-}" ]; then
        status="OK (faststart)"
    else
        status="ERROR (could not probe)"
    fi

    echo "${key},${size:-unknown},${duration:-unknown},${resolution},${bitrate},${status}"
}

echo "key,size_bytes,duration_s,resolution,bitrate_kbps,status"

aws s3 ls "s3://${BUCKET}/${PREFIX}" --recursive --region "$REGION" | awk '{print $4}' | while read -r key; do
    [ -z "$key" ] && continue
    check_one "$key" || echo "${key},,ERROR (script failure)"
done
