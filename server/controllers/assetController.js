import { Asset } from '../models/Asset.js';

// @desc    Create a new urban asset
// @route   POST /api/assets
// @access  Public / Admin
export const createAsset = async (req, res, next) => {
  try {
    const { assetId, type, location, latitude, longitude, status, installationDate } = req.body;

    if (!assetId || !type || !location) {
      res.status(400);
      throw new Error('Please provide assetId, type, and location');
    }

    const assetExists = await Asset.findOne({ assetId: assetId.toUpperCase() });
    if (assetExists) {
      res.status(400);
      throw new Error(`Asset with ID "${assetId}" already exists`);
    }

    const asset = await Asset.create({
      assetId: assetId.toUpperCase(),
      type,
      location,
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      status: status || 'Operational',
      installationDate: installationDate ? new Date(installationDate) : new Date(),
    });

    res.status(201).json({
      success: true,
      data: asset,
      message: 'Urban asset created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all urban assets (with filtering & search)
// @route   GET /api/assets
// @access  Public
export const getAssets = async (req, res, next) => {
  try {
    const { type, status, search } = req.query;
    const query = {};

    if (type && type !== 'All') {
      query.type = type;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { assetId: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } },
      ];
    }

    const assets = await Asset.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single asset by Asset ID (e.g. SL-1024) or Mongo _id
// @route   GET /api/assets/:assetId
// @access  Public
export const getAssetById = async (req, res, next) => {
  try {
    const { assetId } = req.params;

    // Lookup either by uppercase assetId (SL-1024) or MongoDB ObjectId
    let asset = await Asset.findOne({ assetId: assetId.toUpperCase() });

    if (!asset && assetId.match(/^[0-9a-fA-F]{24}$/)) {
      asset = await Asset.findById(assetId);
    }

    if (!asset) {
      res.status(404);
      throw new Error(`Asset not found with ID: ${assetId}`);
    }

    res.status(200).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update urban asset
// @route   PUT /api/assets/:assetId
// @access  Admin
export const updateAsset = async (req, res, next) => {
  try {
    const { assetId } = req.params;

    let asset = await Asset.findOne({ assetId: assetId.toUpperCase() });
    if (!asset && assetId.match(/^[0-9a-fA-F]{24}$/)) {
      asset = await Asset.findById(assetId);
    }

    if (!asset) {
      res.status(404);
      throw new Error(`Asset not found with ID: ${assetId}`);
    }

    const updatedAsset = await Asset.findByIdAndUpdate(
      asset._id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedAsset,
      message: 'Asset updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
