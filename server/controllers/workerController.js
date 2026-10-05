import { Worker } from '../models/Worker.js';

// @desc    Get all workers
// @route   GET /api/workers
// @access  Public / Admin
export const getWorkers = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    const workers = await Worker.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: workers.length,
      data: workers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new worker
// @route   POST /api/workers
// @access  Admin
export const createWorker = async (req, res, next) => {
  try {
    const { name, email, phone, status } = req.body;

    if (!name || !email || !phone) {
      res.status(400);
      throw new Error('Please provide name, email, and phone');
    }

    const workerExists = await Worker.findOne({ email: email.toLowerCase() });
    if (workerExists) {
      res.status(400);
      throw new Error('Worker with this email already exists');
    }

    const worker = await Worker.create({
      name,
      email: email.toLowerCase(),
      phone,
      status: status || 'Available',
    });

    res.status(201).json({
      success: true,
      data: worker,
      message: 'Worker registered successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get worker by ID
// @route   GET /api/workers/:id
// @access  Public / Admin
export const getWorkerById = async (req, res, next) => {
  try {
    const worker = await Worker.findById(req.params.id);

    if (!worker) {
      res.status(404);
      throw new Error('Worker not found');
    }

    res.status(200).json({
      success: true,
      data: worker,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update worker status
// @route   PUT /api/workers/:id/status
// @access  Worker / Admin
export const updateWorkerStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const validStatuses = ['Available', 'On-Site', 'En Route', 'Off Duty'];
    if (!status || !validStatuses.includes(status)) {
      res.status(400);
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!worker) {
      res.status(404);
      throw new Error('Worker not found');
    }

    res.status(200).json({
      success: true,
      data: worker,
      message: `Worker status updated to ${status}`,
    });
  } catch (error) {
    next(error);
  }
};
