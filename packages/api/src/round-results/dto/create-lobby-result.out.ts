import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BooleanResult {
  @Field()
  result: boolean;

  @Field({ nullable: true })
  error: string;
}
