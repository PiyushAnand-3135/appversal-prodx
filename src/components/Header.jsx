import { useDispatch, useSelector } from 'react-redux';
import { switchRole, setUser } from '@/redux/slices/roleSlice';
import Link from 'next/link';
import { MdHome } from 'react-icons/md';

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
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/team_pulse_logo.png"
              alt="Team Pulse"
              className="w-20 h-20 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Team Pulse</h1>
              <p className="text-xs text-gray-500">Productivity Monitoring Dashboard</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Go to Dashboard"
          >
            <MdHome className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </Link>

          {currentRole === 'member' && currentUser && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Active - Member Mode</span>
            </div>
          )}

          <div className="flex gap-2 bg-gray-100 p-1.5 rounded-lg border border-gray-200">
            <button
              onClick={() => handleRoleSwitch('lead')}
              className={`px-5 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                currentRole === 'lead'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              Team Lead
            </button>
            <button
              onClick={() => handleRoleSwitch('member')}
              className={`px-5 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                currentRole === 'member'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
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
