resource "aws_ecs_service" "main" {
  name                               = "ptft_ecs_service"
  cluster                            = aws_ecs_cluster.ptft_ecs_cluster.id
  task_definition                    = aws_ecs_task_definition.ptft_ecs_task.id
  desired_count                      = 1
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  health_check_grace_period_seconds  = 180
  launch_type                        = "FARGATE"
  scheduling_strategy                = "REPLICA"

  network_configuration {
    subnets          = [aws_subnet.ptft_public_subnet_az1.id, aws_subnet.ptft_public_subnet_az2.id]
    assign_public_ip = true
    security_groups  = ["${aws_security_group.ptft_ecs_sec_group.id}"]
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.ptft_tg.arn
    container_name   = "ptft_container"
    container_port   = 3001
  }
  # desired_count is ignored as it can change due to autoscaling policy
  lifecycle {
    ignore_changes = [task_definition, desired_count]
  }
}
