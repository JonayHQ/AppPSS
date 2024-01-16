import {SideBar} from './sideBar.js'
import {validarJWT} from './helpers.js'


const btnGuardarContinuar = document.querySelector('#btnGuardarContinuar')
const descripcionUO = document.querySelector('#descripcionUO')
const barraLateral = document.querySelector('#barraLateral')
const listaMedios = document.querySelector('#listaMedios')
const listaEpis = document.querySelector('#listaEpis')
const listaMaquinas = document.querySelector('#listaMaquinas')
const panelTablaRiesgos = document.querySelector('#panelTablaRiesgos')
const medidasPrev = document.querySelector('#descripcionMedPrev')

const sideBar = new SideBar()



const init = async () => {

    validarJWT()

    const arregloUO = await sideBar.cargarUO()
    const arregloMaquinaria = await sideBar.cargarMaquinaria()
    const arregloMediosAux = await sideBar.cargarMediosAuxiliares()
    const arregloEpis = await sideBar.cargarEpis()

    //extraigo los datos introducidos hasta ahora...
    let datosProyecto = (localStorage.getItem("datosProyecto"))?
        (JSON.parse(localStorage.getItem("datosProyecto")))
        :[{nombre:"hola", pepe:"asdf"},[],[]]

        
    console.log(datosProyecto)
    console.log(arregloEpis)
    console.log(arregloMediosAux)
    console.log(arregloMaquinaria)
    console.log(arregloUO)

//?CARGAR SECCIONES y UNIDADES DE OBRA EN BARRA LATERAL
const seccionesHTML = sideBar.imprimirUO(arregloUO, datosProyecto, false ,1)
barraLateral.innerHTML = ""
barraLateral.innerHTML = seccionesHTML

//?EFECTO ACORDEON
const navTitulos = document.querySelectorAll(".nav-list-item-button")
navTitulos.forEach(navTitulo => {
    navTitulo.addEventListener('click', ()=>{
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

//?CARGAR INFO DE CADA UNIDAD DE OBRA EN PANTALLA VISUALIZACION
const parrafosUO = document.getElementsByName("parrafoUO")

    parrafosUO.forEach(parrafoUO => {
        parrafoUO.addEventListener('click', (e)=>{
            console.log(e.target.id)
            let UOseleccionado
            arregloUO.forEach(UO => {
                if (e.target.id===UO._id){
                    //Vuelca los datos de descripcion de obra
                    descripcionUO.value = UO.descripcion
                    //Vuelca los datos de descripcion medidas preventivas
                    medidasPrev.value = UO.medidasPrev
                    
                   const medAuxHTML = sideBar.imprimirMedAux(UO, arregloMediosAux)
                   listaMedios.innerHTML = ""
                   listaMedios.innerHTML = medAuxHTML

                   const episHTML = sideBar.imprimirEpis(UO,arregloEpis)
                   listaEpis.innerHTML = ""
                   listaEpis.innerHTML = episHTML

                   const maquinariaHTML = sideBar.imprimirMaquinaria(UO, arregloMaquinaria)
                   listaMaquinas.innerHTML = ""
                   listaMaquinas.innerHTML = maquinariaHTML

                   const riesgosHTML = sideBar.imprimirRiesgos(UO)
                   panelTablaRiesgos.innerHTML = ""
                   panelTablaRiesgos.innerHTML = riesgosHTML

                }
            }); 
        })

    });


//! Registrar las UO seleccionadas en el LocalStorage
const checkUOarreglo = document.getElementsByName("checkUO")

//DETECTAR LA UO CHEQUEADA
checkUOarreglo.forEach(checkUO => {
    checkUO.addEventListener('change', (e)=>{
            let checkbox = e.target
        //SI SE MARCA_ lo graba en el arreglo de datosProyecto y guarda el arreglo acutalizado en LS
        if(checkbox.checked){
            arregloUO.forEach(UO => {
                if (checkbox.id===UO._id){
                    datosProyecto[1].push(UO)
                    localStorage.setItem("datosProyecto", JSON.stringify(datosProyecto));
                }
            })
        //SI SE DESMARCA_ lo elimina del arreglo de datosProyecto y guarda el arreglo acutalizado en LS
        }else{
            arregloUO.forEach(UO => {
                if (checkbox.id===UO._id){
                    datosProyecto[1] = datosProyecto[1].filter((UOcheked)=>(UOcheked._id!==UO._id))
                    localStorage.setItem("datosProyecto", JSON.stringify(datosProyecto));
                    
                }
            })

        }


          //Despues lo guardo en localStorage
                //Si se renueva la pagina debe rescatar la unidades marcadas, por lo que debe leer del LS
                //

                //ESTRUCTURA DATOS DE DATOS PROYECTO
                    //ARREGLO
                    /*
                    datosProyecto = [
                        "datosIniciales"{nombreObra:"...", Empresa:"...", .... },
                            imitar la estructura de unidad obra del model y sobre escribo sobre ella.
                        "unidadesObra" [ {id: ".....", titulo:"....", descripcion:"..."}  ]

                    ] 
                    */
    })
});



}

init()








btnGuardarContinuar.addEventListener('click', ()=>{

    window.location = "edicion.html"
})




