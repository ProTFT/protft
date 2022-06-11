resource "aws_launch_configuration" "ecs_launch_config" {
    image_id             = var.image_id
    security_groups      = [aws_security_group.web-sg.id]
    iam_instance_profile = aws_iam_instance_profile.ecs.id
    instance_type        = var.ec2_instance_type
    user_data            = "#!/bin/bash\necho ECS_CLUSTER=${aws_ecs_cluster.default.name} > /etc/ecs/ecs.config"
}

resource "aws_autoscaling_group" "ecs_asg" {
    name                      = var.aws_autoscaling_group_name
    vpc_zone_identifier       = aws_subnet.public.*.id
    launch_configuration      = aws_launch_configuration.ecs_launch_config.name

    desired_capacity          = var.asg_desired_capacity
    min_size                  = var.asg_min_size
    max_size                  = var.asg_max_size
    health_check_grace_period = var.asg_health_check_grace_period
    health_check_type         = var.asg_health_check_type
    enabled_metrics           = [
          "GroupTotalInstances",
        ]
}

resource "aws_autoscaling_policy" "asg-policy" {
  name                   = "asg-policy"
  policy_type = var.asg_policy_type
  autoscaling_group_name = "${aws_autoscaling_group.ecs_asg.name}"
  
  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = var.asg_predefined_metric_type
    }

    target_value = var.asg_target_value
  }
}

resource "aws_ecs_cluster" "default" {
  name = var.cluster_name
}

# resource "aws_autoscaling_schedule" "asg_schedule" {
#   scheduled_action_name  = "instances_shutdown"
#   min_size               = 0
#   max_size               = 0
#   desired_capacity       = 0
#   recurrence             = "0 0-7 * * *"
#   time_zone              = "America/Sao_Paulo"
#   start_time             = "2022-02-23T00:00:00Z"
#   autoscaling_group_name = var.aws_autoscaling_group_name
# }
