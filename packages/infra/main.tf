module "backend" {
  source               = "./modules/backend"
  service_name         = var.service_name
  region               = var.region
  bucket_name          = var.bucket_name
  bucket_policies      = var.bucket_policies
  db_instance_username = var.db_instance_username
  db_instance_password = var.db_instance_password
}

module "service" {
  count                = var.quantity
  source               = "./modules/service"
  aws_vpc              = module.backend.aws_vpc.id
  aws_security_group   = module.backend.aws_security_group
  aws_subnet           = module.backend.aws_subnet
  aws_ecs_cluster      = module.backend.aws_ecs_cluster.id
  db_instance_address  = module.backend.db_instance_address
  db_instance_port     = module.backend.db_instance_port
  db_instance_username = var.db_instance_username
  db_instance_password = var.db_instance_password
  bucket_name          = var.bucket_name
  region               = var.region
  java_image           = var.java_image
  csharp_image         = var.csharp_image
  access_key           = var.access_key
  secret_key           = var.secret_key
  depends_on = [
    module.backend
  ]
}