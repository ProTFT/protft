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
        {name = "NODE_ENV", value = "production"},
        {name = "DATABASE_URL", value = var.db_url},
        {name = "SIGNIN_KEY", value = var.signin_key}
    ]
    portMappings = [{
      protocol      = "tcp"
      containerPort = 3001
      hostPort      = 3001
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group" = "awslogs-ptft-api",
        "awslogs-region" = "us-east-1",
        "awslogs-stream-prefix" = "awslogs-ptft-api"
      }
    }
  }])

  tags = var.common_tags
}
