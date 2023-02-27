const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    name: {
        type: String,
        trim : true
    },
    lastname : {
        type: String,
        trim : true
    },
    enterprise : {
        type: String,
        trim: true
    },
    email : {
        type: String,
        unique: true,
        lowercase: true, 
        trim: true
    },
    phone : {
        type: String, 
        trim: true
    }
});

module.exports = mongoose.model('Clients', clientesSchema);