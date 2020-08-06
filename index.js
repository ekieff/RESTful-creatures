const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const fs = require('fs')// will use to read json files

app.set('view engine', 'ejs');
app.use(ejsLayouts);

//home route
app.get('/', (req, res)=>{
    res.render('home')
})

//index route
app.get('/dinosaurs', (req, res)=>{
    //get the json from dinosaurs.json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    //conver the json to javascript
    let dinoData = JSON.parse(dinosaurs)
    // render our dino index page and pass it the
    //dinoData as "myDinos"
    res.render('dinosaurs/index', {myDinos: dinoData})
})
//show route (uses URL parameteer "id")
app.get('/dinosaurs/:id', (req, res)=>{
    
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //grab the index parameter from the url and convert to int
    let dinoIndex = parseInt(req.params.id)
    res.render('dinosaurs/show', {myDinos: dinoData[dinoIndex]})
})

app.listen(8000);