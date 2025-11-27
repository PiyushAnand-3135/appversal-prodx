'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function TeamMembersPage() {
  const router = useRouter();
  const members = useSelector((state: any) => state.members.members);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-8">
          <div className="max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
              <p className="text-gray-600 mt-1">Manage and view all team members</p>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member: any) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-16 h-16 rounded-full border-2 border-blue-200"
                      />
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          member.status === 'Working'
                            ? 'bg-green-100 text-green-800'
                            : member.status === 'Break'
                              ? 'bg-yellow-100 text-yellow-800'
                              : member.status === 'Meeting'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{member.email}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          member.status === 'Working'
                            ? 'bg-green-500'
                            : member.status === 'Break'
                              ? 'bg-yellow-500'
                              : member.status === 'Meeting'
                                ? 'bg-blue-500'
                                : 'bg-gray-500'
                        }`}
                      ></div>
                      <span className="text-sm text-gray-600">
                        {member.status === 'Working'
                          ? 'Currently working'
                          : member.status === 'Break'
                            ? 'On break'
                            : member.status === 'Meeting'
                              ? 'In a meeting'
                              : 'Offline'}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Last updated: {new Date(member.lastStatuusUpdate).toLocaleTimeString()}
                      </p>
                    </div>

                    <button 
                      onClick={() => router.push(`/dashboard/profile/${member.id}`)}
                      className="w-full mt-4 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
