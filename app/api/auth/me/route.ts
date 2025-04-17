import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import { User } from '@/app/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

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
      
      // Type assert the payload
      const userPayload = payload as unknown as JWTPayload;

      // Special handler for demo user
      if (userPayload.userId === 'demo123' && userPayload.email === 'demo@vayo.com') {
        return NextResponse.json({
          user: {
            id: 'demo123',
            company: 'Demo Transport LLC',
            email: 'demo@vayo.com',
            role: 'owner',
            truckCount: 5,
            isPremium: true
          }
        });
      }

      // Find user by ID
      const user = await User.findById(userPayload.userId);
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