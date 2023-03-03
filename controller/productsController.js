const Products = require('../models/Products');


// const multer = require('multer');
// const shortid = require('shortid');

// const configuracionMulter = {
//     storage: fileStorage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, __dirname+'../../uploads/');
//         },
//         filename: (req, file, cb) => {
//             const extension = file.mimetype.split('/')[1];
//             cb(null, `${shortid.generate()}.${extension}`);
//         }
//     }),
//     fileFilter(req, file, cb) {
//         if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
//             cb(null, true);
//         } else {
//             cb(new Error('Formato No válido'))
//         }
//     },
// }

// pasar la configuración y el campo
// const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo 
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

// agrega nuevos productos
exports.nuevoProducto = async (req, res, next) => {
    const product = new Products(req.body);

    try {
        if(req.file.filename) {
            product.imagen = req.file.filename
        }
        await product.save();
        res.json({mensaje : 'Se agrego un nuevo producto'})
    } catch (error) {
        console.log(error);
        next();
    }
} 


// Muestra todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        // obtener todos los productos
        const products = await Products.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un producto en especifico por su ID
exports.mostrarProducto = async (req, res, next) => {
    const product = await Products.findById(req.params.idProduct);

    if(!product) {
        res.json({mensaje : 'Ese Producto no existe'});
        return next();
    }

    // Mostrar el producto
    res.json(product);
}

// Actualiza un producto via id
exports.actualizarProducto = async (req, res, next) => {
    try {
        // construir un nuevo producto
        let newProduct = req.body;

        // verificar si hay imagen nueva
        if(req.file) {
            newProduct.imagen = req.file.filename;
        } else {
            let productoAnterior = await Products.findById(req.params.idProduct);
            newProduct.imagen = productoAnterior.imagen;
        }

        
        let product = await Products.findOneAndUpdate({_id : req.params.idProduct}, newProduct, {
            new : true,
        });

        res.json(product);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Elimina un producto via ID
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Products.findByIdAndDelete({ _id : req.params.idProduct });
        res.json({mensaje : 'El Producto se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.buscarProducto = async (req, res, next) => {
    try {
        // obtener el query
        const { query } = req.params;
        const product = await Products.find({ nombre: new RegExp(query, 'i') });
        res.json(product);
    } catch (error) {
        console.log(error);
        next();
    }
}