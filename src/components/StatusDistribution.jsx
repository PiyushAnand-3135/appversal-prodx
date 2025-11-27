import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function StatusDistribution() {
  const members = useSelector((state) => state.members.members);

  const statusCounts = {
    Working: members.filter((m) => m.status === 'Working').length,
    Break: members.filter((m) => m.status === 'Break').length,
    Meeting: members.filter((m) => m.status === 'Meeting').length,
    Offline: members.filter((m) => m.status === 'Offline').length,
  };

  const data = [
    { name: 'Working', value: statusCounts.Working },
    { name: 'Break', value: statusCounts.Break },
    { name: 'Meeting', value: statusCounts.Meeting },
    { name: 'Offline', value: statusCounts.Offline },
  ];

  const colors = {
    Working: '#10b981',
    Break: '#f59e0b',
    Meeting: '#3b82f6',
    Offline: '#d1d5db',
  };

  const totalMembers = members.length;

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Team Status Distribution</h2>

      <div className="flex flex-col items-center">
        <div className="mb-6">
          <ResponsiveContainer width={250} height={250}>
            <PieChart>
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
                </filter>
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                filter="url(#shadow)"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value} members`}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with counts */}
        <div className="w-full space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[item.name] }}></div>
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                <span className="text-xs text-gray-500">
                  ({totalMembers > 0 ? ((item.value / totalMembers) * 100).toFixed(0) : 0}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
