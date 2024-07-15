import type { Exam, ExamParams } from "@/types/exam";
import { BaseApiSerivce } from "./base";

export const ExamService = new BaseApiSerivce<Exam, ExamParams>('/exams')
