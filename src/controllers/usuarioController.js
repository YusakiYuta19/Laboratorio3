const { usuario } = require('../config/prisma');
const usuarioService = require('../services/usuarioService');

const registraUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.crearUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuario = await usuarioService.obtenerUsuarios();
        res.json(usuario);
} catch (error) {
    res.status(500).json({error: error.message});
}
    
};

const eliminarUsuario = async (req, res) => {
    try{
        const {id} = req.params;
        const respuesta = await usuarioService.eliminarUsuario(id);
        res.json(respuesta);
    } catch (error){
        res.status(404).json({error: error.message});
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const actualizado = await usuarioService.actualizarUsuario(id, req.body);
        res.json(actualizado)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const obtenerUsuarioporId = async (req, res) => {
    try {
        const {id} = req.params;
        const usuario = await usuarioService.obtenerUsuarioporId(id);
        res.json(usuario);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const { loginUsuario } = require('../services/usuarioService');

async function login(req, res) {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ mensaje: "Correo y contraseña son requeridos" });
  }

  const usuario = await loginUsuario(correo, contrasena);
  if (!usuario) {
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }

  res.status(200).json({ mensaje: "Login exitoso", usuario });
};
    

module.exports = {
    registraUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    actualizarUsuario,
    obtenerUsuarioporId,
    login,
};