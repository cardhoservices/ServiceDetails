const express=require('express');
const Subscriber=express();
const {getData}=require('../Constructor/Controler');

Subscriber.get('/get',getData)


module.exports=Subscriber