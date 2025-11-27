import { useDispatch, useSelector } from 'react-redux';
import { updateTaskProgress, removeTask } from '@/redux/slices/membersSlice';
import { addNotification } from '@/redux/slices/notificationSlice';

export default function TaskList({ memberId, isTeamMember = false }) {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const member = members.find((m) => m.id === memberId);

  if (!member || !member.tasks || member.tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
        <p className="text-gray-500">No tasks yet</p>
      </div>
    );
  }

  const activeTasks = member.tasks.filter((t) => !t.completed);
  const completedTasks = member.tasks.filter((t) => t.completed);

  const renderTasks = (tasks, title) => (
    <>
      <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        {title} ({tasks.length})
      </h3>
      <div className="space-y-3 mb-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <p className="text-xs text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              {!task.completed && (
                <button
                  onClick={() => {
                    dispatch(removeTask({ memberId, taskId: task.id }));
                    dispatch(
                      addNotification({
                        type: 'warning',
                        title: 'Task Removed',
                        message: `${task.title} has been removed`,
                      })
                    );
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium ml-2"
                >
                  Delete
                </button>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-semibold text-gray-900">{task.progress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    task.completed ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>

              {isTeamMember && !task.completed && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      const newProgress = task.progress - 10;
                      dispatch(
                        updateTaskProgress({
                          memberId,
                          taskId: task.id,
                          progress: newProgress,
                        })
                      );
                      dispatch(
                        addNotification({
                          type: 'info',
                          title: 'Progress Updated',
                          message: `${task.title} - ${newProgress}% complete`,
                        })
                      );
                    }}
                    className="flex-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 rounded transition-colors"
                  >
                    -10%
                  </button>
                  <button
                    onClick={() => {
                      const newProgress = task.progress + 10;
                      dispatch(
                        updateTaskProgress({
                          memberId,
                          taskId: task.id,
                          progress: newProgress,
                        })
                      );
                      const notificationType = newProgress === 100 ? 'success' : 'info';
                      const message = newProgress === 100
                        ? `Congratulations! ${task.title} is complete!`
                        : `${task.title} - ${newProgress}% complete`;
                      dispatch(
                        addNotification({
                          type: notificationType,
                          title: newProgress === 100 ? 'Task Completed! 🎉' : 'Progress Updated',
                          message,
                        })
                      );
                    }}
                    className="flex-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 rounded transition-colors"
                  >
                    +10%
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Tasks</h2>

      {activeTasks.length > 0 && renderTasks(activeTasks, 'Active')}
      {completedTasks.length > 0 && renderTasks(completedTasks, 'Completed')}
    </div>
  );
}
