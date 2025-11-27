import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberCard from './MemberCard';
import StatusDistribution from './StatusDistribution';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TeamLeadView() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [growthData, setGrowthData] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Generate mock growth data
    const data = [];
    for (let i = 0; i <= 10; i++) {
      data.push({
        week: `Week ${i}`,
        tasksCompleted: Math.floor(Math.random() * 30) + 10,
        productivity: Math.floor(Math.random() * 100) + 50,
      });
    }
    setGrowthData(data);

    // Generate mock upcoming events
    const events = [
      {
        id: 1,
        title: 'Sprint Planning',
        date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        time: '10:00 AM',
        attendees: 8,
      },
      {
        id: 2,
        title: 'Team Sync',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        time: '02:00 PM',
        attendees: 6,
      },
      {
        id: 3,
        title: 'Project Review',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        time: '03:30 PM',
        attendees: 5,
      },
      {
        id: 4,
        title: 'Weekly Standup',
        date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        time: '09:00 AM',
        attendees: 8,
      },
    ];
    setUpcomingEvents(events);
  }, []);

  const statusCounts = {
    Working: members.filter((m) => m.status === 'Working').length,
    Break: members.filter((m) => m.status === 'Break').length,
    Meeting: members.filter((m) => m.status === 'Meeting').length,
    Offline: members.filter((m) => m.status === 'Offline').length,
  };

  let filteredMembers = members;
  if (statusFilter) {
    filteredMembers = members.filter((m) => m.status === statusFilter);
  }

  if (sortBy === 'tasks') {
    filteredMembers = [...filteredMembers].sort((a, b) => {
      const aActive = a.tasks?.filter((t) => !t.completed).length || 0;
      const bActive = b.tasks?.filter((t) => !t.completed).length || 0;
      return bActive - aActive;
    });
  } else {
    filteredMembers = [...filteredMembers].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Working</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.Working}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Break</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.Break}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Meeting</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.Meeting}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Offline</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.Offline}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Chart and Status Distribution */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Overall Growth Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                wrapperStyle={{ outline: 'none' }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="tasksCompleted"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTasks)"
                name="Tasks Completed"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="productivity"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProductivity)"
                name="Productivity %"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <StatusDistribution />
      </div>

      {/* Currently Assigned Tasks */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Currently Assigned Tasks</h2>
        <div className="space-y-3">
          {members.flatMap((member) =>
            member.tasks?.map((task) => (
              <div
                key={`${member.id}-${task.id}`}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all group"
              >
                <div className="flex-1 flex items-start gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
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
                    <p className="text-sm text-gray-600 mt-1">{member.name}</p>
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
          ).slice(0, 8)}
        </div>

        {members.every((m) => !m.tasks?.length) && (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 font-medium">No tasks assigned yet</p>
          </div>
        )}
      </div>

      {/* Upcoming Events and Employee Availability */}
      <div className="grid grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-all duration-300 hover:border-slate-300">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700/0 via-slate-700/5 to-slate-700/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-4 flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                    <span>{event.date.getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">{event.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">{event.date.toLocaleDateString()}</span> • <span className="text-slate-700 font-medium">{event.time}</span>
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                    <span className="text-xs font-semibold text-slate-700">{event.attendees}</span>
                    <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Availability */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Team Availability</h2>
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:border-slate-300 transition-all duration-300 p-4">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700/0 via-slate-700/5 to-slate-700/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 group-hover:ring-slate-400 transition-all"
                      />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        member.status === 'Working'
                          ? 'bg-green-500'
                          : member.status === 'Break'
                            ? 'bg-yellow-500'
                            : member.status === 'Meeting'
                              ? 'bg-blue-500'
                              : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">@{member.name.split(' ')[0].toLowerCase()}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    member.status === 'Working'
                      ? 'bg-green-100 text-green-700 group-hover:bg-green-200'
                      : member.status === 'Break'
                        ? 'bg-yellow-100 text-yellow-700 group-hover:bg-yellow-200'
                        : member.status === 'Meeting'
                          ? 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white text-gray-900"
            >
              <option value="">All Statuses</option>
              <option value="Working">Working</option>
              <option value="Break">Break</option>
              <option value="Meeting">Meeting</option>
              <option value="Offline">Offline</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white text-gray-900"
            >
              <option value="name">Sort by Name</option>
              <option value="tasks">Sort by Active Tasks</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No members match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
