import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiKeyGuard } from "../auth/apikey.guard";
import { ValidationInterceptor } from "../lib/joi/validation.interceptor";
import {
  CreateServerSchema,
  CreateServerSchemaDto,
} from "./schema/create-server.schema";
import { ServersService } from "./servers.service";

@Controller("servers")
export class ServersExternalController {
  constructor(private serversService: ServersService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  findAll() {
    return this.serversService.findAll();
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  @UseInterceptors(new ValidationInterceptor(CreateServerSchema))
  createOne(@Body() body: CreateServerSchemaDto) {
    return this.serversService.createOne(body);
  }
}
