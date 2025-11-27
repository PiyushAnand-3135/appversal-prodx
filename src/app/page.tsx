'use client';

import { useState, useEffect } from 'react';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/pages/Dashboard';
import { useSelector } from 'react-redux';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-3xl">TP</span>
          </div>
          <p className="text-gray-600 text-lg">Loading Team Pulse...</p>
        </div>
      </div>
    );
  }

  return currentPage === 'landing' ? (
    <LandingPage onNavigate={setCurrentPage} />
  ) : (
    <Dashboard />
  );
}