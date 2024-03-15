import type { Theme } from "@/types/theme";

export class ThemeModel implements Theme {
  id: number;
  name: string;
  description: string;
  exam: number;

  constructor({ id, name, description, exam }: Theme) {
    this.id = id
    this.name = name
    this.description = description
    this.exam = exam
  }
}
