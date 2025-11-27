import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '@/redux/slices/membersSlice';
import { addNotification } from '@/redux/slices/notificationSlice';

export default function TaskForm() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const [selectedMember, setSelectedMember] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMember && title && dueDate) {
      const member = members.find((m) => m.id === selectedMember);
      dispatch(
        addTask({
          memberId: selectedMember,
          task: {
            title,
            dueDate,
          },
        })
      );
      dispatch(
        addNotification({
          type: 'success',
          title: 'Task Created!',
          message: `"${title}" assigned to ${member.name}`,
        })
      );
      setTitle('');
      setDueDate('');
      setSelectedMember('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Assign New Task</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Team Member</label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          >
            <option value="">Select a member...</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-700 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Create Task
        </button>
      </div>
    </form>
  );
}
