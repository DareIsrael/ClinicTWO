import mongoose from "mongoose";

const teaserSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: [true, "Headline is required"],
      trim: true,
      maxlength: [200, "Headline cannot exceed 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
    buttonText: {
      type: String,
      trim: true,
      maxlength: [100, "Button text cannot exceed 100 characters"],
      default: "",
    },
    buttonLink: {
      type: String,
      trim: true,
      maxlength: [500, "Button link cannot exceed 500 characters"],
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for published teasers
teaserSchema.index({ isPublished: 1, createdAt: -1 });

export default mongoose.models.Teaser ||
  mongoose.model("Teaser", teaserSchema);
