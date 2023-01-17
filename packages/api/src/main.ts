import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser = require("cookie-parser");
import { ConfigService } from "@nestjs/config";
import { getOrigin } from "./config/cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const environment = configService.get<string>("NODE_ENV");
  app.use(cookieParser(configService.get<string>("COOKIE_SECRET")));
  app.enableCors({
    origin: getOrigin(environment),
    methods: ["GET, POST", "OPTIONS"],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
