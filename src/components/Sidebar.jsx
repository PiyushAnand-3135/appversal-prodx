'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { 
  MdDashboard, 
  MdPeople, 
  MdTaskAlt, 
  MdAssessment, 
  MdPerson, 
  MdSettings, 
  MdLogout,
  MdMenu,
  MdClose
} from 'react-icons/md';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { currentRole } = useSelector((state) => state.role);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: MdDashboard,
      href: '/dashboard',
      roles: ['lead', 'member'],
    },
    {
      id: 'team',
      label: 'Team Members',
      icon: MdPeople,
      href: '/dashboard/team-members',
      roles: ['lead'],
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: MdTaskAlt,
      href: '/dashboard/tasks',
      roles: ['lead', 'member'],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: MdAssessment,
      href: '/dashboard',
      roles: ['lead'],
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: MdPerson,
      href: '/dashboard/profile',
      roles: ['lead', 'member'],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: MdSettings,
      href: '/dashboard',
      roles: ['lead', 'member'],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(currentRole)
  );

  const handleLogout = () => {
    // Add logout logic here
    router.push('/');
  };

  return (
    <aside
      className={`bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? 'w-72 ml-2 mr-4' : 'w-24 ml-4 mr-4'
      } min-h-screen shadow-2xl border-r border-slate-700 rounded-3xl mt-4`}
    >
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between border-b border-slate-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
          title={isOpen ? 'Collapse' : 'Expand'}
        >
          {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
        {filteredMenuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-700 active:bg-slate-600 transition-all duration-200 group relative text-slate-200 hover:text-white ${
                !isOpen ? 'justify-center' : ''
              }`}
              title={!isOpen ? item.label : ''}
            >
              <IconComponent size={24} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
              {isOpen && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {!isOpen && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-950 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700 shadow-lg">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="px-3 py-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-600/20 hover:text-red-400 active:bg-red-600/30 transition-all duration-200 group relative text-slate-200 ${
            !isOpen ? 'justify-center' : ''
          }`}
          title={!isOpen ? 'Logout' : ''}
        >
          <MdLogout size={24} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
          {isOpen && (
            <span className="text-sm font-medium truncate">Logout</span>
          )}
          {!isOpen && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-950 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700 shadow-lg">
              Logout
            </div>
          )}
        </button>
      </div>

      {/* User Info Section */}
      {isOpen && (
        <div className="px-4 py-4 border-t border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {currentRole === 'lead' ? 'L' : 'M'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate text-white">
                {currentRole === 'lead' ? 'Team Lead' : 'Team Member'}
              </p>
              <p className="text-xs text-slate-400 truncate">● Active</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
