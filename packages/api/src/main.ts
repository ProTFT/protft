/* istanbul ignore file */

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser = require("cookie-parser");
import { ConfigService } from "@nestjs/config";
import { getOrigin } from "./config/cors";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const environment = configService.get<string>("NODE_ENV");
  const swaggerConfig = new DocumentBuilder()
    .addApiKey(
      {
        type: "apiKey",
        name: "x-api-key",
        in: "header",
        description: "API Key For External calls",
      },
      "x-api-key",
    )
    .setTitle("ProTFT Api")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);
  app.use(cookieParser(configService.get<string>("COOKIE_SECRET")));
  app.enableCors({
    origin: getOrigin(environment),
    methods: ["GET, POST", "OPTIONS"],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
