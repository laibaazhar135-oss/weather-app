const express= require('express');
const router= express.Router();
const getweatherdata=require('../services/weatherService');
const validate=require('../utils/validateCity');

router.post('/weather',async(req,res)=>{
    const {city}=req.body;
    const validateCity= validate(city);
    if(!validateCity.valid){
        res.status(400).json({error:validateCity.error})
    }
    const responce=await getweatherdata(city);
    if(!responce.success){
        return res.status(responce.statusCode).json({error:responce.error})
    }
    console.log(responce.data)
    res.status(200).json(responce.data)
})
module.exports=router;