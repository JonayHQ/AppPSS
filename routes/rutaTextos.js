import {Router} from 'express'
import {check} from 'express-validator'
import { validarCampos, validarJWT, esAdminRole, tieneRol} from '../middlewares/index.js';
export { routerTextos }

const routerTextos = Router()

import { cargarTextos, crearTexto} from '../controllers/contollerTextos.js';


//* Crear un medioAuxiliar - Privado - cualquier con token valido 
routerTextos.post('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], crearTexto)


routerTextos.get('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], cargarTextos)