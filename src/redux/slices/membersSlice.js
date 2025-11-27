import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [],
  loading: false,
  error: null,
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        member.status = status;
        member.lastStatusUpdate = new Date().toISOString();
      }
    },
    addTask: (state, action) => {
      const { memberId, task } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        if (!member.tasks) {
          member.tasks = [];
        }
        member.tasks.push({
          id: Date.now().toString(),
          ...task,
          progress: 0,
          createdAt: new Date().toISOString(),
        });
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, progress } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member && member.tasks) {
        const task = member.tasks.find((t) => t.id === taskId);
        if (task) {
          task.progress = Math.min(100, Math.max(0, progress));
          if (task.progress === 100) {
            task.completed = true;
            task.completedAt = new Date().toISOString();
          }
        }
      }
    },
    removeTask: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member && member.tasks) {
        member.tasks = member.tasks.filter((t) => t.id !== taskId);
      }
    },
  },
});

export const { setMembers, updateMemberStatus, addTask, updateTaskProgress, removeTask } =
  membersSlice.actions;
export default membersSlice.reducer;
