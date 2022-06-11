import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class PointSchema {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
}

@ObjectType()
@Entity()
@Index(["pointSchemaId", "position"], { unique: true })
export class Points {
  @Field(() => Int)
  @PrimaryColumn()
  pointSchemaId: number;

  @Field(() => Int)
  @PrimaryColumn()
  position: number;

  @Field(() => Int)
  @Column()
  points: number;

  @ManyToOne(() => PointSchema)
  @JoinColumn({ name: "pointSchemaId" })
  pointSchema: PointSchema;
}
