const Users = require('../models/Users.js');


exports.registrarUsuario = async (req, res) => {

    // leer los datos del usuario y colocarlos en Usuarios
    const user = new Users(req.body);
    user.password = await bcrypt.hash(req.body.password, 12);
    try {
        await user.save();
        res.json({mensaje : 'Usuario Creado Correctamente'});
    } catch (error) {
        console.log(error);
        res.json({mensaje : 'Hubo un error'});
    }
    
}






    
