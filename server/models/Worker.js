import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Worker name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Worker email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Worker phone number is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Available', 'On-Site', 'En Route', 'Off Duty'],
      default: 'Available',
    },
  },
  {
    timestamps: true,
  }
);

export const Worker = mongoose.model('Worker', workerSchema);
