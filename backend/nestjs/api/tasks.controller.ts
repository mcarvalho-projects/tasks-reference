// Why this file exists:
// - Minimal Nest controller + minimal ORM usage (working, but simple)

import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskItem } from "./task.entity";
import { publishTaskCreated } from "./rabbit.producer";

@Controller()
export class TasksController {
  constructor(
    @InjectRepository(TaskItem) private tasks: Repository<TaskItem>,
  ) {}

  @Get("health")
  health() {
    return { ok: true };
  }

  @Get("tasks")
  async list() {
    return this.tasks.find();
  }

  @Post("tasks")
  async create(@Body() body: any) {
    const title = body?.title ?? "untitled";
    const task = this.tasks.create({ title, done: false });
    const saved = await this.tasks.save(task);

    await publishTaskCreated(title);
    return saved;
  }

  @Patch("tasks/:id/done")
  async toggle(@Param("id") id: string) {
    const task = await this.tasks.findOneBy({ id: Number(id) });
    if (!task) return { error: "not found" };

    task.done = !task.done;
    return this.tasks.save(task);
  }
}
