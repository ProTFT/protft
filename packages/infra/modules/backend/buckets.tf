resource "aws_s3_bucket" "bucket" {
  bucket = var.bucket_name

  tags = {
    Name = var.bucket_name
  }
}

resource "aws_s3_bucket_public_access_block" "bucket_acl" {
  bucket = aws_s3_bucket.bucket.id

  block_public_acls       = var.bucket_policies
  block_public_policy     = var.bucket_policies
  ignore_public_acls      = var.bucket_policies
  restrict_public_buckets = var.bucket_policies
}

resource "aws_s3_bucket" "front_bucket" {
  bucket = var.front_bucket_name
  tags = {
    Name = var.front_bucket_name
  }
}

resource "aws_s3_object" "folders" {
    bucket = "${aws_s3_bucket.front_bucket.id}"
    acl    = "private"
    for_each = toset( ["angular-dln", "angular-aeo", "react-lnr", "react-jnt"] )
    key     =  "${each.value}/"
}

resource "aws_s3_bucket_public_access_block" "front_bucket_acl" {
  bucket = aws_s3_bucket.front_bucket.id

  block_public_acls       = var.front_bucket_policies
  block_public_policy     = var.front_bucket_policies
  ignore_public_acls      = var.front_bucket_policies
  restrict_public_buckets = var.front_bucket_policies
}