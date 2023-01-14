import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class IdArg {
  @Field(() => Int, { name: "id" })
  id: number;
}
