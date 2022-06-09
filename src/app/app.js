const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const stuff=require('../routes/stuff')
const user = require('../routes/user')

const app = new express();

app.use(bodyparser.json())

mongoose.connect('mongodb://localhost/api', {useNewUrlParser: true})
    .then(()=>console.log('connexion a mongodb reussie...'))
    .catch(()=>console.log('connexion a mongodb echouee...'))

// mongoose.connect('mongodb+srv://farid:cyberisviking@clusteranakin.d3yyst8.mongodb.net/?retryWrites=true&w=majority',
//     { useNewUrlParser: true,
//         useUnifiedTopology: true })
//     .then(() => console.log('Connexion à MongoDB réussie !'))
//     .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//product
app.use('/api/stuff', stuff)

//user
app.use('/api/user', user)

module.exports=app;

