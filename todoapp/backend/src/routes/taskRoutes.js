import express from 'express';
import { getTasks, createTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import { updateTask } from '../controllers/taskController.js';
const router = express.Router();

// Todas las rutas de tareas requieren autenticación
router.route('/')
    .get(protect, getTasks)
    .post(protect, createTask);

router.route('/:id')
    .delete(protect, deleteTask)
    .patch(protect, updateTask);

export default router;