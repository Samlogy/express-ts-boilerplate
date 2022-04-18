import mongoose from "mongoose";

export interface exampleDocument extends mongoose.Document {
  name: string;
  email: string;
  createdAt: Date;
}

const ExampleSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const Example = mongoose.model<exampleDocument>("example", ExampleSchema);

export default Example;