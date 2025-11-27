'use client';

import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TaskForm from '@/components/TaskForm';

export default function TasksPage() {
  const dispatch = useDispatch();
  const members = useSelector((state: any) => state.members.members);
  const { currentRole } = useSelector((state: any) => state.role);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-8">
          <div className="max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {currentRole === 'lead' ? 'Assign Tasks' : 'My Assigned Tasks'}
              </h1>
              <p className="text-gray-600 mt-1">
                {currentRole === 'lead' ? 'Create and assign tasks to team members' : 'View all your assigned tasks'}
              </p>
            </div>

            {/* Task Form - Only for Team Leads */}
            {currentRole === 'lead' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Task</h2>
                <TaskForm />
              </div>
            )}

            {/* Team Members List - For Leads */}
            {currentRole === 'lead' && (
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
            )}

            {/* Members Assigned Tasks - For Team Members */}
            {currentRole === 'member' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
                </div>
                <div className="p-6">
                  {members.flatMap((member: any) =>
                    member.tasks?.map((task: any) => (
                      <div
                        key={`${member.id}-${task.id}`}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all group mb-3"
                      >
                        <div className="flex-1 flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">{task.title}</p>
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0 ${
                                task.completed
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}>
                                {task.completed ? 'Completed' : 'In Progress'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">{task.progress}%</p>
                            <p className="text-xs text-gray-500">
                              {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="w-24 bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full transition-all ${
                                task.completed ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-slate-700'
                              }`}
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {!members.some((m: any) => m.tasks?.length) && (
                    <div className="text-center py-8">
                      <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500 font-medium">No tasks assigned yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
