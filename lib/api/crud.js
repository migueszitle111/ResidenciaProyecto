import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import {
  enforceRateLimit,
  handleApiError,
  parseJsonBody,
  requireAdminUser,
  validateObjectId,
} from "@/lib/api/security";

async function enforceAdminMutationSecurity(request, rateLimitKey) {
  const auth = await requireAdminUser(request);
  if (auth.error) {
    return auth.error;
  }

  const rateLimitResponse = enforceRateLimit(request, {
    key: rateLimitKey,
    limit: 60,
    windowMs: 10 * 60_000,
    identifier: auth.user.email || auth.user._id?.toString(),
  });

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  return null;
}

export function buildCollectionHandlers({
  model,
  listKey,
  createSchema,
  createSuccessMessage,
  deleteSuccessMessage,
  notFoundMessage,
  mutationRateLimitKey,
}) {
  return {
    async GET() {
      try {
        await connectMongoDB();
        const records = await model.find().lean();
        return NextResponse.json({ [listKey]: records }, { status: 200 });
      } catch (error) {
        return handleApiError(error, "Error processing request");
      }
    },

    async POST(request) {
      try {
        const securityResponse = await enforceAdminMutationSecurity(
          request,
          `${mutationRateLimitKey}:create`
        );
        if (securityResponse) {
          return securityResponse;
        }

        const payload = await parseJsonBody(request, createSchema);
        await connectMongoDB();
        await model.create(payload);

        return NextResponse.json({ message: createSuccessMessage }, { status: 201 });
      } catch (error) {
        return handleApiError(error, "Error processing request");
      }
    },

    async DELETE(request) {
      try {
        const securityResponse = await enforceAdminMutationSecurity(
          request,
          `${mutationRateLimitKey}:delete`
        );
        if (securityResponse) {
          return securityResponse;
        }

        const id = validateObjectId(request.nextUrl.searchParams.get("id"), "id");
        await connectMongoDB();
        const deleted = await model.findByIdAndDelete(id);

        if (!deleted) {
          return NextResponse.json({ message: notFoundMessage }, { status: 404 });
        }

        return NextResponse.json({ message: deleteSuccessMessage }, { status: 200 });
      } catch (error) {
        return handleApiError(error, "Error processing request");
      }
    },
  };
}

export function buildItemHandlers({
  model,
  itemKey,
  updateSchema,
  updatedEntityKey,
  updateSuccessMessage,
  notFoundMessage,
  mutationRateLimitKey,
}) {
  return {
    async GET(_request, { params }) {
      try {
        const id = validateObjectId(params?.id, "id");
        await connectMongoDB();
        const record = await model.findById(id).lean();

        if (!record) {
          return NextResponse.json({ message: notFoundMessage }, { status: 404 });
        }

        return NextResponse.json({ [itemKey]: record }, { status: 200 });
      } catch (error) {
        return handleApiError(error, "Error processing request");
      }
    },

    async PUT(request, { params }) {
      try {
        const securityResponse = await enforceAdminMutationSecurity(
          request,
          `${mutationRateLimitKey}:update`
        );
        if (securityResponse) {
          return securityResponse;
        }

        const id = validateObjectId(params?.id, "id");
        const payload = await parseJsonBody(request, updateSchema);

        await connectMongoDB();
        const updatedRecord = await model.findByIdAndUpdate(
          id,
          payload,
          {
            new: true,
            runValidators: true,
          }
        ).lean();

        if (!updatedRecord) {
          return NextResponse.json({ message: notFoundMessage }, { status: 404 });
        }

        return NextResponse.json(
          {
            message: updateSuccessMessage,
            [updatedEntityKey]: updatedRecord,
          },
          { status: 200 }
        );
      } catch (error) {
        return handleApiError(error, "Error processing request");
      }
    },
  };
}
