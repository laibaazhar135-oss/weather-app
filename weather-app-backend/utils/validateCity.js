function validate(city){
    if(!city){
        return {
            valid:false,
            error:'City name is required'
        }
    }
    if(typeof city!== 'string'){
        return {
            valid:false,
            error:'city must be a string/text'
        }
    }
    if(city.length>40){
        return{
            valid:false,
            error:'city is too long'
        }
    }
    if(!/^[a-zA-Z\s]+$/.test(city)){
           return {
            valid:false,
            error:'city must be a text'
           }
    }
    return {valid:true};
}

module.exports= validate;