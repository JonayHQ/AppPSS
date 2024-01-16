import {SideBar} from './sideBar.js'
import {validarJWT} from './helpers.js'

const btnInforme = document.querySelector('#btnInforme')
const barraLateral = document.querySelector('#barraLateral')

const sideBar = new SideBar()

const init = async () => {

    validarJWT()

    const arregloTextos = await sideBar.cargarTextos()
    console.log(arregloTextos)

    let datosProyecto = (localStorage.getItem("datosProyecto"))?
        (JSON.parse(localStorage.getItem("datosProyecto")))
        :[{nombre:"hola", pepe:"asdf"},[],[]]



//?CARGAR SECCIONES y APARTADOS EN BARRA LATERAL
const seccionesHTML = sideBar.imprimirUO(arregloTextos, datosProyecto, true ,2)
barraLateral.innerHTML = ""
barraLateral.innerHTML = seccionesHTML

console.log(seccionesHTML)

///?EFECTO ACORDEON SIDE-BAR
const navTitulos = document.querySelectorAll(".nav-list-item-button")
navTitulos.forEach(navTitulo => {
    navTitulo.addEventListener('click', ()=>{
        console.log("activar acordeon")
        navTitulo.classList.toggle('arrow')
        if(navTitulo.classList.contains('arrow')){
           // navTitulo.nextElementSibling.style.height = "auto"
            navTitulo.nextElementSibling.classList.add('activo')
            
        }else{
           // navTitulo.nextElementSibling.style.height = 0
            navTitulo.nextElementSibling.classList.remove('activo')
        }
        
    })
    
    });

//? Registrar las Apartados seleccionadas en el LocalStorage
const checkArreglo = document.getElementsByName("checkUO")

//Como por defecto todos los apartados estan checked.
//Guarda la primera vez todos los apartados en datos proyecto.
if(datosProyecto[2].length===0){
arregloTextos.forEach(textoObj => {
    datosProyecto[2].push(textoObj)
    localStorage.setItem("datosProyecto", JSON.stringify(datosProyecto));
});
    //localStorage.setItem("datosProyecto", JSON.stringify(datosProyecto));
}

//DETECTAR LA UO CHEQUEADA
checkArreglo.forEach(checkTitulo => {
    checkTitulo.addEventListener('change', (e)=>{
            let checkbox = e.target
        //SI SE MARCA_ lo graba en el arreglo de datosProyecto y guarda el arreglo acutalizado en LS
        if(checkbox.checked){
            arregloTextos.forEach(texto => {
                if (checkbox.id===texto._id){
                    datosProyecto[2].push(texto)
                    localStorage.setItem("datosProyecto", JSON.stringify(datosProyecto));
                    console.log("añade del arreglo de datos proyecto", datosProyecto[2])
                }
            })
        //SI SE DESMARCA_ lo elimina del arreglo de datosProyecto y guarda el arreglo acutalizado en LS
        }else{
            arregloTextos.forEach(texto => {
                if (checkbox.id===texto._id){
                  
                    datosProyecto[2] = datosProyecto[2].filter((UOcheked)=>(UOcheked._id!==texto._id))
                    localStorage.setItem("datosProyecto", JSON.stringify(datosProyecto));
                    console.log("elimina del arreglo de datos proyecto", datosProyecto[2])
                }
            })

        }

    })
});


}

init()

    btnInforme.addEventListener('click', ()=>window.location='informe.html')

