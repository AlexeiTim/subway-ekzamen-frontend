import type { Exam } from "@/types/exam";
import { BaseApiSerivce } from "./base";

export const ExamService = new BaseApiSerivce<Exam>('/exams')
