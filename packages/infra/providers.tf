terraform {
  required_version = "~> 1.3.6"

  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 4.27"
    }
  }

  backend "s3" {
    bucket = "protft-terraform"
    key = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = var.common_tags
  }
}
