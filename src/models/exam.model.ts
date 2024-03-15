import type { Exam } from "@/types/exam";

export class ExamModel {
  readonly id: number;
  readonly name: string;
  readonly description?: string;

  constructor({ id, name, description = '' }: Exam) {
    this.id = id;
    this.name = name;
    this.description = description
  }
}
