import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import connectDB from '@/app/lib/mongodb';
import { User } from '@/app/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SESSION_DURATION = 30 * 24 * 60 * 60; // 30 days in seconds
const SHORT_SESSION = 24 * 60 * 60; // 24 hours in seconds

export async function POST(req: Request) {
  try {
    const { email, password, rememberMe } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session token using jose
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new jose.SignJWT({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(rememberMe ? `${SESSION_DURATION}s` : `${SHORT_SESSION}s`)
      .sign(secret);

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: rememberMe ? SESSION_DURATION : SHORT_SESSION,
      path: '/'
    };

    // Create response with cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        company: user.company,
        email: user.email,
        role: user.role,
        truckCount: user.truckCount,
        isPremium: user.isPremium
      }
    });

    // Set the session cookie
    response.cookies.set('session_token', token, cookieOptions);

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 