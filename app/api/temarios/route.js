import Temario from "@/models/temario";
import { buildCollectionHandlers } from "@/lib/api/crud";
import { temarioCreateSchema } from "@/lib/api/schemas";

const handlers = buildCollectionHandlers({
  model: Temario,
  listKey: "temarios",
  createSchema: temarioCreateSchema,
  createSuccessMessage: "Topic created successfully",
  deleteSuccessMessage: "Topic deleted successfully",
  notFoundMessage: "Temario no encontrado",
  mutationRateLimitKey: "temarios",
});

export const { GET, POST, DELETE } = handlers;
