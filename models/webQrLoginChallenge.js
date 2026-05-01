import { Schema, model, models } from "mongoose";

const webQrLoginChallengeSchema = new Schema(
  {
    challengeId: { type: String, required: true, unique: true, index: true },
    challengeSecretHash: { type: String, required: true },
    browserCodeHash: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "consumed", "expired", "cancelled"],
      default: "pending",
      index: true,
    },
    expiresAt: { type: Date, required: true, expires: 0, index: true },
    approvedAt: { type: Date, default: null },
    consumedAt: { type: Date, default: null },
    approvedUserId: { type: Schema.Types.ObjectId, ref: "UserInfo", default: null },
    approvedEmail: { type: String, default: null, lowercase: true, trim: true },
    requestIp: { type: String, default: "" },
    requestUserAgent: { type: String, default: "" },
    approvalIp: { type: String, default: "" },
    approvalUserAgent: { type: String, default: "" },
    mobileDeviceName: { type: String, default: "" },
  },
  {
    collection: "WebQrLoginChallenges",
    timestamps: true,
  }
);

const WebQrLoginChallenge =
  models.WebQrLoginChallenge ||
  model("WebQrLoginChallenge", webQrLoginChallengeSchema);

export default WebQrLoginChallenge;
