resource "aws_cloudwatch_log_group" "ptft_log_group" {
  name              = "awslogs-ptft-api"
  retention_in_days = 1
  tags              = var.common_tags
}

resource "aws_cloudwatch_log_stream" "ptft_log_stream" {
  name           = "awslogs-ptft-api"
  log_group_name = aws_cloudwatch_log_group.ptft_log_group.name
}