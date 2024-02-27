import { Router } from 'express';

import * as taskController from '../controllers/taskController';

const router = Router();

router.get('/', taskController.getAllTasks);

router.post('/', taskController.addTask);

router.delete('/:id', taskController.deleteTask);

router.put('/:id', taskController.editTask);

export default router;
