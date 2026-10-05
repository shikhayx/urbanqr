import express from 'express';
import {
  getWorkers,
  createWorker,
  getWorkerById,
  updateWorkerStatus,
} from '../controllers/workerController.js';

const router = express.Router();

router.route('/')
  .get(getWorkers)
  .post(createWorker);

router.route('/:id')
  .get(getWorkerById);

router.put('/:id/status', updateWorkerStatus);

export default router;
