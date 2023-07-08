# Cloudfront distribution for main s3 site.
data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_origin_request_policy" "useragent" {
  name = "Managed-UserAgentRefererHeaders"
}

resource "aws_cloudfront_distribution" "www_s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.www_bucket.bucket_regional_domain_name
    origin_id                = "S3-${var.bucket_name}"
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_oac.id
  }

   origin {
    connection_attempts = 3
    connection_timeout  = 10
    domain_name         = "plausible.io"
    origin_id           = "plausible.io"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "https-only"
      origin_read_timeout      = 30
      origin_ssl_protocols     = [
        "TLSv1.2",
      ]
    }
  }

  ordered_cache_behavior {
    allowed_methods        = [
      "GET",
      "HEAD",
    ]
    cache_policy_id        = data.aws_cloudfront_cache_policy.optimized.id
    cached_methods         = [
      "GET",
      "HEAD",
    ]
    compress               = true
    default_ttl            = 0
    max_ttl                = 0
    min_ttl                = 0
    path_pattern           = "/js/script.js"
    smooth_streaming       = false
    target_origin_id       = "plausible.io"
    trusted_key_groups     = []
    trusted_signers        = []
    viewer_protocol_policy = "https-only"
  }

  ordered_cache_behavior {
    allowed_methods          = [
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT",
    ]
    cached_methods           = [
      "GET",
      "HEAD",
    ]
    compress                 = true
    default_ttl              = 0
    max_ttl                  = 0
    min_ttl                  = 0
    path_pattern             = "/api/event"
    smooth_streaming         = false
    target_origin_id         = "plausible.io"
    trusted_key_groups       = []
    trusted_signers          = []
    viewer_protocol_policy   = "https-only"
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.useragent.id
    cache_policy_id          = data.aws_cloudfront_cache_policy.optimized.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["www.${var.domain_name}", "${var.domain_name}"]

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.bucket_name}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 604800
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.cert_validation.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }
}

resource "aws_cloudfront_distribution" "www_amateur_distribution" {
  origin {
    domain_name              = aws_s3_bucket.amateur.bucket_regional_domain_name
    origin_id                = "S3-${var.amateur_bucket_name}"
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_oac.id
  }

   origin {
    connection_attempts = 3
    connection_timeout  = 10
    domain_name         = "plausible.io"
    origin_id           = "plausible.io"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "https-only"
      origin_read_timeout      = 30
      origin_ssl_protocols     = [
        "TLSv1.2",
      ]
    }
  }

  ordered_cache_behavior {
    allowed_methods        = [
      "GET",
      "HEAD",
    ]
    cache_policy_id        = data.aws_cloudfront_cache_policy.optimized.id
    cached_methods         = [
      "GET",
      "HEAD",
    ]
    compress               = true
    default_ttl            = 0
    max_ttl                = 0
    min_ttl                = 0
    path_pattern           = "/js/script.js"
    smooth_streaming       = false
    target_origin_id       = "plausible.io"
    trusted_key_groups     = []
    trusted_signers        = []
    viewer_protocol_policy = "https-only"
  }

  ordered_cache_behavior {
    allowed_methods          = [
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT",
    ]
    cached_methods           = [
      "GET",
      "HEAD",
    ]
    compress                 = true
    default_ttl              = 0
    max_ttl                  = 0
    min_ttl                  = 0
    path_pattern             = "/api/event"
    smooth_streaming         = false
    target_origin_id         = "plausible.io"
    trusted_key_groups       = []
    trusted_signers          = []
    viewer_protocol_policy   = "https-only"
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.useragent.id
    cache_policy_id          = data.aws_cloudfront_cache_policy.optimized.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["${var.amateur_subdomain}.${var.domain_name}","www.${var.amateur_subdomain}.${var.domain_name}"]

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.amateur_bucket_name}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 604800
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.cert_validation.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }
}

resource "aws_cloudfront_origin_access_control" "s3_oac" {
  name                              = "Main-S3-OAC"
  description                       = "OAC for allow CDN access to S3"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
