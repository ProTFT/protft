import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser = require("cookie-parser");
import { cookieSecret } from "./auth/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(cookieSecret));
  app.enableCors({
    origin: "http://protft.com:3000",
    methods: ["GET, POST"],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
