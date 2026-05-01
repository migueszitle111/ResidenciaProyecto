import Congreso from "@/models/congreso";
import { buildItemHandlers } from "@/lib/api/crud";
import { congresoUpdateSchema } from "@/lib/api/schemas";

const handlers = buildItemHandlers({
  model: Congreso,
  itemKey: "congresos",
  updateSchema: congresoUpdateSchema,
  updatedEntityKey: "updatedCongreso",
  updateSuccessMessage: "Congreso actualizado",
  notFoundMessage: "Congreso no encontrado",
  mutationRateLimitKey: "congresos",
});

export const { GET, PUT } = handlers;
