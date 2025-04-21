// Demo data for use in the application
// This keeps hardcoded demo values separate from the actual authentication

export interface DemoCompany {
  id: string;
  name: string;
  truckCount: number;
  isPremium: boolean;
  role: string;
}

// Demo companies for mapping to Firebase auth users
export const demoCompanies: DemoCompany[] = [
  {
    id: 'demo-1',
    name: '',
    truckCount: 0,
    isPremium: false,
    role: 'admin'
  },
  {
    id: 'demo-2',
    name: '',
    truckCount: 0,
    isPremium: false,
    role: 'admin'
  },
  {
    id: 'demo-3',
    name: '',
    truckCount: 0,
    isPremium: false,
    role: 'admin'
  },
  {
    id: 'demo-4',
    name: '',
    truckCount: 0,
    isPremium: false,
    role: 'admin'
  },
  {
    id: 'demo-5',
    name: '',
    truckCount: 0,
    isPremium: false,
    role: 'admin'
  }
];

// Demo drivers
export const demoDrivers = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
];

// Demo truck models
export const demoTruckModels = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
];

// Demo routes
export const demoRoutes = [
  '', '', '', '', '', '',
  '', '', '', '', '', '',
  '', '', '', '', '', '',
  '', ''
];

// Get demo company data for a given email
export const getDemoCompanyForUser = (email?: string): DemoCompany => {
  return {
    id: 'user-0',
    name: '',
    truckCount: 0,
    isPremium: false,
    role: 'admin'
  };
};

// Get random vehicles for a company
export interface DemoVehicle {
  id: number;
  name: string;
  driver: string;
  speed: number;
  route: string;
}

export const getDemoVehicles = (count: number): DemoVehicle[] => {
  return Array.from({ length: 0 }, (_, i) => ({
    id: 0,
    name: '',
    driver: '',
    speed: 0,
    route: ''
  }));
};

// Get map vehicles for live tracking
export interface DemoMapVehicle {
  id: string;
  licensePlate: string;
  driver: string;
  model: string;
  status: 'active' | 'idle' | 'maintenance';
  location?: {
    lat: number;
    lng: number;
    route: string;
    speed: number;
  };
}

export const getDemoMapVehicles = (count: number): DemoMapVehicle[] => {
  return Array.from({ length: 0 }, (_, i) => ({
    id: ``,
    licensePlate: ``,
    driver: ``,
    model: ``,
    status: 'idle'
  }));
};

// Get fleet status counts
export interface FleetStatusCounts {
  active: number;
  idle: number;
  maintenance: number;
}

export const getFleetStatusCounts = (truckCount: number): FleetStatusCounts => {
  return {
    active: 0,
    idle: 0,
    maintenance: 0
  };
};

// Get activity statistics
export interface ActivityStats {
  deliveries: number;
  distance: number;
  fuelUsed: number;
}

export const getActivityStats = (truckCount: number): ActivityStats => {
  return {
    deliveries: 0,
    distance: 0,
    fuelUsed: 0
  };
};

// Get alert data
export interface DemoAlert {
  type: 'warning' | 'danger';
  title: string;
  description: string;
}

export const getDemoAlerts = (): DemoAlert[] => {
  return [];
};

// Get weekly data for charts
export interface WeeklyData {
  distance: {
    values: number[];
    total: number;
    changePercent: number;
  };
  fuel: {
    values: number[];
    total: number;
    changePercent: number;
  };
  drivers: {
    names: string[];
    scores: number[];
  };
}

export const getWeeklyData = (truckCount: number): WeeklyData => {
  return {
    distance: {
      values: [0, 0, 0, 0, 0, 0, 0],
      total: 0,
      changePercent: 0
    },
    fuel: {
      values: [0, 0, 0, 0, 0, 0, 0],
      total: 0,
      changePercent: 0
    },
    drivers: {
      names: [],
      scores: []
    }
  };
}; 