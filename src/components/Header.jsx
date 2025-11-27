import { useDispatch, useSelector } from 'react-redux';
import { switchRole, setUser } from '@/redux/slices/roleSlice';

export default function Header() {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.members);

  const handleRoleSwitch = (newRole) => {
    dispatch(switchRole(newRole));
    if (newRole === 'member' && members.length > 0) {
      dispatch(setUser(members[0].id));
    } else if (newRole === 'lead') {
      dispatch(setUser(null));
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/team_pulse_logo.png"
            alt="Team Pulse"
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Pulse</h1>
            <p className="text-xs text-gray-500">Productivity Monitoring Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {currentRole === 'member' && currentUser && (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Member Mode</span>
            </div>
          )}

          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => handleRoleSwitch('lead')}
              className={`px-4 py-2 rounded font-medium text-sm transition-all ${
                currentRole === 'lead'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Team Lead
            </button>
            <button
              onClick={() => handleRoleSwitch('member')}
              className={`px-4 py-2 rounded font-medium text-sm transition-all ${
                currentRole === 'member'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Team Member
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
