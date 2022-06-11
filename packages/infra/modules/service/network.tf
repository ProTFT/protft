resource "aws_lb" "tg" {
  count = var.lb_quantity
  name               = "LB-${count.index}"
  internal           = var.lb_internal
  load_balancer_type = var.load_balancer_type
  security_groups    = [var.aws_security_group.id]
  subnets            = var.aws_subnet.*.id
}

resource "aws_lb_target_group" "tg" {
  count = var.lb_quantity
  name     = "target-group-${count.index}"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.aws_vpc

    health_check {
    path                = "/api/products/1"
    port                = "traffic-port"
    protocol            = "HTTP"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    matcher             = "200"
  }
}

resource "aws_lb_listener" "app_serve" {
  count = var.lb_quantity
  load_balancer_arn = aws_lb.tg[count.index].arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg[count.index].arn
  }
}