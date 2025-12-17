// Why this file exists:
// - TypeORM entity shape (ORM-first)

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TaskItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  done: boolean;
}
