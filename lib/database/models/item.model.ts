import { type Document, Schema, model, models } from "mongoose";

// Interface Item
export interface IItem extends Document {
  _id: string;
  imageUrl: string;
  name: string;
  description?: string;

  // Customer
  customer: {
    _id: string; 
    firstName: string; 
    lastName: string;
    phone: string;
    loc?: string;
    locUrl?: string;
  }

  // Status
  status: "recieved" | "processed" | "to_deliver" | "completed";
  recievedDateTime: Date;
  dedlineDateTime: Date;
  isProcessed: Boolean;
  processedDateTime: Date;
  isDelivery: Boolean;
  toDeliverDateTime: Date;
  deliveryLocation: string;
  deliveryLocationUrl: string,
  isCompleted: boolean;
  completedDateTime: Date;

  // Service
  service: {
    _id: string; 
    name: string;
    price: Number;
    ownerEarning: Number;
    workerEarning: Number;
    courierEarning: Number;
    ccEarning: Number;
  }
  worker: { 
    _id: string; 
    firstName: string; 
    lastName: string 
  };
  courier?: { 
    _id: string; 
    firstName: string; 
    lastName: string 
  };

  // Complain
  isComplained: boolean;
  complain?: { 
    _id: string; 
    complain: string 
  };
}

// Item Structure Data in MongoDB
const ItemSchema = new Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },

  // Customer
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },

  // Status
  status: {
    type: String,
    enum: ["recieved", "processed", "to_deliver", "completed"],
    default: "recieved",
  },
  dedlineDateTime: { type: Date, required: true },
  recievedDateTime: { type: Date, required: true },
  isProcessed: { type: Boolean, required: true, default: false},
  processedDateTime: { type: Date },
  isDelivery: { type: Boolean, required: true, default: false},
  toDeliverDateTime: { type: Date },
  deliveryLocation: { type: String },
  deliveryLocationUrl: { type: String },
  isCompleted: { type: Boolean, required: true, default: false },
  completedDateTime: { type: Date },

  // Service
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },

  worker: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  courier: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  // Complain
  isComplained: { type: Boolean, required: true, default: false },
  complain: {
    type: Schema.Types.ObjectId,
    ref: "Complain",
  },
});

const Item = models.Item || model("Item", ItemSchema);

export default Item;