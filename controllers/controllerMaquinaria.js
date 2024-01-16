import { response } from "express"

import { Modelo } from "../models/usuarios.js"
import { body } from "express-validator"
import { ModelMaquinaria } from "../models/maquinaria.js"


export{crearMaquinaria, cargarMaquinaria}

const crearMaquinaria = async (req, res = response)=>{

    const data = req.body
    data.usuario = req.usuario._id

    const maquinaria = new ModelMaquinaria(data)
    await maquinaria.save({new: true})

    res.status(201).json({
        msg: `La maquinaria ha sido registrada "${data.titulo}"`,
        })

}

const cargarMaquinaria = async (req, res=response)=>{
    const query = {estado:true}
        const maquinariaArr =  await ModelMaquinaria.find(query)      
            res.json({
                maquinariaArr
            })
}