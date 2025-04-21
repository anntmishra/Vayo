'use client';

import React, { ReactNode } from 'react';
import { AuthProvider } from './lib/AuthContext';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return <AuthProvider>{children}</AuthProvider>;
} 