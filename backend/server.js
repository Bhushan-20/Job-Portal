const express = require('express');
const app = express();

const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const cors  = require("cors");
const PORT = process.env.PORT || 3000;

//Routes
const userRoutes = require('./routes/User');
const jobRoutes = require('./routes/Jobs');
const downloadRoutes = require('./routes/download');
const uploadRoutes = require('./routes/upload');

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors())

//Database Connection
const db = require("./config/database");
db.connect();

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