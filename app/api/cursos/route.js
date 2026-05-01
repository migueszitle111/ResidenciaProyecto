import Curso from "@/models/curso";
import { buildCollectionHandlers } from "@/lib/api/crud";
import { cursoCreateSchema } from "@/lib/api/schemas";

const handlers = buildCollectionHandlers({
  model: Curso,
  listKey: "cursos",
  createSchema: cursoCreateSchema,
  createSuccessMessage: "Curso created successfully",
  deleteSuccessMessage: "Curso deleted successfully",
  notFoundMessage: "Curso no encontrado",
  mutationRateLimitKey: "cursos",
});

export const { GET, POST, DELETE } = handlers;
