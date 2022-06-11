variable "aws_ecs_cluster" {
  description = "cluster"
}

variable "aws_vpc" {
  description = "Main vpc"
}

variable "aws_security_group" {
  description = "security group default"
}

variable "aws_subnet" {

}

variable "lb_quantity" {
  description = "Quantidade de Load Balancers"
  default = 2
}

variable "load_balancer_type" {
  description = "Tipo de Load Balancer"
  default = "application"
}

variable "lb_internal" {
  description = "Define se o LB será privado"
  default = false
}

variable "db_instance_address" {

}

variable "db_instance_port" {

}

variable "db_instance_username" {
  
}

variable "db_instance_password" {
  
}

variable "bucket_name" {
  
}

variable "region" {
    description = "Região de execução"
}

variable "java_image" {

}

variable "csharp_image" {
  
}

variable "access_key" {
  description = "Chave de acesso aws"
}

variable "secret_key" {
  description = "Chave de acesso secreta"
}