resource "aws_vpc" "main" {
  cidr_block       = var.vpc_cidr_block
  instance_tenancy = "default"
  enable_dns_support = var.vpc_dns
  enable_dns_hostnames = var.vpc_dns

  tags = {
    Name = "${var.service_name}-vpc"
  }
}

resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.service_name}-internet-gateway"
  }
}

resource "aws_default_route_table" "public" {
  default_route_table_id = aws_vpc.main.main_route_table_id

  tags = {
    Name = "${var.service_name}-public"
  }
}

resource "aws_route" "public_internet_gateway" {
  count                  = length(local.public_subnets)
  route_table_id         = aws_default_route_table.public.id
  destination_cidr_block = var.allow_general_ips
  gateway_id             = aws_internet_gateway.this.id
}

resource "aws_route_table_association" "public" {
  count          = length(local.public_subnets)
  subnet_id      = element(aws_subnet.public.*.id, count.index)
  route_table_id = aws_default_route_table.public.id
}

resource "aws_security_group" "default" {
  vpc_id = aws_vpc.main.id
  name   = "${var.service_name}SG-LB"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = [var.allow_general_ips]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.allow_general_ips]
  }

  tags = {
    Name = "${var.service_name}SG-LB"
  }
}

resource "aws_security_group" "web-sg" {
  vpc_id = aws_vpc.main.id
  name   = "${var.service_name}SG-Private"
  ingress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    security_groups = [aws_security_group.default.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.allow_general_ips]
  }

  tags = {
    Name = "${var.service_name}SG-Private"
  }
}

locals {
  public_subnets = {
    "${var.region}a" = "10.10.101.0/24"
    "${var.region}b" = "10.10.102.0/24"
    "${var.region}c" = "10.10.103.0/24"
  }
}

resource "aws_subnet" "public" {
  count      = length(local.public_subnets)
  cidr_block = element(values(local.public_subnets), count.index)
  vpc_id     = aws_vpc.main.id

  map_public_ip_on_launch = true
  availability_zone       = element(keys(local.public_subnets), count.index)

  tags = {
    Name = "${var.service_name}-service-public"
  }
}