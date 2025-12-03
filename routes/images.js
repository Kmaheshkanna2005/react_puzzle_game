const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadImage, getImage, deleteImage } = require('../controllers/imageController');

// @route   POST /api/images/upload
// @desc    Upload puzzle image
router.post('/upload', upload.single('image'), uploadImage);

// @route   GET /api/images/:id
// @desc    Get image by ID
router.get('/:id', getImage);

// @route   DELETE /api/images/:id
// @desc    Delete image
router.delete('/:id', deleteImage);

module.exports = router;
