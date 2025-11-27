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

      {/* Upcoming Events and Employee Availability */}
      <div className="grid grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  {event.date.getDate()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.date.toLocaleDateString()} • {event.time}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.attendees} attendees</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Availability */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Availability</h2>
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
