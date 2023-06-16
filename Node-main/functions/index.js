const express = require('express');
const app= express();
const dotenv= require('dotenv');
dotenv.config();
const mongoose= require('mongoose');
const cookieParser= require('cookie-parser');
const PORT= process.env.PORT || 6000;

//sagar samui
// requiring files

const userRouter= require('./routes/UserRoute');
const crudRouter= require('./routes/CrudRoute');
const productRouter= require('./routes/ProductRoutes');

const mongoConnect= async()=>{
    try {
        mongoose.connect(process.env.MONGO)
        console.log('Successfully Connected to the Mongodb');
    } catch (error) {
        console.log('Sorry Something Went Wrong Cant Connect to Mongodb',error);
    }
}

// use files

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth/v1',userRouter);
app.use('/api/auth/v1',crudRouter);
app.use('/api/auth/v1',productRouter);

app.use((err,req,res)=>{
    const status = err.status || 500;
    const message = err.message || "Something Went Wrong (From index)"
    return res.status(500).json({
        success:false,
        status:status,
        message:message,
        stack:err.stack
    });
});

app.listen(PORT,()=>{
    try {
        mongoConnect();
        console.log(`Port is running on ${PORT} http://localhost:${PORT}`);
    } catch (error) {
        console.log(`Sry Cant Connect to ${PORT} Port`);      
    }
})

