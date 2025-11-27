const statusColors = {
  Working: 'bg-green-100 text-green-800 border-green-300',
  Break: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Meeting: 'bg-blue-100 text-blue-800 border-blue-300',
  Offline: 'bg-gray-100 text-gray-800 border-gray-300',
};

const statusDots = {
  Working: 'bg-green-500',
  Break: 'bg-yellow-500',
  Meeting: 'bg-blue-500',
  Offline: 'bg-gray-400',
};

export default function MemberCard({ member, onViewProfile }) {
  const activeTasks = member.tasks?.filter((t) => !t.completed) || [];
  const completedTasks = member.tasks?.filter((t) => t.completed) || [];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
              <p className="text-xs text-gray-500 truncate">{member.email}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div
            className={`inline-flex items-center gap-2 px-2 py-1 rounded-full border ${
              statusColors[member.status]
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${statusDots[member.status]}`}></div>
            <span className="text-xs font-medium">{member.status}</span>
          </div>
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between text-gray-600">
            <span>Active Tasks</span>
            <span className="font-semibold">{activeTasks.length}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Completed</span>
            <span className="font-semibold text-green-600">{completedTasks.length}</span>
          </div>
        </div>

        <button
          onClick={() => onViewProfile(member)}
          className="w-full px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
