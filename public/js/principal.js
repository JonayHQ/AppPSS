
import {Peticiones, SideBar} from './sideBar.js'
import {validarJWT} from './helpers.js'



const inputsFormularios = document.querySelectorAll('input')
const btnform = document.querySelector('#btnform')
const mensajeDiv = document.querySelector('#mensajeDiv')

let datosProyecto = {}
let mensaje = ""

const sideBar = new SideBar()


//volcar los inputs para introducir los datos
const arregloInputs = await sideBar.cargarInputs()

//Imprimir los inputs en HTML
console.log(arregloInputs)



const formulario = document.querySelector('#formulario')
const inputsHTML = sideBar.imprimirInputs(arregloInputs)
formulario.innerHTML = ""
formulario.innerHTML = inputsHTML



//? LECTURA DE DATOS DEL FORMULARIO
btnform.addEventListener('click',  (e)=>{
    let valido
//?VALIDAR LOS CAMPOS segun tipo
const validarCampos = inputsFormularios.forEach(input => {
    if(input.value===""){
        valido = false
    }else{
        valido = true
        window.location="unidadesObra.html"
    }  
})

//?SI TODO ESTA BIEN, ENVIAR A GRABAR A BASE DE DATOS y comenzar proyecto
if(valido){
    inputsFormularios.forEach(input => {
        if(input.id.includes('btn')){
            datosProyecto[input.id] = input.checked;
        }else{
            datosProyecto[input.id] = input.value;
        }
    });
    console.log("ejecutar guarda en BD")

    //!GUARDAR EN BASE DE DATOS
console.log(datosProyecto)

guardarDatos(datosProyecto)

}else{
    mensajeDiv.innerHTML ="Debe completar todos los campos"
}



})
