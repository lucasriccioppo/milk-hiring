import express from 'express';
import FarmerRouter from './farmerRoutes';
import FarmRouter from './farmRoutes';
import ProductionRouter from './productionRoutes';

const router = express.Router();

router.use('/farmer', FarmerRouter)
router.use('/farm', FarmRouter)
router.use('/production', ProductionRouter)

export default router