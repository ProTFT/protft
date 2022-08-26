resource "aws_ecs_cluster" "ptft_ecs_cluster" {
  name = "ptft-cluster"
  tags = var.common_tags
}