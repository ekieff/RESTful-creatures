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

app.listen(8000);