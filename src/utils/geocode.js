//importing request
const request = require("request");

//function to import the latitude and longitude of a place
const geocode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmlzaGFscGFwbmFpMTciLCJhIjoiY2sxdXV2NnRlMGFmbjNicDU1a281Y3drcCJ9.LJFqKQbXtKPN0kKoicLKPA&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect to internet services!',undefined)
        }
        else if(response.body.features.length === 0)
        {
            callback('Unable to find location. Try another search.',undefined)
        }
        else
        {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode