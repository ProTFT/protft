resource "aws_lb" "ptft_lb" {
  name               = "ptft-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = ["${aws_security_group.ptft_alb_sec_group.id}"]
  subnets            = ["${aws_subnet.ptft_public_subnet_az1.id}", "${aws_subnet.ptft_public_subnet_az2.id}"]

  enable_deletion_protection = false
}

resource "aws_alb_target_group" "ptft_tg" {
  name        = "ptft-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.ptft_vpc.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = "/"
    unhealthy_threshold = "2"
  }

  depends_on = [aws_lb.ptft_lb]
}

resource "aws_alb_listener" "ptft_http_alb_listener" {
  load_balancer_arn = aws_lb.ptft_lb.id
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_alb_listener" "ptft_https_alb_listener" {
  load_balancer_arn = aws_lb.ptft_lb.id
  port              = 443
  protocol          = "HTTPS"

  ssl_policy      = "ELBSecurityPolicy-2016-08"
  certificate_arn = aws_acm_certificate_validation.cert_validation.certificate_arn

  default_action {
    target_group_arn = aws_alb_target_group.ptft_tg.id
    type             = "forward"
  }
}
