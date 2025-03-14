import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  truckCount: {
    type: Number,
    required: [true, 'Number of trucks is required'],
    min: [0, 'Number of trucks cannot be negative'],
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['owner', 'driver'],
    default: 'owner',
  }
});

export const User = models.User || model('User', userSchema); 