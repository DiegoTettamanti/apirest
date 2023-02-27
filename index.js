const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const store = require('./models/Clients.js');
const Clients = require('./models/Clients.js');

// const bodyParser = require('body-parser');

// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos

// const cors = require('cors');



// crear el servidor
const app = express();


// conectar mongo
const mongoURL = 'mongodb+srv://Tettacorp:Fullstack23@cluster17.63yiu.mongodb.net/ecommerce?retryWrites=true&w=majority'
//mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, {
     useNewUrlParser: true,
     useUnifiedTopology: true
 });
 mongoose.set('strictQuery', true)

//Midleware
app.use(express.json({limit: "50mb"}))

app.post("/api/clients", (req, res) => {
    let clientdata = req.body
    let mongoRecords = []
    clientdata.forEach(client => {
        mongoRecords.push({
            name: client.name,
            lastname: client.lastname,
            enterprise: client.enterprise,
            email: client.email,
            phone: client.phone
        })
    });
    Clients.create(mongoRecords, (err, records)=>{
     if(err){
        res.status(500).send(err)
     }   
     else{
        res.status(200).send(records)
    }})
})


// habilitar bodyparser
// app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({extended: true}));

// Habilitar cors
// app.use(cors());

app.get("/", (req, res) => {
    res.send("Hola Mundo")})

// // Rutas de la app
// app.use('/', routes());

// // carpeta publica
app.use(express.static('uploads'));

// puerto
const port = 8080
app.listen(port, ()=>{
    console.log(`Server is listening at http://localhost:${8080}`)});