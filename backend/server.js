const express = require('express');
const app = express();

const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const cors  = require("cors");
const fileUpload = require("express-fileupload");
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 4000;
const {cloudinaryConnect} = require("./config/cloudinary");



//Routes
const userRoutes = require('./routes/User');
const jobRoutes = require('./routes/Jobs');
const downloadRoutes = require('./routes/download');
const uploadRoutes = require('./routes/upload');


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors())

const tempDir = path.join(__dirname, 'uploads/temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: tempDir, // Custom temp directory
}));

//Database Connection
const db = require("./config/database");
db.connect();

//cloudinary connection
cloudinaryConnect();

//routes mount
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/jobs",jobRoutes);
app.use("/api/v1/download",downloadRoutes);
app.use("/api/v1/upload",uploadRoutes);



app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your Server is running..."
    })
})

app.listen(PORT,()=>{
    console.log(`Server Connected successfully at ${PORT}`);
})