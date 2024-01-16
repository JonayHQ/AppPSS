import { response } from "express"

import { Modelo } from "../models/usuarios.js"
import { body } from "express-validator"
import { ModelDatosProyecto } from "../models/datosProyecto.js"

export{crearInput, cargarInputs}


const crearInput = async (req, res = response)=>{

    const data = req.body
    data.usuario = req.usuario._id

    const inputDato = new ModelDatosProyecto(data)
    await inputDato.save({new: true})

    res.status(201).json({
        msg: `Los inputs han sido registrados "${data}"`,
        })

}


const cargarInputs = async (req, res=response)=>{
    const query = {estado:true}
        const inputsArr =  await ModelDatosProyecto.find(query)      
            res.json({
                inputsArr
            })
}