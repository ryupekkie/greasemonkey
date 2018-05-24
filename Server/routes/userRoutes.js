import express from 'express';
import RequestController from '../controllers/requestController';
import authenticateUser from '../middlewares/auth';
import { checkRequestId, createRequest } from '../middlewares/validation';

const router = express.Router();

router.get('/requests', authenticateUser, RequestController.getUserRequests);
router.get('/requests/:requestId', checkRequestId, authenticateUser, RequestController.getUserRequest);
router.post('/requests', createRequest, authenticateUser, RequestController.createRequest);

router.all('*', (req, res) => res.status(404).json({
  status: 'error',
  code: 404,
  message: 'Route not supported on server.',
}));

export default router;
