#!/bin/bash
# Manual "done for now" switch — tears down the ALB (var.alb_enabled=false,
# stops billing immediately) and stops EC2 right away instead of waiting for
# the nightly cron. Run by hand, no automation.
set -euo pipefail

REGION="ap-southeast-1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TF_DIR="$SCRIPT_DIR/../infra/terraform"

echo "==> Tearing down ALB..."
(cd "$TF_DIR" && terraform apply -auto-approve -var="alb_enabled=false")

echo "==> Looking up instance..."
IID=$(aws ec2 describe-instances --region "$REGION" \
  --filters "Name=tag:Name,Values=learnova-app" "Name=instance-state-name,Values=running,stopped" \
  --query "Reservations[0].Instances[0].InstanceId" --output text)

if [ "$IID" = "None" ] || [ -z "$IID" ]; then
  echo "No instance found with tag Name=learnova-app in $REGION" >&2
  exit 1
fi

STATE=$(aws ec2 describe-instances --instance-ids "$IID" --region "$REGION" \
  --query "Reservations[0].Instances[0].State.Name" --output text)
if [ "$STATE" = "running" ]; then
  echo "==> Stopping EC2 ($IID)..."
  aws ec2 stop-instances --instance-ids "$IID" --region "$REGION" >/dev/null
else
  echo "==> EC2 already $STATE."
fi

echo "==> Done. ALB removed, EC2 stopping. Data/containers untouched — cloud-up.sh brings both back."
