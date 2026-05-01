import Post from "@/models/post";
import { buildItemHandlers } from "@/lib/api/crud";
import { postUpdateSchema } from "@/lib/api/schemas";

const handlers = buildItemHandlers({
  model: Post,
  itemKey: "post",
  updateSchema: postUpdateSchema,
  updatedEntityKey: "updatedPost",
  updateSuccessMessage: "Post actualizado",
  notFoundMessage: "Post no encontrado",
  mutationRateLimitKey: "posts",
});

export const { GET, PUT } = handlers;
