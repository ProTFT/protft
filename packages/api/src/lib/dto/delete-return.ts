import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeleteResponse {
  constructor(id: number) {
    this.id = id;
  }

  @Field(() => Int)
  public id: number;
}
