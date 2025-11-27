import { useDispatch, useSelector } from 'react-redux';
import { updateMemberStatus } from '@/redux/slices/membersSlice';
import { setUser } from '@/redux/slices/roleSlice';
import TaskList from './TaskList';

const statuses = ['Working', 'Break', 'Meeting', 'Offline'];

export default function StatusSelector() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.members);
  const member = members.find((m) => m.id === currentUser);

  if (!member) return null;

  const handleStatusChange = (status) => {
    dispatch(updateMemberStatus({ memberId: currentUser, status }));
  };

  const handleMemberChange = (memberId) => {
    dispatch(setUser(memberId));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Team Member</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Member</label>
          <select
            value={currentUser}
            onChange={(e) => handleMemberChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 mb-6">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">{member.name}</p>
            <p className="text-xs text-gray-600">{member.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Your Status</h2>

        <div className="grid grid-cols-2 gap-3">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`px-4 py-3 rounded-lg font-medium transition-all border-2 ${
                member.status === status
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <TaskList memberId={currentUser} isTeamMember={true} />
    </div>
  );
}
