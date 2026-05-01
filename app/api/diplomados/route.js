import Diplomado from "@/models/diplomado";
import { buildCollectionHandlers } from "@/lib/api/crud";
import { diplomadoCreateSchema } from "@/lib/api/schemas";

const handlers = buildCollectionHandlers({
  model: Diplomado,
  listKey: "diplomados",
  createSchema: diplomadoCreateSchema,
  createSuccessMessage: "Diplomado created successfully",
  deleteSuccessMessage: "Diplomado deleted successfully",
  notFoundMessage: "Diplomado no encontrado",
  mutationRateLimitKey: "diplomados",
});

export const { GET, POST, DELETE } = handlers;
