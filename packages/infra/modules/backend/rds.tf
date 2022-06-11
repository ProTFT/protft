resource "aws_db_subnet_group" "_" {
  name       = "meugrupo"
  subnet_ids = aws_subnet.public.*.id
}

resource "aws_security_group" "db" {
  vpc_id = aws_vpc.main.id
  name   = "${var.service_name}db-Private"

  ingress {
    from_port   = var.db_port
    to_port     = var.db_port
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
    Name = "${var.service_name}db-Private"
  }
}

resource "aws_db_instance" "default" {
  allocated_storage      = var.db_allocated_storage
  db_subnet_group_name   = aws_db_subnet_group._.id
  engine                 = var.db_engine
  engine_version         = var.db_engine_version
  instance_class         = var.db_instance_class
  storage_encrypted      = var.db_storage_encrypted
  license_model          = var.db_license_model
  db_name                = var.db_name
  username               = var.db_instance_username
  password               = var.db_instance_password
  publicly_accessible    = var.db_publicly_accessible
  skip_final_snapshot    = var.db_final_snapshot
  vpc_security_group_ids = [aws_security_group.db.id]
}
