import { BaseApiSerivce } from "@/services/api/rest/base";
import { ExamService } from "@/services/api/rest/exam";
import { describe, expect, it } from "vitest";

describe('examService', () => {
  it('is instance of base service', () => {
    expect(ExamService).toBeInstanceOf(BaseApiSerivce)
  })
})