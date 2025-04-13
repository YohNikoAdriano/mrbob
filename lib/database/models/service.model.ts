import { type Document, Schema, model, models } from "mongoose";

// Interface Service
export interface IService extends Document {
  _id: string; 
  name: string;
  price: Number;
  ownerEarning: Number;
  workerEarning: Number;
  courierEarning: Number;
  ccEarning: Number;
}

// Service Structure Data in MongoDB
const ServiceSchema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  ownerEarning: {type: Number, required: true},
  workerEarning: {type: Number, required: true},
  courierEarning: {type: Number, required: true},
  ccEarning: {type: Number, required: true},
})

const Service = models.Service || model('Service', ServiceSchema)

export default Service