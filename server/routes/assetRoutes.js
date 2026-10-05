import express from 'express';
import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
} from '../controllers/assetController.js';

const router = express.Router();

router.route('/')
  .post(createAsset)
  .get(getAssets);

router.route('/:assetId')
  .get(getAssetById)
  .put(updateAsset);

export default router;
