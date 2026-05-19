import api from '../api/axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
interface TaskItemProps {
    task: {
        _id: string;
        title: string;
        completed: boolean;
    };
    onDelete: (id: string) => void;
    onToggle?: (id: string, completed: boolean) => void; // opcional si manejas el estado en TaskList
}

const TaskItem = ({ task, onDelete, onToggle }: TaskItemProps) => {
  const [loadingToggle, setLoadingToggle] = useState(false);

  const handleToggle = async () => {
    setLoadingToggle(true);
    try {
      const { data } = await api.patch(`/tasks/${task._id}`, { completed: !task.completed });
      if (onToggle) {
        onToggle(task._id, data.completed);
      }
      toast.success(`Tarea ${data.completed ? 'completada' : 'pendiente'}`);
    } catch (error: any) {
      toast.error('Error al actualizar');
    } finally {
      setLoadingToggle(false);
    }
  };

    return (
        <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleToggle}
                    className="h-5 w-5 rounded accent-blue-600 cursor-pointer disabled:opacity-50"
                    disabled={loadingToggle}
                />
                <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.title}
                </span>
            </div>
            <button
                onClick={() => onDelete(task._id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Eliminar tarea"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>
        </li>
    );
};

export default TaskItem;