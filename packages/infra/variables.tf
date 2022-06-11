variable "service_name" {
  description = "Nome do servico"
  default     = "meu-servico"
}

variable "region" {
  description = "Região de uso na AWS"
  default     = "sa-east-1"
}

#IMPORTANTE
variable "bucket_name" {
  description = "Nome do bucket"
  default     = "minishop-imagens"
}

#IMPORTANTE
variable "bucket_policies" {
  description = "Política de acesso ao bucket, true = Privado, false = Público"
  default     = false
}

variable "quantity" {
  description = "Quantidade de serviços"
  default     = 1
}

#IMPORTANTE
variable "db_instance_username" {
  description = "Usuário do DB"
}

#IMPORTANTE
variable "db_instance_password" {
  description = "Senha do DB"
}

#IMPORTANTE
variable "java_image" {
  description = "Imagem container definition java"
  default     = "public.ecr.aws/l1m3l0n0/minishop-java:latest"
}

#IMPORTANTE
variable "csharp_image" {
  description = "Imagem container definition csharp"
  default     = "public.ecr.aws/a1i1c1d2/teste-devops-csharp:latest"
}

#IMPORTANTE
variable "access_key" {
  description = "Chave de acesso aws"
}

#IMPORTANTE
variable "secret_key" {
  description = "Chave de acesso secreta"
}