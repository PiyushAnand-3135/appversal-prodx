'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MemberProfilePage() {
  const params = useParams();
  const router = useRouter();
  const members = useSelector((state) => state.members.members);
  const memberId = params.id as string;
  const member = members.find((m) => m.id === memberId);
  const [growthData, setGrowthData] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completion: 0,
  });

  useEffect(() => {
    if (member && member.tasks) {
      const completed = member.tasks.filter((t) => t.completed).length;
      const total = member.tasks.length;
      const pending = total - completed;
      const completion = total > 0 ? Math.round((completed / total) * 100) : 0;

      setStats({
        total,
        completed,
        pending,
        completion,
      });

      const data = [];
      for (let i = 0; i <= 10; i++) {
        data.push({
          week: `Week ${i}`,
          tasksCompleted: Math.floor(Math.random() * (i + 1) * 3),
          average: Math.floor(Math.random() * (i + 1) * 2.5),
        });
      }
      setGrowthData(data);
    }
  }, [member]);

  if (!member) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Member not found</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const tasksByStatus = [
    { name: 'Completed', value: stats.completed, fill: '#10b981' },
    { name: 'Pending', value: stats.pending, fill: '#f59e0b' },
  ];

  const colors = {
    Working: '#10b981',
    Break: '#eab308',
    Meeting: '#3b82f6',
    Offline: '#9ca3af',
  };

  const tasksByProgress = [
    { range: '0-25%', count: member.tasks?.filter((t) => t.progress <= 25).length || 0, fill: '#ef4444' },
    { range: '26-50%', count: member.tasks?.filter((t) => t.progress > 25 && t.progress <= 50).length || 0, fill: '#f97316' },
    { range: '51-75%', count: member.tasks?.filter((t) => t.progress > 50 && t.progress <= 75).length || 0, fill: '#eab308' },
    { range: '76-100%', count: member.tasks?.filter((t) => t.progress > 75 && t.progress <= 100).length || 0, fill: '#10b981' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Member Profile</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h2 className="text-4xl font-bold mb-2">{member.name}</h2>
                <p className="text-blue-100 text-lg mb-3">{member.email}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${colors[member.status] || 'bg-gray-400'}`}></div>
                  <span className="text-blue-100 font-medium text-lg">{member.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Tasks</p>
                <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Completed</p>
                <p className="text-4xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Pending</p>
                <p className="text-4xl font-bold text-amber-600">{stats.pending}</p>
              </div>
              <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Completion Rate</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-purple-600">{stats.completion}</p>
                  <p className="text-gray-600">%</p>
                </div>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Task Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Task Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tasksByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {tasksByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} tasks`} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Progress Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Progress Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksByProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Growth */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Growth Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="tasksCompleted"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
                name="Tasks Completed"
              />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 7 }}
                name="Weekly Average"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Tasks</h3>
          <div className="space-y-3">
            {member.tasks && member.tasks.slice(-8).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          task.completed ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-12 text-right">{task.progress}%</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.completed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {task.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl border-2 border-blue-200 p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Performance Summary</h3>
              <p className="text-gray-700 leading-relaxed">
                {member.name} has completed <span className="font-semibold text-green-600">{stats.completed} out of {stats.total}</span> tasks with a <span className="font-semibold text-purple-600">{stats.completion}%</span> completion rate. 
                {stats.completion >= 80 && <span className="text-green-600 font-medium"> 🎉 Excellent performance! Keep up this momentum!</span>}
                {stats.completion >= 60 && stats.completion < 80 && <span className="text-blue-600 font-medium"> 👍 Good progress! Focus on completing the remaining tasks.</span>}
                {stats.completion < 60 && <span className="text-amber-600 font-medium"> 📈 There's room for improvement. Let's prioritize pending tasks.</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
