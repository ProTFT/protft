import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SuccessResponse {
  constructor(success: boolean) {
    this.success = success;
  }

  @Field()
  public success: boolean;
}
