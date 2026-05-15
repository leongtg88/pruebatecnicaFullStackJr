import Task from '../models/Task.js';

// Obtener tareas filtradas por el ID del usuario
export const getUserTasks = async (userId) => {
  return await Task.find({ user: userId }).sort({ createdAt: -1 });
};

// Crear una nueva tarea vinculada al usuario
export const createNewTask = async (taskData, userId) => {
  return await Task.create({
    ...taskData,
    user: userId
  });
};

// Eliminar tarea verificando propiedad
export const deleteTaskById = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) throw new Error('Tarea no encontrada o no autorizada');
  return task;
};

// Actualizar estado de la tarea
export const updateTaskStatus = async (taskId, userId, completed) => {
  return await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    { completed },
    { new: true }
  );
};