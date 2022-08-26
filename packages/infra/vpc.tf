resource "aws_vpc" "ptft_vpc" {
  cidr_block = "10.0.0.0/16"

  tags = var.common_tags
}

resource "aws_internet_gateway" "ptft_internet_gateway" {
    vpc_id = aws_vpc.ptft_vpc.id
    tags = var.common_tags
}

resource "aws_subnet" "ptft_public_subnet_az1" {
  vpc_id = aws_vpc.ptft_vpc.id
  cidr_block = "10.0.16.0/20"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true
  tags = var.common_tags
}

resource "aws_subnet" "ptft_public_subnet_az2" {
  vpc_id = aws_vpc.ptft_vpc.id
  cidr_block = "10.0.48.0/20"
  availability_zone = "us-east-1b"
  map_public_ip_on_launch = true
  tags = var.common_tags
}

resource "aws_route_table" "ptft_route_table" {
  vpc_id = aws_vpc.ptft_vpc.id
  tags = var.common_tags
}

resource "aws_route" "ptft_route" {
  route_table_id = aws_route_table.ptft_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.ptft_internet_gateway.id
}

resource "aws_route_table_association" "ptft_route_table_assoc_az1" {
  subnet_id = aws_subnet.ptft_public_subnet_az1.id
  route_table_id = aws_route_table.ptft_route_table.id
}

resource "aws_route_table_association" "ptft_route_table_assoc_az2" {
  subnet_id = aws_subnet.ptft_public_subnet_az2.id
  route_table_id = aws_route_table.ptft_route_table.id
}