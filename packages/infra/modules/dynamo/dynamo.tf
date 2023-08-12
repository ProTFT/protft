module "dynamodb_table" {
  source   = "terraform-aws-modules/dynamodb-table/aws"

  name     = "ptft_cache"
  hash_key = "key"

  attributes = [
    {
      name = "key"
      type = "S"
    },
    {
      name = "label"
      type: "S"
    }
  ]

  global_secondary_indexes = [
    {
      name            = "label-index"
      hash_key        = "label"
      projection_type = "KEYS_ONLY"
      read_capacity   = 0
      write_capacity  = 0
    }
  ]
}
