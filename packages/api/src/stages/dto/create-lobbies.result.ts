import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CreateLobbiesResponse {
  @Field(() => Int)
  public createdLobbyGroups: number;

  @Field(() => Int)
  public createdLobbies: number;
}
