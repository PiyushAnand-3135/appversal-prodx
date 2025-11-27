'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMembers } from '@/redux/slices/membersSlice';
import { setUser } from '@/redux/slices/roleSlice';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TeamLeadView from '@/components/TeamLeadView';
import StatusSelector from '@/components/StatusSelector';
import axios from 'axios';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentRole } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.members);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=6');
        const teamMembers = response.data.results.map((user, index) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          avatar: user.picture.medium,
          status: ['Working', 'Break', 'Meeting', 'Offline'][Math.floor(Math.random() * 4)],
          tasks: [],
          lastStatusUpdate: new Date().toISOString(),
        }));
        dispatch(setMembers(teamMembers));
        dispatch(setUser(teamMembers[0].id));
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      }
    };

    if (members.length === 0) {
      fetchTeamMembers();
    }
  }, [dispatch, members.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-8">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Welcome, {currentRole === 'lead' ? 'Lead' : 'Member'}
            </h2>
          </div>
          {currentRole === 'lead' ? <TeamLeadView /> : <StatusSelector />}
        </main>
      </div>
    </div>
  );
}
