import { type Document, Schema, model, models } from "mongoose";

// Interface Customer
export interface ICustomer extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  loc?: string;
  locUrl?: string;
}

// Customer Structure Data in MongoDB
const CustomerSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  photo: {type: String, required: true},
  loc: {type: String },
  locUrl: {type: String }
})

const Customer = models.Customer || model('Customer', CustomerSchema)

export default Customer