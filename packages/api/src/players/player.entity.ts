import { Field, InputType, Int, ObjectType, OmitType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Player {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  region: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string;
}

@ObjectType()
export class PlayerFilterMeta {
  @Field(() => [String])
  possibleCountries: string[];

  @Field(() => [String])
  possibleRegions: string[];
}

// @InputType()
// export class PlayerInput extends OmitType(Player, ["id"] as const, InputType) {}
