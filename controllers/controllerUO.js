import { response } from "express"

import { Modelo } from "../models/usuarios.js"
import { body } from "express-validator"
import { ModelUO } from "../models/unidadObra.js"


export{crearUnidadObra,cargarUO}


const crearUnidadObra = async (req, res = response)=>{

    const data = req.body
    data.usuario = req.usuario._id

    const unidadObra = new ModelUO(data)
    await unidadObra.save({new: true})

    res.status(201).json({
        msg: `La unidad de obra ha sido registrada "${data.titulo}"`,
        })

}


const cargarUO = async (req, res=response)=>{
    const query = {estado:true}
        const UOArr =  await ModelUO.find(query)      
            res.json({
                UOArr
            })
}
