const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/registro', usuarioController.registraUsuario);//Registra un nuevo usuario
router.get('/', usuarioController.obtenerUsuarios);//Obtiene los usuarios
router.delete('/:id', usuarioController.eliminarUsuario); //Eliminar Usuario
router.put('/:id', usuarioController.actualizarUsuario);
router.get('/:id', usuarioController.obtenerUsuarioporId);
router.post('/login', usuarioController.login);


module.exports = router;