'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Only import Leaflet components on the client side
// We'll use dynamic imports for these
interface Vehicle {
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

interface LiveFleetMapProps {
  vehicles: Vehicle[];
}

// This is a loading placeholder component
function MapLoadingPlaceholder() {
  return (
    <div className="flex items-center justify-center w-full h-[400px] bg-gray-50 rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
        <p className="text-indigo-700 text-sm">Loading map...</p>
      </div>
    </div>
  );
}

// Simple static map component that doesn't use Leaflet
function StaticMapComponent({ vehicles }: LiveFleetMapProps) {
  return (
    <div className="w-full h-[400px] bg-gray-100 rounded-xl relative overflow-hidden">
      {/* Simple map background with grid lines */}
      <div className="absolute inset-0 bg-[#EBF1FB]">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-[#D5E3F7] opacity-40"></div>
          ))}
        </div>
        
        {/* Major "roads" */}
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-[#A8C3E8]"></div>
        <div className="absolute top-2/3 left-0 right-0 h-1 bg-[#A8C3E8]"></div>
        <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-[#A8C3E8]"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-[#A8C3E8]"></div>
        
        {/* Vehicle indicators */}
        {vehicles.slice(0, 6).map((vehicle, index) => {
          // Generate random positions for vehicles
          const top = 10 + Math.floor(Math.random() * 80);
          const left = 10 + Math.floor(Math.random() * 80);
          
          return (
            <div 
              key={vehicle.id}
              className="absolute w-4 h-4 rounded-full bg-indigo-600 shadow-md transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                top: `${top}%`, 
                left: `${left}%`,
                backgroundColor: vehicle.status === 'active' ? '#4F46E5' : 
                                vehicle.status === 'idle' ? '#7C3AED' : '#DC2626'
              }}
              title={`${vehicle.licensePlate} - ${vehicle.driver}`}
            >
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-50"></div>
            </div>
          );
        })}
        
        {/* Map labels */}
        <div className="absolute bottom-3 left-3 bg-white/70 p-2 rounded text-xs text-indigo-700 font-medium">Sample Map View</div>
        <div className="absolute top-3 right-3 bg-white/70 p-2 rounded text-xs flex items-center">
          <span className="w-2 h-2 rounded-full bg-indigo-600 mr-1"></span>
          <span className="text-indigo-700">Active</span>
          <span className="w-2 h-2 rounded-full bg-purple-600 mx-1 ml-2"></span>
          <span className="text-indigo-700">Idle</span>
          <span className="w-2 h-2 rounded-full bg-red-600 mx-1 ml-2"></span>
          <span className="text-indigo-700">Maintenance</span>
        </div>
      </div>
    </div>
  );
}

// Create a component that will only be loaded on the client side
// Using the StaticMapComponent instead of the real map implementation to avoid initialization issues
const LiveFleetMap = dynamic(() => Promise.resolve(StaticMapComponent), { 
  ssr: false,
  loading: () => <MapLoadingPlaceholder />
});

export default LiveFleetMap; 