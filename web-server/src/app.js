const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const weather = require('../utils/weather')

// define paths to Express config
const app = express()
const publicDir = (path.join(__dirname, '../public'))
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Aurutis'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help page',
        name: 'Aurutis'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About page',
        name: 'Aurutis'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.location) {
        return res.send('Error: you must provide a location')
    }
    geocode(req.query.location, (error,data = {}) => {
        if(error) {
            return res.send('Error: you must provide an acceptable location')
        }
        weather(data, (error,{summary, location, temp, constProb} = {}) => {
            if(error) {
                return res.send('Error: you must provide an acceptable location')
            }
            // res.send(`Today in ${location} it's ${temp} C and there is ${constProb} % chance of rain`)
            res.send({summary, location,temp, constProb})
        })
    })
    
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error',
        name: 'Aurutis',
    })
})

app.listen(3000, () => {
    console.log('server has started')
})