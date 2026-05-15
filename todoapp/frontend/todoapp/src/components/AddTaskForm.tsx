import { useState, FormEvent } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

interface AddTaskFormProps {
  onTaskAdded: () => void;
}

const AddTaskForm = ({ onTaskAdded }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await api.post('/tasks', { title });
      setTitle('');
      toast.success('Tarea creada');
      onTaskAdded(); // Dispara la recarga de la lista
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al crear tarea');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Agregar
      </button>
    </form>
  );
};

export default AddTaskForm;