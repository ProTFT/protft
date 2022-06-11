output "aws_ecs_cluster" {
  value = aws_ecs_cluster.default
}

output "db_instance_address" {
    value = aws_db_instance.default.address
}

output "db_instance_port" {
    value = aws_db_instance.default.port
}

output "aws_vpc" {
  value = aws_vpc.main
}

output "aws_security_group" {
  value = aws_security_group.default
}

output "aws_subnet" {
  value = aws_subnet.public.*
}