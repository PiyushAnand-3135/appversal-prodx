'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberCard from './MemberCard';
import StatusDistribution from './StatusDistribution';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { MdWork, MdLocalCafe, MdGroups, MdSignalCellularOff } from 'react-icons/md';

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
        <div className="bg-gradient-to-br from-emerald-100/60 to-teal-50/60 rounded-xl border border-emerald-200/50 shadow-sm p-6 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-emerald-700 uppercase tracking-wider font-semibold">Working</p>
              <p className="text-3xl font-bold text-emerald-900 mt-2">{statusCounts.Working}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-300/70 to-teal-400/70 rounded-xl flex items-center justify-center text-emerald-900 group-hover:scale-110 transition-transform shadow-md">
              <MdWork size={28} />
            </div>
          </div>
          <p className="text-xs text-emerald-600 mt-4">Active members</p>
        </div>

        <div className="bg-gradient-to-br from-amber-100/60 to-yellow-50/60 rounded-xl border border-amber-200/50 shadow-sm p-6 hover:shadow-lg hover:border-amber-300 transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-amber-700 uppercase tracking-wider font-semibold">Break</p>
              <p className="text-3xl font-bold text-amber-900 mt-2">{statusCounts.Break}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-amber-300/70 to-yellow-400/70 rounded-xl flex items-center justify-center text-amber-900 group-hover:scale-110 transition-transform shadow-md">
              <MdLocalCafe size={28} />
            </div>
          </div>
          <p className="text-xs text-amber-600 mt-4">On break</p>
        </div>

        <div className="bg-gradient-to-br from-sky-100/60 to-blue-50/60 rounded-xl border border-sky-200/50 shadow-sm p-6 hover:shadow-lg hover:border-sky-300 transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-sky-700 uppercase tracking-wider font-semibold">Meeting</p>
              <p className="text-3xl font-bold text-sky-900 mt-2">{statusCounts.Meeting}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-sky-300/70 to-blue-400/70 rounded-xl flex items-center justify-center text-sky-900 group-hover:scale-110 transition-transform shadow-md">
              <MdGroups size={28} />
            </div>
          </div>
          <p className="text-xs text-sky-600 mt-4">In meetings</p>
        </div>

        <div className="bg-gradient-to-br from-slate-100/60 to-gray-50/60 rounded-xl border border-slate-200/50 shadow-sm p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-700 uppercase tracking-wider font-semibold">Offline</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{statusCounts.Offline}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-slate-300/70 to-gray-400/70 rounded-xl flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform shadow-md">
              <MdSignalCellularOff size={28} />
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-4">Offline members</p>
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
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
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
                stroke="#06b6d4"
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

        {/* Recruitment Metrics */}
        <div className="flex flex-col gap-4">
          {/* Applications Card */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border border-violet-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-violet-600 uppercase tracking-wider font-semibold">Applications</p>
                <p className="text-3xl font-bold text-violet-900 mt-2">1,249</p>
                <p className="text-xs text-violet-600 mt-2">This month</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-violet-300/70 to-purple-400/70 rounded-xl flex items-center justify-center text-violet-900 group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H3a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1h3a1 1 0 000-2h-2.5A2.5 2.5 0 0016 4.5v10.756a.5.5 0 01-.82.39l-1.54-1.233a1 1 0 00-1.28 0l-1.822 1.46a1 1 0 01-1.28-1.46l1.822-1.46a1 1 0 00-1.28-1.46l-1.54 1.232a.5.5 0 01-.82-.39V5z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Interviews & Hired Card */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 shadow-sm p-6">
              <div>
                <p className="text-xs text-blue-600 uppercase tracking-wider font-semibold">Interviews</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">342</p>
                <p className="text-xs text-blue-600 mt-2">Scheduled</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 shadow-sm p-6">
              <div>
                <p className="text-xs text-emerald-600 uppercase tracking-wider font-semibold">Hired</p>
                <p className="text-3xl font-bold text-emerald-900 mt-2">89</p>
                <p className="text-xs text-emerald-600 mt-2">Onboarded</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Target Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">November Target</h2>
          <div className="flex items-center justify-between">
            <div className="w-full bg-gray-200 rounded-full h-2 mr-4" style={{ maxWidth: '400px' }}>
              <div className="bg-slate-700 h-2 rounded-full" style={{ width: '77%' }}></div>
            </div>
            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">77% Complete</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 font-medium mb-3">Hiring Target</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">89/120</p>
            <p className="text-xs text-gray-500">74% complete</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 font-medium mb-3">Task Completion</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">245/300</p>
            <p className="text-xs text-gray-500">82% complete</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 font-medium mb-3">Revenue Target</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">$89K/$120K</p>
            <p className="text-xs text-gray-500">74% complete</p>
          </div>
        </div>

        <div className="mt-4 text-right">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">4 days</span> remaining in November
          </p>
        </div>
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
