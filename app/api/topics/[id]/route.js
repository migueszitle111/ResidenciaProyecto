import Topic from "@/models/topic";
import { buildItemHandlers } from "@/lib/api/crud";
import { topicUpdateSchema } from "@/lib/api/schemas";

const handlers = buildItemHandlers({
  model: Topic,
  itemKey: "topic",
  updateSchema: topicUpdateSchema,
  updatedEntityKey: "updatedTopic",
  updateSuccessMessage: "Topic updated successfully",
  notFoundMessage: "Topic no encontrado",
  mutationRateLimitKey: "topics",
});

export const { GET, PUT } = handlers;
