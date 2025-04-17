// In-memory user storage
export type UserType = {
  _id: string;
  company: string;
  email: string;
  password: string;
  phone: string;
  truckCount: number;
  isPremium: boolean;
  createdAt: Date;
  role: 'owner' | 'driver';
};

// In-memory database of users
const users: UserType[] = [
  {
    _id: '1',
    company: 'Demo Company',
    email: 'user@example.com',
    // hashed version of 'password123'
    password: '$2a$10$JTaZ.qZPkwzEtfa9mIv/X.F.jvU25MPZM9VsZB2ylM67Wz64Wghui',
    phone: '123-456-7890',
    truckCount: 10,
    isPremium: true,
    createdAt: new Date(),
    role: 'owner'
  },
  {
    _id: 'demo123',
    company: 'Demo Transport LLC',
    email: 'demo@vayo.com',
    // hashed version of 'demo1234'
    password: '$2a$10$hLXt4AvjfJw1kVOqRMfUu.bX4KOVXxq0CYwEUJ8AcHSGk.evDn5IS',
    phone: '555-123-4567',
    truckCount: 5,
    isPremium: true,
    createdAt: new Date(),
    role: 'owner'
  }
];

// User model API
export const User = {
  findOne: async (query: { email?: string }) => {
    return users.find(user => query.email && user.email.toLowerCase() === query.email.toLowerCase()) || null;
  },
  
  findById: async (id: string) => {
    return users.find(user => user._id === id) || null;
  },
  
  create: async (userData: Omit<UserType, '_id' | 'createdAt'>) => {
    const id = (users.length + 1).toString();
    const newUser = {
      _id: id,
      ...userData,
      createdAt: new Date()
    };
    
    users.push(newUser);
    return newUser;
  }
}; 