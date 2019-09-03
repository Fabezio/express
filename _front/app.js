// Modules
require('babel-register')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')('dev')
const twig = require('twig')
const axios = require('axios')

// Variables globales
const app = express()
const port = 8081
const fetch = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
    // timeout: 1000,
    // headers: {'X-custom-header': 'foobar'}
})

// Middlewares
app.use(morgan)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Routes 
app.get('/', (req, res) => {
    res.render('index.twig', {
        name: "Fab"
    })
    // res.sendFile(__dirname+'/views/index.html')
})
app.get('/members', (req, res) => {
    fetch.get('/members')
        .then(response => {
            if(response.data.status == 'success') {
                res.render('members.twig', {
                    members: response.data.result
                })
            } else {
                renderError(res, response.data.message)
            }
        })
        .catch(err => {
            renderError(res, err.message)
        })
})

// Lancement application
app.listen(port, ()=> {
    console.log(`Started on port ${port}...`)
})

// Fonctions

function renderError(res, errMsg) {
    res.render('error.twig', {
        errorMsg: errMsg
    })
}