import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class DeleteCircuitArgs {
  @Field({ name: "id" })
  id: number;
}
