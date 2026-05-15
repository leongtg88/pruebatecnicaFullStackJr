import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import TaskItem from './TaskItem';
import toast from 'react-hot-toast';

interface Task {
    _id: string;
    title: string;
    completed: boolean;
    createdAt: string;
}

const TaskList = ({ refresh }: { refresh: boolean }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = useCallback(async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data);
        } catch (error: any) {
            toast.error('Error al cargar tareas');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [refresh, fetchTasks]); // se ejecuta al cambiar refresh

    const handleToggle = (id: string, completed: boolean) => {
        setTasks(tasks.map(task => task._id === id ? { ...task, completed } : task));
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
            toast.success('Tarea eliminada');
        } catch (error: any) {
            toast.error('Error al eliminar');
        }
    };

    if (loading) return <p className="text-center text-gray-500">Cargando tareas...</p>;

    return (
        <div>
            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">No hay tareas aún. ¡Agrega una!</p>
            ) : (
                <ul className="space-y-3">
                    {tasks.map((task) => (
                        <TaskItem key={task._id} task={task} onDelete={handleDelete} onToggle={handleToggle} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;