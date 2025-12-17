// Why this file exists:
// - Minimal module wiring + TypeORM connection (synchronize creates tables)

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksController } from "./tasks.controller";
import { TaskItem } from "./task.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "tasks.db",
      entities: [TaskItem],
      synchronize: true, // auto-create tables (cheat-sheet style)
    }),
    TypeOrmModule.forFeature([TaskItem]),
  ],
  controllers: [TasksController],
})
export class AppModule {}
