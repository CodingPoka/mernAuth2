

const mongoose=require("mongoose");
require("dotenv").config();





const connectDB= async()=>{
    try{
       await mongoose.connect(process.env.DB_URL);
       console.log("Database is connected");
    }catch(error){
        console.log("Database is not connected");
        console.log(error.message);
        process.exit(1);
    
    }
}

module.exports=connectDB;