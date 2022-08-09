import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PlayerFilterMeta {
  @Field(() => [String])
  possibleCountries: string[];

  @Field(() => [String])
  possibleRegions: string[];
}
