terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.1.0"
    }
  }
  required_version = "~> 1.1.5"
}

terraform {
  backend "s3" {
    bucket = "terraformbuckettfstate" #Insira o nome do seu bucket aqui
    key    = "terraform/minhachave"
    region = "sa-east-1"
  }
}

provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}