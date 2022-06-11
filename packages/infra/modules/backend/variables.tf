variable "bucket_name" {
  description = "Nome do Bucket"
}

variable "bucket_policies" {
  description = "Políticas de acesso do bucket"
}

variable "front_bucket_name" {
  description = "Nome do Bucket"
  default = "front-bucket-minishop"
}

variable "front_bucket_policies" {
  description = "Políticas de acesso do bucket"
  default = true
}

variable "service_name" {
  description = "Nome do servico"
}

variable "region" {
    description = "Região de execução"
}

variable "image_id" {
  description = "Id da imagem"
  default = "ami-08493ad9a060e2818"
}

variable "ec2_instance_type" {
  description = "Arquitetura da EC2"
  default = "t2.micro"
}

variable "cluster_name" {
  description = "Nome do cluster"
  default = "meucluster"
}

variable "vpc_cidr_block" {
  default = "10.10.0.0/16"
}

variable "vpc_dns" {
  description = "Habilita o dns da vpc"
  default = true
}

variable "allow_general_ips" {
  description = "Libera todas as faixas de conexão"
  default = "0.0.0.0/0"
}

variable "aws_autoscaling_group_name" {
  description = "Nome do grupo de autoscaling"
  default = "asg-servico"
}

variable "asg_desired_capacity" {
  description = "Capacidade desejada no lançamento do cluster"
  default = 2
}

variable "asg_min_size" {
  description = "Tamanho mínimo do cluster"
  default = 2
}

variable "asg_max_size" {
  description = "Tamanho máximo do cluster"
  default = 6
}

variable "asg_health_check_grace_period" {
  description = "Tempo entre as verificações de saúde"
  default = 300
}

variable "asg_health_check_type" {
  default = "EC2"
}

variable "asg_policy_type" {
  default = "TargetTrackingScaling"
}

variable "asg_predefined_metric_type" {
  default = "ASGAverageCPUUtilization"
}

variable "asg_target_value" {
  default = 80.0
}

variable "db_engine" {
  description = "Modelo do DB"
  default = "sqlserver-ex"
}

variable "db_engine_version" {
  description = "Versão do DB"
  default = "14.00.3356.20.v1"
  
}

variable "db_instance_class" {
  description = "Arquitetura do DB"
  default = "db.t2.micro"
}

variable "db_storage_encrypted" {
  description = "Habilita a criptografia"
  default = false
}

variable "db_license_model" {
  description = "Tipo de licença do DB"
  default = "license-included"
}

variable "db_publicly_accessible" {
  description = "Habilita acessibilidade pública"
  default = true
}

variable "db_final_snapshot" {
  description = "Habilita snapshot do DB na finalização da instância"
  default = true
}
variable "db_instance_username" {
  description = "Nome do usuário do DB"
}

variable "db_instance_password" {
  description = "Senha do db"
}

variable "db_name" {
  description = "Nome do banco"
  default = ""
}

variable "db_port" {
  description = "Porta do DB"
  default = 1433
}

variable "db_allocated_storage" {
  description = "Tamanho do DB"
  default = 20
}