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
    Break: '#eab308',
    Meeting: '#3b82f6',
    Offline: '#9ca3af',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Status Distribution</h2>

      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
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
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
