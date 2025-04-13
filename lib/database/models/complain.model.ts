import { type Document, Schema, model, models } from "mongoose";

// Interface Complain
export interface IComplain extends Document {
  _id: string;
  complain: string;
}

// Complain Structure Data in MongoDB
const ComplainSchema = new Schema({
  complain: { type: String, required: true, unique: true },
});

const Complain = models.Complain || model("Complain", ComplainSchema);

export default Complain;