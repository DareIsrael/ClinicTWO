import mongoose from "mongoose";

/**
 * Per-recipient embedded subdocument.
 *
 * Lifecycle: pending → processing → sent | failed. Temporary failures return
 * to pending with nextAttemptAt until the retry limit is reached.
 *
 * Duplicate-prevention rule:
 *   The processing endpoint skips any recipient whose status is "sent".
 *   If a function crashes after calling sendMail but before marking the
 *   recipient as "sent", a retry *may* resend that one email. This window
 *   is typically < 100 ms and is the only unavoidable duplicate-delivery risk.
 */
const recipientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "sent", "failed"],
      default: "pending",
    },
    error: {
      type: String,
      default: null,
    },
    retryCount: {
      type: Number,
      default: 0,
    },
    sentAt: {
      type: Date,
      default: null,
    },
    nextAttemptAt: { type: Date, default: null },
    processingStartedAt: { type: Date, default: null },
    processingToken: { type: String, default: null },
  },
  { _id: true },
);

const campaignSchema = new mongoose.Schema(
  {
    /** "waitlist" or "appointment" — matches existing BroadcastMessage.type */
    type: {
      type: String,
      enum: ["waitlist", "appointment"],
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    /** Pre-rendered HTML stored once so every chunk uses the same content */
    emailHtml: {
      type: String,
      required: true,
    },
    statusFilter: {
      type: String,
      default: "all",
    },
    targetEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    sentBy: {
      type: String,
      required: true,
      trim: true,
    },

    /** Overall campaign status */
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "paused"],
      default: "pending",
    },

    /** Aggregate counters — updated after each processing chunk */
    totalRecipients: { type: Number, default: 0 },
    sentCount: { type: Number, default: 0 },
    failedCount: { type: Number, default: 0 },
    pendingCount: { type: Number, default: 0 },

    /** All recipients with individual tracking */
    recipients: [recipientSchema],

    /** Timestamp when the last processing chunk ran */
    lastProcessedAt: { type: Date, default: null },

    /** Processing metadata */
    chunkSize: { type: Number, default: 5 },
    delayBetweenEmailsMs: { type: Number, default: 500 },

    completedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

// Indexes for efficient querying
campaignSchema.index({ status: 1 });
campaignSchema.index({ createdAt: -1 });
campaignSchema.index({ type: 1, createdAt: -1 });

/**
 * Recalculate aggregate counters from the recipients array.
 * Call this after modifying recipient statuses in bulk.
 */
campaignSchema.methods.recalculateCounts = function () {
  this.sentCount = this.recipients.filter((r) => r.status === "sent").length;
  this.failedCount = this.recipients.filter(
    (r) => r.status === "failed",
  ).length;
  this.pendingCount = this.recipients.filter(
    (r) => r.status === "pending" || r.status === "processing",
  ).length;
};

export default mongoose.models.Campaign ||
  mongoose.model("Campaign", campaignSchema);
