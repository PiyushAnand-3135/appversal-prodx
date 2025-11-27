'use client';

import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TaskForm from '@/components/TaskForm';

export default function TasksPage() {
  const dispatch = useDispatch();
  const members = useSelector((state: any) => state.members.members);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-8">
          <div className="max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Assign Tasks</h1>
              <p className="text-gray-600 mt-1">Create and assign tasks to team members</p>
            </div>

            {/* Task Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Task</h2>
              <TaskForm />
            </div>

            {/* Team Members List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {members.map((member: any) => (
                  <div key={member.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          member.status === 'Working'
                            ? 'bg-green-100 text-green-800'
                            : member.status === 'Break'
                              ? 'bg-yellow-100 text-yellow-800'
                              : member.status === 'Meeting'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                          {member.status}
                        </span>
                        <span className="text-sm text-gray-600">
                          {member.tasks?.length || 0} tasks
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
