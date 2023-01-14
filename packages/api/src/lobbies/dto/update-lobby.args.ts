import { ArgsType, IntersectionType } from "@nestjs/graphql";
import { IdArg } from "../../lib/dto/id.args";
import { CreateLobbyArgs } from "./create-lobby.args";

@ArgsType()
export class UpdateLobbyArgs extends IntersectionType(IdArg, CreateLobbyArgs) {}
