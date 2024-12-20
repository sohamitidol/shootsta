import express, { Request } from 'express';
import multer from 'multer';
import { extname, resolve } from 'path';
import * as fileController from '../controllers/file';
import { catchAsync } from '../utils/catchAsyncError';

const router = express.Router();

const storage = multer.diskStorage({
	destination: resolve('uploads/'),
	filename: (_req, file, cb) => {
		const filename = Date.now() + '-' + file.originalname;
		cb(null, filename);
	},
});

const limits = {
	fileSize: 1 * 1024 * 1024, // 1 MB
};

const fileFilter = (
	_req: Request,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	const allowedExtensions = ['.jpg', '.jpeg', '.png'];

	const ext = extname(file.originalname);

	if (!allowedExtensions.includes(ext)) {
		return cb(new Error('Only .png, .jpg and .jpeg files are allowed'));
	}

	cb(null, true);
};

const upload = multer({
	storage,
	limits,
	fileFilter,
});

router.post('/upload', upload.single('file'), (req, res) => {
	const fileName = req.file?.filename;
	res.status(200).json({
		status: true,
		message: 'File uploaded successfully',
		fileKey: fileName,
	});
});

router.delete('/:id', catchAsync(fileController.deleteFile));

router.get('/:id', catchAsync(fileController.getFile));

export default router;
