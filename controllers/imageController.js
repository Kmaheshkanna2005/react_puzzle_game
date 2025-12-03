const sharp = require('sharp');
const Image = require('../models/Image');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image file provided' 
      });
    }

    // Process image with sharp
    const processedImage = await sharp(req.file.buffer)
      .resize(600, 600, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90 })
      .toBuffer();

    // Save to MongoDB
    const newImage = new Image({
      filename: req.file.originalname,
      contentType: 'image/jpeg',
      imageData: processedImage,
      size: processedImage.length
    });

    await newImage.save();

    // Send base64 image to client
    const base64Image = `data:image/jpeg;base64,${processedImage.toString('base64')}`;

    res.status(201).json({
      success: true,
      imageId: newImage._id,
      image: base64Image,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading image',
      error: error.message 
    });
  }
};

exports.getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({ 
        success: false, 
        message: 'Image not found' 
      });
    }

    res.set('Content-Type', image.contentType);
    res.send(image.imageData);

  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error retrieving image' 
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    
    if (!image) {
      return res.status(404).json({ 
        success: false, 
        message: 'Image not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Image deleted successfully' 
    });

  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting image' 
    });
  }
};
