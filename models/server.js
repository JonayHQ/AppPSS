import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { createServer } from 'http';
import { Server } from 'socket.io'

import { routerTextos } from '../routes/rutaTextos.js'
import { routerEpi } from '../routes/rutaEpi.js';
import { routerMaquinaria } from '../routes/rutaMaquinaria.js';
import { routerMedioAux } from '../routes/rutaMedioAux.js';
import { routerUnidadObra } from '../routes/rutaUnidadObra.js';
import { routerdatosProyecto } from '../routes/rutaDatosProyecto.js';
import { router } from '../routes/user.js'
import { routerAuth } from '../routes/auth.js'
import { dbConnection } from '../database/config.js'


export {Servidor}

class Servidor {

constructor()  {
    this.app = express()
    this.port = process.env.PORT
    this.server = createServer(this.app);
    this.io = new Server(this.server); 

    this.paths = {
        auth:           '/api/auth',
        usuarios:       '/api/usuarios',
        unidadObra:     '/api/unidadObra',
        medioAux:       '/api/medioAux',
        maquinaria:     '/api/maquinaria',
        epi:            '/api/epi',
        textos:         '/api/textos',
        datosProyecto:  '/api/datosProyecto'

    }
/* Estas dos lineas son sustituidas por las de arriba
    this.usuariosPath = '/api/usuarios'
    this.authPath ='/api/auth'
*/
    //Conectar a base de datos
    this.conectarDB()
    //Middlewares
    this.middlewares()
    //Rutas de mi aplicacion
    this.routes()

    this.sockets()
}

async conectarDB(){
    await dbConnection()
}

middlewares(){
    //CORS
    this.app.use( cors() )
    //Lectura y parseo del body
    this.app.use(express.json())
    //Directorior publico
    this.app.use(express.static('public'))

    //carga de archivos
    this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath: true
    }));

}

routes(){
    this.app.use(this.paths.textos, routerTextos)
    this.app.use(this.paths.datosProyecto, routerdatosProyecto)
    this.app.use(this.paths.unidadObra, routerUnidadObra)
    this.app.use(this.paths.medioAux, routerMedioAux)
    this.app.use(this.paths.maquinaria, routerMaquinaria)
    this.app.use(this.paths.epi, routerEpi)
    this.app.use(this.paths.auth, routerAuth)
    this.app.use(this.paths.usuarios, router)
}

sockets(){
   // this.io.on('connection', socket =>socketController(socket,this.io))
}

listen(){
    this.server.listen(this.port, ()=>{
        console.log("servidor corriendo en puerto", this.port)
    })
}

}