import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class DeleteStreamArgs {
  @Field(() => Int, { name: "tournamentId" })
  tournamentId: number;

  @Field({ name: "name" })
  name: string;
}
