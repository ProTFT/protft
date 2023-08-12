resource "aws_iam_role" "ecs_task_role" {
  name = "ptft-ecs-task-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

inline_policy {
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:UpdateTimeToLive",
        "dynamodb:PutItem",
        "dynamodb:ListTables",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:Query",
        "dynamodb:UpdateItem"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ptft-ecs-task-execution-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# resource "aws_iam_policy" "dynamodb" {
#   name        = "${var.name}-task-policy-dynamodb-${var.environment}"
#   description = "Policy that allows access to DynamoDB"

#   policy = <<EOF
# {
#     "Version": "2012-10-17",
#     "Statement": [
        # {
        #     "Effect": "Allow",
        #     "Action": [
        #         "dynamodb:CreateTable",
        #         "dynamodb:UpdateTimeToLive",
        #         "dynamodb:PutItem",
        #         "dynamodb:DescribeTable",
        #         "dynamodb:ListTables",
        #         "dynamodb:DeleteItem",
        #         "dynamodb:GetItem",
        #         "dynamodb:Scan",
        #         "dynamodb:Query",
        #         "dynamodb:UpdateItem",
        #         "dynamodb:UpdateTable"
        #     ],
        #     "Resource": "*"
        # }
#     ]
# }
# EOF
# }

# resource "aws_iam_role_policy_attachment" "ecs-task-role-policy-attachment" {
#   role       = aws_iam_role.ecs_task_role.name
#   policy_arn = aws_iam_policy.dynamodb.arn
# }
