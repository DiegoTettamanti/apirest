const Carts = require('../models/Carts');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Carts(req.body);
    try {
        await pedido.save();
        res.json({mensaje : 'Se agregó un nuevo carrito'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const carts = await Carts.find({}).populate('cliente').populate({
            path: 'cart.product',
            model: 'Productos'
        });

        res.json(carts);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un pedido por su ID
exports.mostrarPedido = async (req, res, next) => {
    const cart = await Carts.findById(req.params.idCart).populate('client').populate({
        path: 'cart.product',
        model: 'Products'
    })

    if(!cart) {
        res.json({mensaje : 'Ese no carrito no existe'});
        return next();
    }

    // mostrar el pedido
    res.json(cart);
}

// Actualizar el pedido via ID
exports.actualizarPedido = async (req, res, next) => {
    try {
        let cart = await Carts.findOneAndUpdate({_id : req.params.idCart}, req.body, {
            new: true
        } )
        .populate('client')
        .populate({
            path: 'cart.product',
            model: 'Products'
        });

        res.json(cart)
    } catch (error) {
        console.log(error);
        next();
    }
}

// elimina un pedido por su id
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Carts.findOneAndDelete({ _id : req.params.idCart});
        res.json({ mensaje : 'El carrito se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}