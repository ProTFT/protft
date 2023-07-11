import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayerAccount } from "./player-account.entity";
import { PlayerAccountsService } from "./player-accounts.service";

@Module({
  imports: [TypeOrmModule.forFeature([PlayerAccount])],
  providers: [PlayerAccountsService],
})
export class PlayerAccountsModule {}
