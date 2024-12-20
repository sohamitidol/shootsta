import express from 'express';
import * as doctorController from '../controllers/doctor';
import { catchAsync } from '../utils/catchAsyncError';

const router = express.Router();

router.post('/', catchAsync(doctorController.addDoctor));

router.get('/', catchAsync(doctorController.getDoctors));

router.get('/:id', catchAsync(doctorController.getDoctorById));

router.patch('/:id', catchAsync(doctorController.updateDoctor));

router.delete('/:id', catchAsync(doctorController.removeDoctor));

export default router;
