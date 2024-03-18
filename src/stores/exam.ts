// import { ExamModel } from "@/models/exam.model";
// import { ExamFakeService } from "@/services/api/fake/exam";
// import { ExamService } from "@/services/api/rest/exam";
// import type { Exam } from "@/types/exam";
// import { defineStore } from "pinia";


// export const useExamStore = defineStore('exam-store', {
//   state: () => ({
//     loading: false,
//     error: null as unknown,
//     exams: [] as ExamModel[],
//   }),
//   actions: {
//     async getAll(): Promise<ExamModel[]> {
//       const examFakeSerivce = new ExamFakeService()

//       this.loading = true
//       try {
//         const exams = await examFakeSerivce.getAll()
//         this.exams = exams.map(exam => new ExamModel(exam))
//       } catch (error) {
//         this.error = error
//       } finally {
//         this.loading = false
//       }

//       return this.exams as ExamModel[]
//     },
//     async getOne(id: number) {
//       const response = await ExamService.getOne(id)
//       const exam = new ExamModel(response)
//       let oldExam = this.exams.find(e => e.id === exam.id)

//       if (oldExam)
//         oldExam = exam

//       return exam
//     },
//     async create(data: Partial<Exam>) {
//       const exam = await ExamService.create(data)
//       this.exams.push(new ExamModel(exam))
//     },
//     async update(id: number, data: Omit<Exam, 'id'>) {
//       const response = await ExamService.update(id, data)
//       const exam = new ExamModel(response)
//       let oldExam = this.exams.find(e => e.id === exam.id)

//       if (oldExam)
//         oldExam = exam
//       return exam 
//     },
//     async delete(id: number) {
//       const response = await ExamService.delete(id)

//       const oldExamIndex = this.exams.findIndex(e => e.id === id)
//       if (oldExamIndex != -1)
//         this.exams.splice(oldExamIndex, 1)

//       return response
//     }
//   }
// })