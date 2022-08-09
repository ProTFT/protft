import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BasePlayer {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  region: string;

  @Field({ nullable: true })
  country: string;
}

@ObjectType()
export class PlayerResults {
  @Field(() => BasePlayer)
  player: BasePlayer;

  @Field(() => [Int])
  positions: number[];

  @Field(() => [Int])
  points: number[];
}
