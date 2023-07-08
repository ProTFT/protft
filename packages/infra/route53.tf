resource "aws_route53_zone" "main" {
  name = var.domain_name
}

resource "aws_route53_record" "root-a" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.www_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www-a" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.www_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "ptft-api" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "api.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.ptft_lb.dns_name
    zone_id                = aws_lb.ptft_lb.zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "amateur-ptft" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "${var.amateur_subdomain}.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_amateur_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.www_amateur_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www-amateur-ptft" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.amateur_subdomain}.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_amateur_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.www_amateur_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "example" {
  for_each = {
    for dvo in aws_acm_certificate.ssl_certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.main.zone_id
}
