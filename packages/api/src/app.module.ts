import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SetsModule } from "./sets/sets.module";
import { TournamentsModule } from "./tournaments/tournaments.module";
import { StagesModule } from "./stages/stages.module";
import { PointsModule } from "./points/points.module";
import { LobbiesModule } from "./lobbies/lobbies.module";
import { PlayersModule } from "./players/players.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";

const localDatabaseInfo: TypeOrmModuleOptions = {
  host: "localhost",
  port: 5432,
  username: "root",
  password: "changeme",
  database: "mydb",
};

const prodDatabaseInfo: TypeOrmModuleOptions = {
  url: process.env.DATABASE_URL,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      ...(process.env.NODE_ENV === "production"
        ? prodDatabaseInfo
        : localDatabaseInfo),
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      definitions: {
        path: join(process.cwd(), "src/graphql.ts"),
      },
      playground: true,
      introspection: true,
    }),
    SetsModule,
    TournamentsModule,
    StagesModule,
    LobbiesModule,
    PointsModule,
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
