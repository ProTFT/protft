import { Field, Int, ObjectType } from "@nestjs/graphql";
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
