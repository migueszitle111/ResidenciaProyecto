import Curso from "@/models/curso";
import { buildItemHandlers } from "@/lib/api/crud";
import { cursoUpdateSchema } from "@/lib/api/schemas";

const handlers = buildItemHandlers({
  model: Curso,
  itemKey: "cursos",
  updateSchema: cursoUpdateSchema,
  updatedEntityKey: "updatedCurso",
  updateSuccessMessage: "Curso actualizado",
  notFoundMessage: "Curso no encontrado",
  mutationRateLimitKey: "cursos",
});

export const { GET, PUT } = handlers;
