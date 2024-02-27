import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Tiebreaker {
  @Field()
  id: number;

  @Field()
  description: string;

  @Field()
  order: number;
}
