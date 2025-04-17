import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { User } from '@/app/models/User';

export async function POST(req: Request) {
  try {
    if (!req.body) {
      return NextResponse.json(
        { error: 'No request body provided' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { company, email, password, phone, truckCount, role = 'owner' } = body;

    // Validate required fields
    if (!company || !email || !password || !phone || !truckCount) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      company,
      email,
      password: hashedPassword,
      phone,
      truckCount: parseInt(truckCount),
      isPremium: parseInt(truckCount) > 5,
      role: role as 'owner' | 'driver'
    });

    // Return success response without sensitive data
    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user._id,
          company: user.company,
          email: user.email,
          truckCount: user.truckCount,
          isPremium: user.isPremium
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 