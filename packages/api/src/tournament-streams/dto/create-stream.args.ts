import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class CreateStreamArgs {
  @Field(() => Int, { name: "tournamentId" })
  tournamentId: number;

  @Field({ name: "name" })
  name: string;

  @Field({ name: "link" })
  link: string;

  @Field({ name: "platform" })
  platform: string;

  @Field({ name: "language" })
  language: string;

  @Field({ name: "isLive" })
  isLive: boolean;

  @Field({ name: "isVOD" })
  isVOD: boolean;
}
