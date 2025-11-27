import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MemberProfile({ member, onClose }) {
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

  if (!member) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold">{member.name}</h1>
              <p className="text-blue-100">{member.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${colors[member.status] || 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium">{member.status}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-500 p-2 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <p className="text-blue-600 text-sm font-medium mb-1">Total Tasks</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <p className="text-green-600 text-sm font-medium mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-900">{stats.completed}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <p className="text-amber-600 text-sm font-medium mb-1">Pending</p>
              <p className="text-3xl font-bold text-amber-900">{stats.pending}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <p className="text-purple-600 text-sm font-medium mb-1">Completion Rate</p>
              <p className="text-3xl font-bold text-purple-900">{stats.completion}%</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Task Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={tasksByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {tasksByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} tasks`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Tasks</h3>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {member.tasks && member.tasks.slice(-5).map((task) => (
                  <div key={task.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        task.completed
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {task.completed ? 'Completed' : `${task.progress}%`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-blue-500"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
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
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Tasks Completed"
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Weekly Average"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Performance Summary</h3>
            <p className="text-gray-600">
              {member.name} has completed <strong>{stats.completed}</strong> out of <strong>{stats.total}</strong> tasks with a <strong>{stats.completion}%</strong> completion rate. 
              {stats.completion >= 80 && ' Great job maintaining excellent productivity!'}
              {stats.completion >= 60 && stats.completion < 80 && ' Keep pushing to reach your goals!'}
              {stats.completion < 60 && ' There\'s room for improvement. Let\'s focus on finishing pending tasks.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
