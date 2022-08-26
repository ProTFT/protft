resource "aws_ecs_task_definition" "ptft_ecs_task" {
  family                   = "ptft_task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  container_definitions = jsonencode([{
    name        = "ptft_container"
    image       = aws_ecr_repository.ptft_ecr.repository_url
    essential   = true
    environment = [
        {name = "NODE_ENV", value = "production"}
    ]
    portMappings = [{
      protocol      = "tcp"
      containerPort = 3001
      hostPort      = 3001
    }]
  }])

  tags = var.common_tags
}