const express = require('express');
const { singleUpload } = require('../middleware/multer.middleware');
const { uploadFile } = require('../controllers/fileUploader.controllers');
const router = express.Router();

router.post('/upload', singleUpload, uploadFile);

module.exports = router;