import express from 'express';
import { verifyUnsubscribe } from '../controllers/unsubscribeController.js';

const router = express.Router();

router.post('/', verifyUnsubscribe);

export default router; 