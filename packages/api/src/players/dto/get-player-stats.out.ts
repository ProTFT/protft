import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Player } from "../player.entity";

@ObjectType()
export class PlayerStats {
  @Field(() => Float)
  averagePosition: number;

  @Field(() => Int)
  totalGames: number;

  @Field(() => Float)
  topFourCount: number;

  @Field(() => Float)
  topOneCount: number;

  @Field(() => Float)
  eigthCount: number;
}

@ObjectType()
export class PlayersStats extends PlayerStats {
  @Field(() => Player)
  player: Pick<Player, "id" | "name" | "region" | "country" | "slug">;
}
