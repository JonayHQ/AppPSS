import { response } from "express"

import { Modelo } from "../models/usuarios.js"
import { body } from "express-validator"
import { ModelMedAux } from "../models/mediosAuxiliares.js"

export{crearMedAux, cargarMediosAuxiliares}


const crearMedAux = async (req, res = response)=>{

    const data = req.body
    data.usuario = req.usuario._id

    const medioAux = new ModelMedAux(data)
    await medioAux.save({new: true})

    res.status(201).json({
        msg: `El medio auxiliar ha sido registrado "${data.titulo}"`,
        })

}


const cargarMediosAuxiliares = async (req, res=response)=>{
    const query = {estado:true}
        const medAuxArr =  await ModelMedAux.find(query)      
            res.json({
                medAuxArr
            })
}