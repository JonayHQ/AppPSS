import {Router} from 'express'
import {check} from 'express-validator'
import { validarCampos, validarJWT, esAdminRole, tieneRol} from '../middlewares/index.js';
export { routerEpi }

const routerEpi = Router()

import { cargarEpis, crearEpi} from '../controllers/controllerEpi.js';


//* Crear un medioAuxiliar - Privado - cualquier con token valido 
routerEpi.post('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], crearEpi)


routerEpi.get('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], cargarEpis)