const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const Subscriber=require('./Routes/Route');
const app=express();
require('dotenv').config()
app.use(express.json());
app.use(cors());

// console.log(process.env.VITE_MONGO_KEY)
mongoose.connect(process.env.VITE_MONGO_KEY,{
    dbName:'UserDetails'
});


app.use('/',Subscriber);


app.listen(7000, () => {
    console.log('Server started on port 7000');
})