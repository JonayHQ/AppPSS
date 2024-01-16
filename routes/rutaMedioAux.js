import {Router} from 'express'
import {check} from 'express-validator'
import { validarCampos, validarJWT, esAdminRole, tieneRol} from '../middlewares/index.js';
export { routerMedioAux }

const routerMedioAux = Router()

import { crearMedAux, cargarMediosAuxiliares } from '../controllers/controllerMedAux.js';


//* Crear un medioAuxiliar - Privado - cualquier con token valido 
routerMedioAux.post('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], crearMedAux)



routerMedioAux.get('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], cargarMediosAuxiliares)

