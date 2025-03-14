import { Schema, model, models } from 'mongoose';

const truckSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  type: {
    type: String,
    required: true,
    enum: ['Heavy Trucks', 'Light Commercial', 'Vans', 'Special Equipment'],
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  capacity: {
    weight: {
      type: Number, // in kg
      required: true,
    },
    volume: {
      type: Number, // in cubic meters
      required: true,
    }
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    }
  },
  status: {
    type: String,
    enum: ['available', 'in-transit', 'maintenance', 'inactive'],
    default: 'available',
  },
  maintenanceHistory: [{
    date: Date,
    description: String,
    cost: Number,
    nextMaintenanceDate: Date,
  }],
  fuelEfficiency: {
    type: Number, // km/L
    default: 0,
  },
  documents: {
    insurance: {
      number: String,
      expiryDate: Date,
      provider: String,
    },
    registration: {
      expiryDate: Date,
      state: String,
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Add geospatial index for location-based queries
truckSchema.index({ currentLocation: '2dsphere' });

export const Truck = models.Truck || model('Truck', truckSchema); 