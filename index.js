require('dotenv').config();

const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
const port = 8000;
const bodyparser = require("body-parser");

const mongoose = require("mongoose");
 
// const Router = require("./routes")

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1/"+process.env.DB_HOST, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log(`connection Successful`);
}).catch((e)  => {
    console.log(e);
})


// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);
 

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(bodyparser.urlencoded({extended: true}));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

// ENDPOINTS
app.get('/contact', (req, res, err)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.status(201).render("home")
    }).catch(()=>{
      res.status(400).send("Item not saved in the database")
    })

    // res.status(200).render('contact.pug');
  })


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});