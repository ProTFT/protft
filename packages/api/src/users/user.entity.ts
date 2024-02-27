import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Roles {
  WEBMASTER = "WM",
  TOURNAMENT_ORGANIZER = "TO",
  PLAYER = "PL",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user: string;

  @Column()
  password: string;

  @Column({ default: [], enum: Roles, array: true, type: "enum" })
  roles: Roles[];
}
