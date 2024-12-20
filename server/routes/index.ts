import express from 'express';
import globalErrorHandler from '../utils/globalErrorHandler';
import ambulanceRoutes from './ambulance';
import doctorRoutes from './doctor';
import fileRoutes from './file';

const router = express.Router();

router.get('/check-health', (req, res) => {
	const response = {
		status: true,
		message: 'server is up and running...',
	};
	res.status(200).json(response);
});

router.use('/v1/doctors', doctorRoutes);
router.use('/v1/ambulances', ambulanceRoutes);
router.use('/v1/files', fileRoutes);

router.use('*', (req, res) => {
	const response = {
		status: false,
		message: 'Route not found',
	};
	res.status(404).json(response);
});

router.use(globalErrorHandler);

export default router;
