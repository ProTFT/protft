variable "domain_name" {
  type        = string
  description = "The domain name for the website."
}

variable "bucket_name" {
  type        = string
  description = "Name of the root frontend bucket"
}

variable "image_bucket_name" {
  type        = string
  description = "Name of bucket for serve images"
}

variable "common_tags" {
  description = "Common tags you want applied to all components."
}

variable "db_username" {
  type        = string
  description = "DB username"
}

variable "db_password" {
  type        = string
  description = "DB password"
}

variable "db_url" {
  type        = string
  description = "DB URL"
}

variable "signin_key" {
  type        = string
  description = "Key to create users"
}

variable "jwt_secret" {
  type        = string
  description = "JWT encryption"
}

variable "cookie_secret" {
  type        = string
  description = "Cookie encryption"
}

variable "api_key" {
  type = string
  description = "API Key for REST endpoints"
}
