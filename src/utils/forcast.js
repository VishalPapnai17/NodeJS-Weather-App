const request = require('request')

const forcast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/1e318c84fa2877f96f3f55a956914472/'+latitude+','+longitude+'?units=si';
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect to internet',undefined)
        }
        else if(response.body.error)
        {
            callback('unable to find location',undefined)
        }
        else
        {
            callback(undefined,'its been ' + response.body.currently.temperature + ' degrees outside. Humidity is '+response.body.currently.humidity+' and there is '+response.body.currently.precipProbability+'% chance of rain.')
        }
    })
}

module.exports = forcast