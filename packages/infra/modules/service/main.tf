resource "aws_cloudwatch_log_group" "java" {
  name = "/ecs/${aws_ecs_task_definition.java.tags.name}"
}

resource "aws_cloudwatch_log_group" "csharp" {
  name = "/ecs/${aws_ecs_task_definition.csharp.tags.name}"
}

resource "aws_ecs_task_definition" "java" {
  family = "service-java"
  task_role_arn = aws_iam_role.ecs_task.arn
container_definitions = jsonencode(  [
    {
      "cpu": 512,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
            "awslogs-group": "/ecs/service-java",
            "awslogs-region": "${var.region}",
            "awslogs-stream-prefix": "ecs"
             }
          },
        "environment": [
          {
            "name": "SPRING_PROFILES_ACTIVE",
            "value": "prod"
          },
          {
            "name": "DB_URL",
            "value": "jdbc:sqlserver://${var.db_instance_address}:${tostring(var.db_instance_port)};database=MiniShop;"
          },
          {
            "name": "DB_USER",
            "value": "${var.db_instance_username}"
          },
          {
            "name": "DB_PASS",
            "value": "${var.db_instance_password}"
          },
          {
            "name": "AWS_BUCKET",
            "value": "${var.bucket_name}"
          },
          {
            "name": "AWS_REGION",
            "value": "${var.region}"
          },          
          {
            "name": "UPLOAD_DIR",
            "value": "/tmp/"
          }
        ],
      "essential": true,
      "image": "${var.java_image}",
      "memory": 450,
      "name": "java-container",
      "portMappings": [
        {
          "containerPort": 8080,
          "hostPort": 0
        }
      ]
    }
  ])
tags = {
  name = "service-java"
}
lifecycle {
  ignore_changes = [
    container_definitions
  ]
}
}

resource "aws_ecs_task_definition" "csharp" {
  family = "service-csharp"
  task_role_arn = aws_iam_role.ecs_task.arn
container_definitions = jsonencode([
{
      "cpu": 512,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
            "awslogs-group": "/ecs/service-csharp",
            "awslogs-region": "${var.region}",
            "awslogs-stream-prefix": "ecs"
             }
          },
        "environment": [
          {
            "name": "aspnetcore_environment",
            "value": "Production"
          },
          {
            "name": "aws__key",
            "value": "${var.access_key}"
          },
          {
            "name": "aws__secret",
            "value": "${var.secret_key}"
          },
          {
            "name": "aws__bucket",
            "value": "${var.bucket_name}"
          },
          {
            "name": "ConnectionStrings__DefaultConnection",
            "value": "Server=${var.db_instance_address};Database=MiniShop-AspNet;User ID=${var.db_instance_username};Password=${var.db_instance_password}"
          }
        ],
      "essential": true,
      "image": "${var.csharp_image}",
      "memory": 450,
      "name": "csharp-container",
      "portMappings": [
        {
          "containerPort": 8080,
          "hostPort": 0
        }
      ]
    }
  ])
tags = {
  name = "service-csharp"
}
lifecycle {
  ignore_changes = [
    container_definitions
  ]
}
}

resource "aws_ecs_service" "java-container" {
    name = "meu-servico-java"
    cluster = var.aws_ecs_cluster
    task_definition = "${aws_ecs_task_definition.java.arn}"
    desired_count = 1

    load_balancer {
        target_group_arn = aws_lb_target_group.tg.0.arn
        container_name = "java-container"
        container_port = 8080
    }

    lifecycle {
      ignore_changes = [
        task_definition,
      ]
    }
}

resource "aws_ecs_service" "csharp-container" {
    name = "meu-servico-csharp"
    cluster = var.aws_ecs_cluster
    task_definition = "${aws_ecs_task_definition.csharp.arn}"
    desired_count = 1

    load_balancer {
        target_group_arn = aws_lb_target_group.tg.1.arn
        container_name = "csharp-container"
        container_port = 8080
    }
        lifecycle {
      ignore_changes = [
        task_definition,
      ]
    }
}

