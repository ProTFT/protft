variable "domain_name" {
  type = string
  description = "The domain name for the website."
}

variable "bucket_name" {
  type = string
  description = "The name of the bucket without the www. prefix. Normally domain_name."
}

variable "common_tags" {
  description = "Common tags you want applied to all components."
}

variable "db_username" {
  type = string
  description = "DB username"
}

variable "db_password" {
  type = string
  description = "DB password"
}

variable "db_url" {
  type = string
  description = "DB URL"
}

variable "signin_key" {
  type = string
  description = "Key to create users"
}

variable "jwt_secret" {
  type = string
  description = "JWT encryption"
}

variable "cookie_secret" {
  type = string
  description = "Cookie encryption"
}
