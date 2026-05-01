import Temario from "@/models/temario";
import { buildItemHandlers } from "@/lib/api/crud";
import { temarioUpdateSchema } from "@/lib/api/schemas";

const handlers = buildItemHandlers({
  model: Temario,
  itemKey: "temarios",
  updateSchema: temarioUpdateSchema,
  updatedEntityKey: "updatedTemario",
  updateSuccessMessage: "Temario actualizado",
  notFoundMessage: "Temario no encontrado",
  mutationRateLimitKey: "temarios",
});

export const { GET, PUT } = handlers;
