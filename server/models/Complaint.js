import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: [true, 'Complaint ID is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    assetId: {
      type: String,
      required: [true, 'Asset ID is required'],
      uppercase: true,
      trim: true,
      ref: 'Asset',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    issueType: {
      type: String,
      required: [true, 'Issue type is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    photo: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Submitted', 'Assigned', 'In Progress', 'Resolved'],
      default: 'Submitted',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    confirmations: {
      type: Number,
      default: 1,
      min: 1,
    },
    confirmedUsers: {
      type: [String],
      default: [],
    },
    assignedWorker: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to quickly find active duplicate complaints for the same asset & issueType
complaintSchema.index({ assetId: 1, issueType: 1, status: 1 });

export const Complaint = mongoose.model('Complaint', complaintSchema);
