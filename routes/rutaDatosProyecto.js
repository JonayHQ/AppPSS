import {Router} from 'express'
import {check} from 'express-validator'

import { validarCampos, validarJWT, esAdminRole, tieneRol} from '../middlewares/index.js';

export { routerdatosProyecto }

const routerdatosProyecto = Router()

import { crearInput, cargarInputs } from '../controllers/cotrollerDatosProyecto.js';


//* Crear una producto - Privado - cualquier con token valido 
routerdatosProyecto.post('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], crearInput)

routerdatosProyecto.get('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], cargarInputs)





/*
//* Obtener todas las categorias - Publico
routerLugar.get('/', obtenerLugares)

routerLugar.put('/',[
    validarJWT,
    //check('id', "No es una id de mongo válido").isMongoId(),
    //check('id').custom(existeProducto),
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos,
], eliminarLugar)

routerLugar.put('/editar',[
    validarJWT,
    //check('id', "No es una id de mongo válido").isMongoId(),
    //check('id').custom(existeProducto),
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos,
], editarLugar)
*/