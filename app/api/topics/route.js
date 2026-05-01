import Topic from "@/models/topic";
import { buildCollectionHandlers } from "@/lib/api/crud";
import { topicCreateSchema } from "@/lib/api/schemas";

const handlers = buildCollectionHandlers({
  model: Topic,
  listKey: "topics",
  createSchema: topicCreateSchema,
  createSuccessMessage: "Topic created successfully",
  deleteSuccessMessage: "Topic deleted successfully",
  notFoundMessage: "Topic no encontrado",
  mutationRateLimitKey: "topics",
});

export const { GET, POST, DELETE } = handlers;
