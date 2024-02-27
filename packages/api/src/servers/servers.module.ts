import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Server } from "./server.entity";
import { ServersExternalController } from "./servers-external.controller";
import { ServersService } from "./servers.service";

@Module({
  imports: [TypeOrmModule.forFeature([Server])],
  providers: [ServersService],
  controllers: [ServersExternalController],
})
export class ServersModule {}
