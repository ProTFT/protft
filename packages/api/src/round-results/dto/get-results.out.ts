import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Player } from "../../players/player.entity";

@ObjectType()
export class PlayerResults {
  @Field(() => Player)
  player: Player;

  @Field(() => [Int])
  positions: number[];

  @Field(() => [Int])
  points: number[];
}
