# resource "aws_cloudfront_distribution" "s3_distribution" {
#     for_each = toset( ["angular-dln", "angular-aeo", "react-lnr", "react-jnt"] )
#     enabled             = true
#     default_root_object = "index.html"
#    origin {
#    domain_name = aws_s3_bucket.front_bucket.bucket_regional_domain_name
#    origin_id   = aws_s3_bucket.front_bucket.id
#     s3_origin_config {
#          origin_access_identity = "origin-access-identity/cloudfront/EOFVF9FDTXEYF"
#     }    
#    } 
  
#   default_cache_behavior {
#     allowed_methods = [
#       "GET",
#       "HEAD",
#     ]

#     cached_methods = [
#       "GET",
#       "HEAD",
#     ]

#     target_origin_id = "s3-cloudfront"

#     forwarded_values {
#       query_string = false

#       cookies {
#         forward = "none"
#       }
#     }
    
#     viewer_protocol_policy = "allow-all"
#     min_ttl                = 0
#     default_ttl            = 86400
#     max_ttl                = 31536000    
#   }

#   restrictions {
#     geo_restriction {
#       restriction_type = "none"
#     }
#   } 
    
#     viewer_certificate {
#     cloudfront_default_certificate = true
#   }
# }