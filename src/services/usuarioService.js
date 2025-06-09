const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');

const crearUsuario = async ({ nombre, email, password }) => {
    const existe = await prisma.usuario.findUnique({ where: { email }});
    if (existe) throw new Error('El Email ya esta registrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
        data: {
            nombre,
            email,
            password: hashedPassword
        },
    });

    return usuario;

};

//obtener ususario
const obtenerUsuario = async () => {
    const ususario = await prisma.usuario.findMany({
        select: {
            id: true,
            nombre: true,
            email: true,
            createAt: true,
        },
    });

    return usuarios;
};

//eliminar usuarios
const eliminarUsuario = async (id) =>{
    const usuario = await prisma.usuario.findUnique({ where: {id: parseInt(id) } });
    if (!usuario) throw new Error('Usuario no encontrado');

    await prisma.usuario.delete({where: {id: parseInt(id) } });
    return{mensaje: 'Usuario eliminado exitosamente'};
};

//Actualizar usuario
const actualizarUsuario = async (id, datos) => {
    const usuario = await prisma.findUnique({ where: {id: parseInt(id) } });
    if (!usuario) throw new Error('Usuario no encontrado');

    const datosActualizados = {
        nombre: datos.nombre,
        email: datos.email,
    };

    if (datos.password) {
        const bcrypt = require('bcrypt');
        datosActualizados.password = await bcrypt.hash(datos.password, 10);
    }


    const actualizado = await prisma.usuario.update({
        where: {id: parseInt(id)},
        data: datosActualizados,
    });
};

//obtener usuario por ID
const obtenerUsuarioporId = async (id) => {
    const usuario = await prisma.usuario.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            nombre: true,
            email: true,
            createAt: true,
        },
    });
    if (!usuario) throw new Error('usuario no encontrado');
};

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function loginUsuario(correo, contrasena) {
  const usuario = await prisma.usuario.findUnique({ where: { correo } });
  if (!usuario) return null;

  const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!passwordValida) return null;

  return usuario;
};

module.exports = {
    crearUsuario,
    obtenerUsuario,
    eliminarUsuario,
    actualizarUsuario,
    obtenerUsuarioporId,
    loginUsuario,
};

