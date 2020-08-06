const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const fs = require('fs')// will use to read json files
const methodOverride = require('method-override');
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.urlencoded({extended: false})) //body-parser middleware
app.use(methodOverride('_method'));

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

    let nameFilter = req.query.nameFilter
    // keep in dinoData any dinos whose name field is equal to user's entry name.
    if(nameFilter){
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase()===nameFilter.toLowerCase()
        })
    }

    // render our dino index page and pass it the
    //dinoData as "myDinos"
    res.render('dinosaurs/index', {myDinos: dinoData})
})
app.get('/dinosaurs/new', (req,res)=>{
    res.render('dinosaurs/new')
})

app.get('/dinosaurs/edit/:id', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/edit', {dino: dinoData[req.params.id], dinoId: req.params.id})
})

app.put('/dinosaurs/:id', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    dinosaurs = JSON.parse(dinosaurs);

    dinosaurs[req.params.id].name = req.body.name;
    dinosaurs[req.params.id].type = req.body.type;

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
    res.redirect('/dinosaurs');
})

//show route (uses URL parameteer "id")
app.get('/dinosaurs/:id', (req, res)=>{
    
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //grab the index parameter from the url and convert to int
    let dinoIndex = parseInt(req.params.id)
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
})

app.post('/dinosaurs', (req, res)=>{
    //get json dinos and convert to a js array of objects
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //push new dino to the array
    dinoData.push(req.body)
    // convert dinoData back to JSON and write to dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to the index get route
    res.redirect('/dinosaurs')
})

app.delete('/dinosaurs/:id', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    dinosaurs = JSON.parse(dinosaurs);

    dinosaurs.splice(req.params.id, 1)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
    res.redirect('/dinosaurs');
})

//creatures

app.get('/creatures', (req, res)=>{
    //get the json from dinosaurs.json
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    //conver the json to javascript
    let creaturesData = JSON.parse(creatures)

    let nameFilter = req.query.nameFilter
    // keep in dinoData any dinos whose name field is equal to user's entry name.
    if(nameFilter){
        creaturesData = creaturesData.filter((creature)=>{
            return creature.name.toLowerCase()===nameFilter.toLowerCase()
        })
    }

    // render our dino index page and pass it the
    //dinoData as "myDinos"
    res.render('prehistoric_creatures/index', {myCreatures: creaturesData})
})
app.get('/prehistoric_creatures/new', (req,res)=>{
    res.render('prehistoric_creatures/new')
})

//show route (uses URL parameteer "id")
app.get('/creatures/:id', (req, res)=>{
    
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
    //grab the index parameter from the url and convert to int
    let creaturesIndex = parseInt(req.params.id)
    res.render('prehistoric_creatures/show', {myCreatures: creaturesData[creaturesIndex]})
})

app.post('/creatures', (req, res)=>{
    //get json dinos and convert to a js array of objects
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures)
    //push new dino to the array
    creaturesData.push(req.body)
    // convert dinoData back to JSON and write to dinosaurs.json file
    fs.writeFileSync('./creatures.json', JSON.stringify(creaturesData))
    // redirect to the index get route
    res.redirect('/creatures')
})


app.listen(8000);