const express=require('express');
const Subscriber=express();
const {getData}=require('../Constructor/Controler');

Subscriber.get('/getdata',getData)


module.exports=Subscriber