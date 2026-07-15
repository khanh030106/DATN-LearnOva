#!/bin/bash
# Manual "I want to use the cloud demo now" switch — starts EC2 if stopped
# and re-creates the ALB (var.alb_enabled=true). Run by hand, no automation.
set -euo pipefail

REGION="ap-southeast-1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TF_DIR="$SCRIPT_DIR/../infra/terraform"

echo "==> Looking up instance..."
IID=$(aws ec2 describe-instances --region "$REGION" \
  --filters "Name=tag:Name,Values=learnova-app" "Name=instance-state-name,Values=running,stopped" \
  --query "Reservations[0].Instances[0].InstanceId" --output text)

if [ "$IID" = "None" ] || [ -z "$IID" ]; then
  echo "No instance found with tag Name=learnova-app in $REGION" >&2
  exit 1
fi
echo "==> Instance: $IID"

STATE=$(aws ec2 describe-instances --instance-ids "$IID" --region "$REGION" \
  --query "Reservations[0].Instances[0].State.Name" --output text)
if [ "$STATE" != "running" ]; then
  echo "==> Starting EC2 (currently $STATE)..."
  aws ec2 start-instances --instance-ids "$IID" --region "$REGION" >/dev/null
fi
aws ec2 wait instance-running --instance-ids "$IID" --region "$REGION"
aws ec2 wait instance-status-ok --instance-ids "$IID" --region "$REGION"
echo "==> EC2 running."

echo "==> Bringing ALB back up..."
(cd "$TF_DIR" && terraform apply -auto-approve -var="alb_enabled=true")

echo "==> Done. https://datn.khanh.engineer should respond within ~30s."
