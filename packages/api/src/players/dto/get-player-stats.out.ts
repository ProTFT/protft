import { Field, Float, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PlayerStats {
  @Field(() => Float)
  averagePosition: number;

  @Field(() => Int)
  totalGames: number;

  @Field(() => Int)
  topFourCount: number;

  @Field(() => Int)
  topOneCount: number;

  @Field(() => Int)
  eigthCount: number;
}
