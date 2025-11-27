import { useState } from 'react';
import { useSelector } from 'react-redux';
import MemberCard from './MemberCard';
import TaskForm from './TaskForm';
import StatusDistribution from './StatusDistribution';
import MemberProfile from './MemberProfile';

export default function TeamLeadView() {
  const members = useSelector((state) => state.members.members);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedMember, setSelectedMember] = useState(null);

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

  const handleViewProfile = (member) => {
    setSelectedMember(member);
  };

  const handleCloseProfile = () => {
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6">
      {selectedMember && <MemberProfile member={selectedMember} onClose={handleCloseProfile} />}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
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

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
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

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
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

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
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

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <TaskForm />
        </div>
        <StatusDistribution />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Total Members</span>
            <span className="font-semibold text-gray-900">{members.length}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Total Tasks</span>
            <span className="font-semibold text-gray-900">
              {members.reduce((sum, m) => sum + (m.tasks?.length || 0), 0)}
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-600">Completed Tasks</span>
            <span className="font-semibold text-green-600">
              {members.reduce((sum, m) => sum + (m.tasks?.filter((t) => t.completed).length || 0), 0)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="tasks">Sort by Active Tasks</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} onViewProfile={handleViewProfile} />
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
