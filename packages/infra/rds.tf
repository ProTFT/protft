resource "aws_db_subnet_group" "ptft_db_subnet_group" {
  name       = "ptft-db-subnet-group"
  subnet_ids = [aws_subnet.ptft_public_subnet_az1.id, aws_subnet.ptft_public_subnet_az2.id]

  tags = var.common_tags
}

resource "aws_db_instance" "ptft_db" {
  allocated_storage       = 20
  backup_retention_period = 7
  db_name                 = "ptft"
  db_subnet_group_name    = aws_db_subnet_group.ptft_db_subnet_group.name
  engine                  = "postgres"
  engine_version          = "12"
  instance_class          = "db.t2.micro"
  max_allocated_storage   = 0
  username                = var.db_username
  password                = var.db_password
  publicly_accessible     = true
  skip_final_snapshot     = true
  vpc_security_group_ids  = ["${aws_security_group.ptft_rds_sec_group.id}"]
  tags                    = var.common_tags
}