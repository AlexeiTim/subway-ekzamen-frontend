import type { Exam } from "@/types/exam";

export class ExamModel {
  readonly id: number;
  readonly name: string;

  constructor({ id, name }: Exam) {
    this.id = id;
    this.name = name;
  }
}
