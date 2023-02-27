const express = require('express');
const router = express.Router();

const clientController = require("../controller/clientController");
const productsController = require("../controller/productsController");
const cartsController = require("../controller/cartsController.js");
const usersController = require("../controller/usersController.js");

// middle para proteger las rutas
// const auth = require('../middleware/auth');

module.exports = function() {
    
    // Agrega nuevos clientes via POST
    router.post('/clients',
        clientController.newClient
    );

    // Obtener todos los clientes
    router.get('/clients', 
        clientController.mostrarClientes
    );

    // Muestra un cliente en especifico (ID)
    router.get('/clients/:idClient', 
        clientController.mostrarCliente );

    // Actualizar Cliente
    router.put('/clients/:idClient', 
        clientController.actualizarCliente);

    // Eliminar Cliente
    router.delete('/clients/:idClient', 
        clientController.eliminarCliente);

    /** PRODUCTOS */
    // nuevos productos
    router.post('/products', 
        productsController.subirArchivo,
        productsController.nuevoProducto
    );

    // Muestra todos los productos
    router.get('/products', 
        productsController.mostrarProductos);

    // muestra un producto en especifico por su ID
    router.get('/products/:idProduct', 
        productsController.mostrarProducto);

    // Actualizar Productos
    router.put('/products/:idProducto', 
        productsController.subirArchivo,
        productsController.actualizarProducto
    );

    // Eliminar Productos
    router.delete('/products/:idProduct', 
        productsController.eliminarProducto
    );

    // Busqueda de Productos
    router.post('/products/busqueda/:query',
        productsController.buscarProducto);

    /*** PEDIDOS */
    // Agrega nuevos pedidos
    router.post('/carts/nuevo/:idUsuario', 
        cartsController.nuevoPedido);

    // mostrar todos los pedidos
    router.get('/carts', 
        cartsController.mostrarPedidos);

    // Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido',
    cartsController.mostrarPedido);

    // Actualizar pedidos
    router.put('/carts/:idcarts', 
    cartsController.actualizarPedido);

    // Elimina un pedido
    router.delete('/carts/:idCart', 
    cartsController.eliminarPedido);


    // Usuarios
    router.post('/crear-cuenta', 
        auth,
        usersController.registrarUsuario
    );



    return router;
}