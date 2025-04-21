import { prisma } from './prisma';

// Get all vehicles for a company
export async function getVehiclesForCompany(companyId: string) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { 
        companyId 
      },
      include: {
        driver: true,
        logs: {
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      }
    });

    // Format vehicle data with latest log information
    return vehicles.map(vehicle => {
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
  } catch (error) {
    console.error('Error getting vehicles:', error);
    throw error;
  }
}

// Get fleet status counts
export async function getFleetStatusCounts(companyId: string) {
  try {
    const [active, idle, maintenance] = await Promise.all([
      prisma.vehicle.count({
        where: {
          companyId,
          status: 'active'
        }
      }),
      prisma.vehicle.count({
        where: {
          companyId,
          status: 'idle'
        }
      }),
      prisma.vehicle.count({
        where: {
          companyId,
          status: 'maintenance'
        }
      })
    ]);

    return {
      active,
      idle,
      maintenance
    };
  } catch (error) {
    console.error('Error getting fleet status:', error);
    throw error;
  }
}

// Get activity statistics
export async function getActivityStats(companyId: string) {
  try {
    // Get all vehicles for this company
    const vehicles = await prisma.vehicle.count({
      where: { companyId }
    });

    // Get today's logs (for real app, would calculate actual data from logs)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const logs = await prisma.vehicleLog.findMany({
      where: {
        vehicle: {
          companyId
        },
        timestamp: {
          gte: today
        }
      }
    });

    // Calculate totals - in a real app, this would use actual log data
    // For now, use a simple calculation based on vehicle count
    const deliveries = Math.floor(vehicles * 1.5);
    const distance = vehicles * 120;
    const fuelUsed = vehicles * 15;

    return {
      deliveries,
      distance,
      fuelUsed
    };
  } catch (error) {
    console.error('Error getting activity stats:', error);
    throw error;
  }
}

// Get alerts for a company
export async function getAlerts(companyId: string) {
  try {
    const alerts = await prisma.alert.findMany({
      where: {
        companyId,
        isRead: false
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });

    return alerts;
  } catch (error) {
    console.error('Error getting alerts:', error);
    throw error;
  }
}

// Get weekly data
export async function getWeeklyData(companyId: string) {
  try {
    // Get current week and year
    const date = new Date();
    const week = getWeekNumber(date);
    const year = date.getFullYear();

    // Try to find existing weekly summary
    let summary = await prisma.weeklySummary.findFirst({
      where: {
        companyId,
        week,
        year
      }
    });

    // If no summary exists for this week, generate one based on vehicle count
    if (!summary) {
      const vehicles: number = await prisma.vehicle.count({
        where: { companyId }
      });

      // Generate zero values for all days
      const distanceValues = Array.from({ length: 7 }, () => 0);
      const fuelValues = Array.from({ length: 7 }, () => 0);
      
      summary = await prisma.weeklySummary.create({
        data: {
          companyId,
          week,
          year,
          distanceTotal: 0,
          fuelTotal: 0,
          distanceChangePct: 0,
          fuelChangePct: 0,
          dailyDistances: JSON.stringify(distanceValues),
          dailyFuel: JSON.stringify(fuelValues)
        }
      });
    }

    // Get driver scores
    const driverScores = await prisma.driverScore.findMany({
      where: {
        companyId,
        week,
        year
      },
      orderBy: {
        score: 'desc'
      },
      take: 3
    });

    return {
      distance: {
        values: JSON.parse(summary.dailyDistances as string),
        total: summary.distanceTotal,
        changePercent: summary.distanceChangePct
      },
      fuel: {
        values: JSON.parse(summary.dailyFuel as string),
        total: summary.fuelTotal,
        changePercent: summary.fuelChangePct
      },
      drivers: {
        names: driverScores.map((d: any) => d.driverName),
        scores: driverScores.map((d: any) => d.score)
      }
    };
  } catch (error) {
    console.error('Error getting weekly data:', error);
    throw error;
  }
}

// Helper function to get the week number
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
} 