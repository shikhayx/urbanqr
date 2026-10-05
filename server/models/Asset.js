import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
  {
    assetId: {
      type: String,
      required: [true, 'Asset ID is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Asset type is required'],
      enum: [
        'Streetlight',
        'Garbage Bin',
        'Bus Stop',
        'Public Toilet',
        'Park Equipment',
        'Water Point',
      ],
    },
    location: {
      type: String,
      required: [true, 'Asset location is required'],
      trim: true,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ['Operational', 'Faulty', 'Needs Maintenance', 'Needs Inspection', 'Needs Clearing', 'Under Repair'],
      default: 'Operational',
    },
    installationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Asset = mongoose.model('Asset', assetSchema);
