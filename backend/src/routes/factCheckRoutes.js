import express from 'express';
import { getFactCheckResults } from '../controllers/factCheckController.js';

const router = express.Router();

router.get('/fact-check', getFactCheckResults);

export default router;
