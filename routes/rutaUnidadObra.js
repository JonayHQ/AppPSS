import {Router} from 'express'
import {check} from 'express-validator'
import { validarCampos, validarJWT, esAdminRole, tieneRol} from '../middlewares/index.js';
export { routerUnidadObra }

const routerUnidadObra = Router()

import { crearUnidadObra, cargarUO } from '../controllers/controllerUO.js';


//* Crear una producto - Privado - cualquier con token valido 
routerUnidadObra.post('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], crearUnidadObra)



routerUnidadObra.get('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], cargarUO)