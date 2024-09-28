import mongoose from "mongoose";

// Định nghĩa schema cho TestApi
const testSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

testSchema.pre("save", function (next) {
  if (!this.content) {
    const err = new Error("Content is required");
    return next(err);
  }
  next();
});

testSchema.post("save", function (doc) {
  console.log("TestApi saved successfully:", doc);
});

const TestApi = mongoose.model("TestApi", testSchema);

export default TestApi;
