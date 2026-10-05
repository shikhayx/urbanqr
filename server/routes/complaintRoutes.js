import express from 'express';
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  assignWorker,
  updateComplaintStatus,
  confirmComplaint,
} from '../controllers/complaintController.js';

const router = express.Router();

router.route('/')
  .post(createComplaint)
  .get(getComplaints);

router.route('/:id')
  .get(getComplaintById)
  .put(updateComplaint);

router.put('/:id/assign', assignWorker);
router.put('/:id/status', updateComplaintStatus);
router.post('/:id/confirm', confirmComplaint);

export default router;
