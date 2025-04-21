import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';
import { getActivityStats } from '@/app/lib/db-utils';

// GET activity stats
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
    
    // Get activity stats
    const activityStats = await getActivityStats(user.company.id);
    
    return NextResponse.json({ activityStats });
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 