import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Player, PlayerCalculatedStats } from "../player.entity";

@ObjectType()
export class PlayerWithStats extends PlayerCalculatedStats {
  @Field(() => Player)
  player: Omit<Player, "playerStats">;
}
