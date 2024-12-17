const fileModel = require("../models/fileUploader.models");
const cloudinary = require("../utils/cloudinary");
const stream = require("stream");

exports.uploadFile = async (req, res) => {
  const file = req.file;
  console.log(file);

  try {
    if (!file) {
      return res
        .status(400)
        .json({ message: "File is required", success: false });
    }

    // Upload the file to Cloudinary, providing the file path
    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" }, // 'auto' tells Cloudinary to detect the file type (image, video, pdf, etc.)
          (error, result) => {
            if (error) reject(error); // Reject if there is an error
            else resolve(result); // Resolve with the upload result
          }
        );
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer); // Pass the file buffer to the stream
        bufferStream.pipe(uploadStream); // Pipe the buffer stream to Cloudinary
      });
    };

    const cloudResponse = await uploadFromBuffer();

    // const newfile = new fileModel({
    //   filename: cloudResponse.original_filename,
    //   path: cloudResponse.secure_url,
    // });

    // await newfile.save();

    res
      .status(201)
      .json({ message: "File uploaded successfully", file: newfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload file", success: false });
  }
};
