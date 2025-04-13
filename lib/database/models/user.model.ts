import { Schema, model, models } from "mongoose";

// Interface User
export interface IUser extends Document {
  _id: string;
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;

  role: "owner" | "worker";

  totalEarning: number;
  ownerEarning: number;
  workerEarning: number;
  courierEarning: number;

  itemsPerService: {
    service: {
      _id: string;
      name: string;
    };
    count: number;
  }[];

  totalItemsHandled: number;
}

// User Structure Data in MongoDB
const UserSchema = new Schema({
  clerkId: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  photo: {type: String, required: true},

  role: {
    type: String,
    enum: ["owner", "worker"],
    required: true,
  },

  totalEarning: { type: Number, default: 0 },
  ownerEarning: { type: Number, default: 0 },
  workerEarning: { type: Number, default: 0 },
  courierEarning: { type: Number, default: 0 },

  itemsPerService: [
    {
      service: {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
      count: { type: Number, default: 0 },
    },
  ],
  totalItemsHandled: { type: Number, default: 0 },
})

const User = models.User || model('User', UserSchema)

export default User