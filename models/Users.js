

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String, 
        unique: true,
        lowercase: true,
        trim : true, 
    },
    name : {
        type: String, 
        required: 'Agrega tu Nombre'
    }, 
    password: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Users', usersSchema);