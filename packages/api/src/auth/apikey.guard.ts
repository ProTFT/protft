import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    const apiKey = this.configService.get("API_KEY");
    return headers["x-api-key"] === apiKey;
  }
}
