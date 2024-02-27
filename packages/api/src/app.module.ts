import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SetsModule } from "./sets/sets.module";
import { TournamentsModule } from "./tournaments/tournaments.module";
import { StagesModule } from "./stages/stages.module";
import { PointsModule } from "./points/points.module";
import { LobbiesModule } from "./lobbies/lobbies.module";
import { PlayersModule } from "./players/players.module";
import { join } from "path";
import { RoundsModule } from "./rounds/rounds.module";
import { RoundResultsModule } from "./round-results/round-results.module";
import { StagePlayerInfosModule } from "./stage-player-infos/stage-player-infos.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { LobbyPlayerInfosModule } from "./lobby-player-infos/lobby-player-infos.module";
import { isProd } from "./config/environment";
import { getDatabaseInfo } from "./config/dbConfig";
import { getOrigin } from "./config/cors";
import { TournamentResultsModule } from "./tournament-results/tournament-results.module";
import { TournamentStreamsModule } from "./tournament-streams/tournament-streams.module";
import { PlayerLinksModule } from "./player-links/player-links.module";
import { CircuitsModule } from "./circuits/circuits.module";
import { PlayerAccountsModule } from "./player-accounts/player-accounts.module";
import { ServersModule } from "./servers/servers.module";
import { CacheModule } from "./cache/cache.module";
import { ClsModule } from "nestjs-cls";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UserStoreInterceptor } from "./auth/interceptor/user-store.interceptor";
import { BaseEntitySubscriber } from "./lib/BaseEntity.subscriber";
import { SeedingModule } from "./seeding/seeding.module";
import { QualificationModule } from "./qualification/qualification.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      ...(!isProd(process.env.NODE_ENV) && { envFilePath: ".development.env" }),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const environment = configService.get<string>("NODE_ENV");
        return {
          type: "postgres",
          ...getDatabaseInfo(environment),
          autoLoadEntities: true,
          synchronize: false,
          entities: ["dist/**/*.entity.js"],
          migrations: ["dist/db/migrations/*.js"],
          migrationsRun: true,
        };
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const environment = configService.get<string>("NODE_ENV");
        return {
          autoSchemaFile: true,
          definitions: {
            path: join(process.cwd(), "src/graphql.ts"),
          },
          playground: true,
          introspection: true,
          cors: {
            origin: getOrigin(environment),
            credentials: true,
          },
        };
      },
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    SetsModule,
    TournamentsModule,
    StagesModule,
    LobbiesModule,
    PointsModule,
    PlayersModule,
    RoundsModule,
    RoundResultsModule,
    StagePlayerInfosModule,
    AuthModule,
    UsersModule,
    LobbyPlayerInfosModule,
    TournamentResultsModule,
    TournamentStreamsModule,
    PlayerLinksModule,
    CircuitsModule,
    PlayerAccountsModule,
    ServersModule,
    CacheModule,
    SeedingModule,
    QualificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BaseEntitySubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserStoreInterceptor,
    },
  ],
})
export class AppModule {}
