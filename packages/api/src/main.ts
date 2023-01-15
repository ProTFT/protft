import { NestFactory } from "@nestjs/core";
import { AppModule, isProd } from "./app.module";
import cookieParser = require("cookie-parser");
import { cookieSecret } from "./auth/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(cookieSecret));
  app.enableCors({
    origin: isProd() ? "https://www.protft.com" : "http://protft.com:3000",
    methods: ["GET, POST", "OPTIONS"],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
