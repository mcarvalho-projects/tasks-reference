// Why this file exists:
// - Minimal bootstrap shape + fixed port (5101)

import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Minimal CORS for local frontends (React/Angular) to call http://localhost:5101
  app.enableCors({ origin: true });

  await app.listen(5101);
}

bootstrap();
