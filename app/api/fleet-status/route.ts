import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';
import { getFleetStatusCounts } from '@/app/lib/db-utils';

// GET fleet status data
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
    
    // Get fleet status counts
    const fleetStatus = await getFleetStatusCounts(user.company.id);
    
    return NextResponse.json({ fleetStatus });
  } catch (error) {
    console.error('Error fetching fleet status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 