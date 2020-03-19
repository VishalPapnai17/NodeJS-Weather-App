//importing pakages 
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forcast.js')

//creating our server using express 
const app = express()

//path to a directory in our file using path.join function
const publicdirectorypath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../views')
const partialsPath = path.join(__dirname,'../views/partials')

//handlebars set up
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicdirectorypath))

//redering our home page
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Vishal Papnai'
    })
})

//rendering the about page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Us",
        name:"vishal papnai"
    })
})

//rendering the help page
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Welcome to the help page',
        title:'Help',
        name:'Vishal Papnai'
    })
})

//weather page of our website
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'error must be provided'
        })
    }
    //calling geocode with help of the address provided
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error:error})
        }
        //callback function to forcast the data using latitude and longitude
        forcast(data.latitude,data.longitude,(error,forcastData)=>{
            if(error)
            {
                return res.send({error:error})
            } 
            res.send({
                location:data.location,
                forcast:forcastData,
                address:req.query.address
            })
        })  
    })
})

app.get('/products',(req,res)=>{
    res.send({
        products:[]
    })
})

//rendering error 404 page after /help 
app.get('/help/*',(req,res)=>{
    res.render('error',{
        errormessage:'Help Article not Found'
    })
})

//rendering error 404 page
app.get('*',(req,res)=>{
    res.render('error',{
        errormessage:'Page not Found'
    })
})

//starting the server 
app.listen(process.env.PORT || 3000,()=>{
    console.log('server is up on port')
})