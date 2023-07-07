data "aws_iam_policy_document" "s3_main_policy" {
  statement {
    sid     = "AllowCDNAccess"
    actions = ["s3:Get*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    resources = ["${aws_s3_bucket.www_bucket.arn}/*"]
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.www_s3_distribution.arn]
    }
  }
}

data "aws_iam_policy_document" "s3_amateur_policy" {
  statement {
    sid     = "AllowCDNAccess"
    actions = ["s3:Get*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    resources = ["${aws_s3_bucket.amateur.arn}/*"]
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.www_amateur_distribution.arn]
    }
  }
}

# S3 Bucket for website
resource "aws_s3_bucket_cors_configuration" "www_bucket_cors" {
  bucket = aws_s3_bucket.www_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST", "HEAD"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_policy" "www_bucket_policy" {
  bucket = aws_s3_bucket.www_bucket.id

  policy = data.aws_iam_policy_document.s3_main_policy.json
}

resource "aws_s3_bucket_public_access_block" "s3_block_public" {
  bucket                  = aws_s3_bucket.www_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
  ignore_public_acls      = true
}

resource "aws_s3_bucket" "www_bucket" {
  bucket = var.bucket_name
}
#--------

# S3 Bucket for amateur website
resource "aws_s3_bucket_cors_configuration" "amateur_bucket_cors" {
  bucket = aws_s3_bucket.amateur.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST", "HEAD"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_policy" "amateur_bucket_policy" {
  bucket = aws_s3_bucket.amateur.id

  policy = data.aws_iam_policy_document.s3_amateur_policy.json
}

resource "aws_s3_bucket_public_access_block" "s3_block_amateur_public" {
  bucket                  = aws_s3_bucket.amateur.id
  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
  ignore_public_acls      = true
}

resource "aws_s3_bucket" "amateur" {
  bucket = var.amateur_bucket_name
}
#--------

# S3 Bucket for images
data "aws_iam_policy_document" "s3_public_policy" {
  statement {
    sid       = "PublicReadGetObject"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.image_bucket.arn}/*"]
    principals {
      identifiers = ["*"]
      type        = "*"
    }
  }
}

resource "aws_s3_bucket_acl" "image_bucket_acl" {
  bucket = aws_s3_bucket.image_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "image_bucket_policy" {
  bucket = aws_s3_bucket.image_bucket.id
  policy = data.aws_iam_policy_document.s3_public_policy.json
}

resource "aws_s3_bucket" "image_bucket" {
  bucket = var.image_bucket_name
}
#--------
