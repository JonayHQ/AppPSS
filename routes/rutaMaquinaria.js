import {Router} from 'express'
import {check} from 'express-validator'
import { validarCampos, validarJWT, esAdminRole, tieneRol} from '../middlewares/index.js';
export { routerMaquinaria }

const routerMaquinaria = Router()

import { cargarMaquinaria, crearMaquinaria} from '../controllers/controllerMaquinaria.js';


//* Crear un medioAuxiliar - Privado - cualquier con token valido 
routerMaquinaria.post('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], crearMaquinaria)


routerMaquinaria.get('/', [
    validarJWT,
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], cargarMaquinaria)