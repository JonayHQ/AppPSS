import { response } from "express"

import { Modelo } from "../models/usuarios.js"
import { body } from "express-validator"
import { ModelTextos } from "../models/textosApartados.js"


export{crearTexto, cargarTextos}


const crearTexto = async (req, res = response)=>{

    const data = req.body
    data.usuario = req.usuario._id

    const epi = new ModelTextos(data)
    await epi.save({new: true})

    res.status(201).json({
        msg: `El texto ha sido registrado ${data.titulo}`,
        })

}


const cargarTextos = async (req, res=response)=>{
    const query = {estado:true}
        const textosArr =  await ModelTextos.find(query)      
            res.json({
                textosArr
            })
}