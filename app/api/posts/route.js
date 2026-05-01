import Post from "@/models/post";
import { buildCollectionHandlers } from "@/lib/api/crud";
import { postCreateSchema } from "@/lib/api/schemas";

const handlers = buildCollectionHandlers({
  model: Post,
  listKey: "posts",
  createSchema: postCreateSchema,
  createSuccessMessage: "Curso created successfully",
  deleteSuccessMessage: "Post deleted successfully",
  notFoundMessage: "Post no encontrado",
  mutationRateLimitKey: "posts",
});

export const { GET, POST, DELETE } = handlers;
