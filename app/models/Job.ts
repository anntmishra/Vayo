import { Schema, model, models } from 'mongoose';

const jobSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: {
      type: String,
      required: true,
    }
  },
  destination: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: {
      type: String,
      required: true,
    }
  },
  payment: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    }
  },
  requiredTruckType: {
    type: String,
    required: true,
    enum: ['Heavy Trucks', 'Light Commercial', 'Vans', 'Special Equipment'],
  },
  status: {
    type: String,
    enum: ['open', 'assigned', 'in-progress', 'completed', 'cancelled'],
    default: 'open',
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  estimatedDuration: {
    type: Number, // in minutes
    required: true,
  },
  distance: {
    type: Number, // in kilometers
    required: true,
  }
});

// Add geospatial index for location-based queries
jobSchema.index({ location: '2dsphere' });
jobSchema.index({ destination: '2dsphere' });

export const Job = models.Job || model('Job', jobSchema); 