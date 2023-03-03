const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartsSchema = new Schema({
    client: {
        type: Schema.ObjectId, 
        ref: 'Clients'
    }, 
    pedido: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Products'
        }, 
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Carts', cartsSchema);