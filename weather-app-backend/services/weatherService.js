const axios = require('axios');
const {findCityinPakistan}= require('../utils/pakistanCities');

async function getweatherdata(city) {
    if(!findCityinPakistan(city)){
        return{
            statusCode: 400,
            error:'City not found'
        }
    }
    try{
    const responce = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
            params:{
                q:city,
                appid:process.env.OPENWEATHERMAP_API_KEY,
                units:'metric'
        }
        }
    )
     const weatherData= {
        city:responce.data.name,
        temperature: Math.round(responce.data.main.temp),
        humidity:responce.data.main.humidity,
        condition:responce.data.weather[0].main,
        speed:responce.data.wind.speed
     };
     return{
        success:true,
        data:weatherData
     }
    }
    catch(error){
        return{
            success:false,
            error:'API call failed',
            statusCode:500
        }
    }
}
module.exports=getweatherdata;