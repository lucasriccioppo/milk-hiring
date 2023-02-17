import express from 'express';
import UserRouter from './userRoutes';
import FarmRouter from './farmRoutes';
import ProductionRouter from './productionRoutes';

const router = express.Router();

router.use('/user', UserRouter)
router.use('/farm', FarmRouter)
router.use('/production', ProductionRouter)

export default router