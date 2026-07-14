output "route53_ns_delegation" {
  description = "Set these 4 values in name.com's Manage Nameservers page for the whole domain (replace whatever is currently there). Everything downstream (ACM validation, ALB alias) is then automatic."
  value       = aws_route53_zone.app.name_servers
}

output "alb_dns_name" {
  description = "Informational only — DNS now points here automatically via the Route53 alias record"
  value       = aws_lb.app.dns_name
}

output "ec2_instance_id" {
  description = "Used by the GitHub Actions deploy workflow to target the instance via SSM"
  value       = aws_instance.app.id
}

output "github_actions_role_arn" {
  description = "Set as AWS_ROLE_ARN in the GitHub Actions workflow / repo secret"
  value       = aws_iam_role.github_actions_deploy.arn
}
