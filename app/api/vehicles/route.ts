import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET all vehicles for a company
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the company ID from the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      include: { company: true }
    });
    
    if (!user || !user.company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
    
    // Get all vehicles for this company
    const vehicles = await prisma.vehicle.findMany({
      where: { companyId: user.company.id },
      include: { 
        driver: true,
        logs: {
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      }
    });
    
    // Add location data from the most recent log
    const formattedVehicles = vehicles.map(vehicle => {
      const latestLog = vehicle.logs[0];
      
      return {
        id: vehicle.id,
        name: vehicle.name,
        licensePlate: vehicle.licensePlate,
        model: vehicle.model,
        year: vehicle.year,
        status: vehicle.status,
        driver: vehicle.driver ? vehicle.driver.name : null,
        fuelLevel: vehicle.fuelLevel,
        lastService: vehicle.lastService,
        location: latestLog ? {
          lat: latestLog.latitude,
          lng: latestLog.longitude,
          route: latestLog.route,
          speed: latestLog.speed
        } : null
      };
    });
    
    return NextResponse.json({ vehicles: formattedVehicles });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new vehicle
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the company ID from the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      include: { company: true }
    });
    
    if (!user || !user.company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.licensePlate || !data.model || !data.year) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Create the vehicle
    const vehicle = await prisma.vehicle.create({
      data: {
        name: data.name,
        licensePlate: data.licensePlate,
        model: data.model,
        year: data.year,
        status: data.status || 'active',
        fuelLevel: data.fuelLevel || 100,
        lastService: data.lastService ? new Date(data.lastService) : new Date(),
        companyId: user.company.id,
        ...(data.driverId && { driverId: data.driverId })
      }
    });
    
    return NextResponse.json({ vehicle }, { status: 201 });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 