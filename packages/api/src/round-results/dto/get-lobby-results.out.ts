import { Field, ObjectType } from "@nestjs/graphql";
import { LobbyGroup } from "../../lobbies/lobby-group.entity";
import { Lobby } from "../../lobbies/lobby.entity";
import { PlayerResults } from "./get-results.out";

@ObjectType()
export class LobbyGroupWithLobbies extends LobbyGroup {
  @Field(() => [LobbyWithResults])
  lobbies: LobbyWithResults[];
}

@ObjectType()
export class LobbyWithResults extends Lobby {
  @Field(() => [PlayerResults])
  results: PlayerResults[];
}
