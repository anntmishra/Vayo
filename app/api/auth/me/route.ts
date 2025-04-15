import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import connectDB from '@/app/lib/mongodb';
import { User } from '@/app/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest) {
  try {
    // Get the session token from cookies
    const sessionToken = req.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    try {
      // Verify the token
      const secretKey = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jose.jwtVerify(sessionToken, secretKey);

      // Connect to database
      await connectDB();

      // Find user by ID
      const user = await User.findById(payload.userId);
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      // Return user information without sensitive data
      return NextResponse.json({
        user: {
          id: user._id,
          company: user.company,
          email: user.email,
          role: user.role,
          truckCount: user.truckCount,
          isPremium: user.isPremium
        }
      });
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 