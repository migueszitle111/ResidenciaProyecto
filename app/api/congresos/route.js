import Congreso from "@/models/congreso";
import { buildCollectionHandlers } from "@/lib/api/crud";
import { congresoCreateSchema } from "@/lib/api/schemas";

const handlers = buildCollectionHandlers({
  model: Congreso,
  listKey: "congresos",
  createSchema: congresoCreateSchema,
  createSuccessMessage: "Congreso created successfully",
  deleteSuccessMessage: "Congreso deleted successfully",
  notFoundMessage: "Congreso no encontrado",
  mutationRateLimitKey: "congresos",
});

export const { GET, POST, DELETE } = handlers;
