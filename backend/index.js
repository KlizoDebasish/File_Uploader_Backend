const express = require('express');
const { databaseConnect } = require('./config/datatbase');
const fileRoutes = require( './routes/fileUploader.routes');
const fileApp = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

fileApp.use(express.json());
fileApp.use("/file", fileRoutes);

databaseConnect();

fileApp.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

fileApp.get('/', (req, res) => {
    res.send('file upload')
})