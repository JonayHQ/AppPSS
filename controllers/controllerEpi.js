import { response } from "express"

import { Modelo } from "../models/usuarios.js"
import { body } from "express-validator"
import { ModelEpi} from "../models/epis.js"


export{crearEpi, cargarEpis}


const crearEpi = async (req, res = response)=>{

    const data = req.body
    data.usuario = req.usuario._id

    const epi = new ModelEpi(data)
    await epi.save({new: true})

    res.status(201).json({
        msg: `El epi ha sido registrado ${data.titulo}`,
        })

}


const cargarEpis = async (req, res=response)=>{
    const query = {estado:true}
        const episArr =  await ModelEpi.find(query)      
            res.json({
                episArr
            })
}