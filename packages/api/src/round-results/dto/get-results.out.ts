import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Player } from "../../players/player.entity";

@ObjectType()
export class PlayerResults {
  @Field(() => Player)
  player: Pick<Player, "id" | "name" | "region" | "country" | "slug">;

  @Field(() => [Int])
  positions: number[];

  @Field(() => [Int])
  points: number[];

  tiebreakerRanking: number;

  @Field(() => Int)
  lobbyPlayerId: number;
}
