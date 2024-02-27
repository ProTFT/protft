import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    const configApiKey = this.configService.get("API_KEY");
    const requestApiKey = headers["x-api-key"];
    if (!requestApiKey) {
      return false;
    }
    return requestApiKey === configApiKey;
  }
}
