resource "aws_security_group" "ptft_alb_sec_group" {
  name = "ptft-alb-sec-group"
  vpc_id = aws_vpc.ptft_vpc.id

  ingress {
    protocol = "tcp"
    from_port        = 80
    to_port          = 80
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    protocol         = "tcp"
    from_port        = 443
    to_port          = 443
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    protocol         = "-1"
    from_port        = 0
    to_port          = 0
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = var.common_tags
}

resource "aws_security_group" "ptft_ecs_sec_group" {
  name = "ptft-ecs-sec-group"
  vpc_id = aws_vpc.ptft_vpc.id

  ingress {
    protocol         = "tcp"
    from_port        = 3001
    to_port          = 3001
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    protocol         = "-1"
    from_port        = 0
    to_port          = 0
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = var.common_tags
}

resource "aws_security_group" "ptft_rds_sec_group" {
  name = "ptft-rds-sec-group"
  vpc_id = aws_vpc.ptft_vpc.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = ["${aws_security_group.ptft_ecs_sec_group.id}"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.common_tags
}