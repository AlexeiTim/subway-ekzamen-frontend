import exams from "@/db/exams.json";
import type { Exam } from "@/types/exam";
import { BaseFakeApiSerivce } from "./base";

export class ExamFakeService extends BaseFakeApiSerivce<Exam> {
  constructor() {
    super(exams)
  }
}