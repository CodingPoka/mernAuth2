

const express=require("express");
const connectDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const app=express();
const cors=require("cors");

require("dotenv").config();
const port=process.env.PORT;

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin (Vite frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies to be sent along with requests
  }));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//use authRouter 
app.use("/api",authRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to New Webiste");
})

app.listen(port, async ()=>{
    console.log(`Server is running successfully at http://localhost:${port}`);
    await connectDB();
})



