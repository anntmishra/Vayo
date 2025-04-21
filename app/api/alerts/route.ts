import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';
import { getAlerts } from '@/app/lib/db-utils';

// GET alerts
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the company ID from the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      include: { company: true }
    });
    
    if (!user?.company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
    
    // Get alerts
    const alerts = await getAlerts(user.company.id);
    
    return NextResponse.json({ alerts });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new alert
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the company ID from the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      include: { company: true }
    });
    
    if (!user?.company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.type || !data.title || !data.description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Create the alert
    const alert = await prisma.alert.create({
      data: {
        type: data.type,
        title: data.title,
        description: data.description,
        companyId: user.company.id
      }
    });
    
    return NextResponse.json({ alert }, { status: 201 });
  } catch (error) {
    console.error('Error creating alert:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 