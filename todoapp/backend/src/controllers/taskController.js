import Task from '../models/Task.js';

// 1. Crear Tarea
export const createTask = async (req, res) => {
  try {
    const newTask = await Task.create({ ...req.body, user: req.user.id }); 
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Leer Tareas (Solo las del usuario autenticado)
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// 3. Eliminar Tarea (Validando propiedad)
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    }); 
    
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar estado de completado (o cualquier campo)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { completed: req.body.completed },
      { new: true } // devuelve la tarea actualizada
    );

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};