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
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    console.log(dinosaurs)
    res.send('dinosaurs index route')
})

app.listen(8000);