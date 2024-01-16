
export {SideBar, Peticiones}

class Peticiones {
    constructor(){

    }
    async getFetch(path,urlProduccion, urlDev, extRespuesta =""){
        let arregloRespuesta
        
        let url = (window.location.hostname.includes('localhost') )
        ? urlDev
        : urlProduccion
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-token", localStorage.getItem('token'));
          
        let myInitGet = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'};

        let myRequestGet = new Request(url+path, myInitGet);
        
        await fetch( myRequestGet )
        .then(resp => resp.json() )
        .then( (respuesta)=>  {
        arregloRespuesta = respuesta[extRespuesta]
        })
        .catch(console.warn);
   
   
    return arregloRespuesta
   
    }


    }


class SideBar {

    constructor() {
           
    }
    
    async cargarUO (){
        let peticiones = new Peticiones()

        let urlProduccion = "https://mitrasteroapp-production.up.railway.app/"
        let urlDev = 'http://localhost:8080/'
        let path = 'api/unidadObra'
        
        
      const arregloUO = peticiones.getFetch(path,urlProduccion,urlDev, "UOArr")

      return arregloUO
    }

    async cargarMaquinaria (){
        let peticiones = new Peticiones()

        let urlProduccion = "https://mitrasteroapp-production.up.railway.app/"
        let urlDev = 'http://localhost:8080/'
        let path = 'api/maquinaria'
        
      const arregloMaquinaria = peticiones.getFetch(path,urlProduccion,urlDev, "maquinariaArr")
      return arregloMaquinaria
    }

    async cargarMediosAuxiliares (){
        let peticiones = new Peticiones()

        let urlProduccion = "https://mitrasteroapp-production.up.railway.app/"
        let urlDev = 'http://localhost:8080/'
        let path = 'api/medioAux'
        
      const arregloMediosAux = peticiones.getFetch(path,urlProduccion,urlDev, "medAuxArr")
      return arregloMediosAux
    }

    async cargarEpis (){
        let peticiones = new Peticiones()

        let urlProduccion = "https://mitrasteroapp-production.up.railway.app/"
        let urlDev = 'http://localhost:8080/'
        let path = 'api/epi'
        
      const arregloEpis = peticiones.getFetch(path,urlProduccion,urlDev, "episArr")
      return arregloEpis
    }

    async cargarTextos (){
        let peticiones = new Peticiones()

        let urlProduccion = "https://mitrasteroapp-production.up.railway.app/"
        let urlDev =        'http://localhost:8080/'
        let path =          'api/textos'
        
      const arregloTextos = peticiones.getFetch(path,urlProduccion,urlDev, "textosArr")
      return arregloTextos
    }

    async cargarInputs (){
        let peticiones = new Peticiones()

        let urlProduccion = "https://mitrasteroapp-production.up.railway.app/"
        let urlDev =        'http://localhost:8080/'
        let path =          'api/datosProyecto'
        
      const arregloInputs = peticiones.getFetch(path,urlProduccion,urlDev, "inputsArr")
      return arregloInputs
    }

    imprimirInputs(arregloInputs){
        
/*
<div class="input">
            <div class="inputTexto">
                <label>Etiqueta input</label>
                <input placeholder="algo" id="etiqueta1">
            </div>
        </div>
*/
        const todoHTML = document.createElement('DIV')
        
        let labelInputsArr = arregloInputs[0].inputs

        labelInputsArr.forEach(labelInput => {
            const divInput = document.createElement('DIV')
                divInput.classList.add('input')

                const divInputTexto = document.createElement('DIV')
                divInputTexto.classList.add('inputTexto')

                    const labelInputTexto = document.createElement('LABEL')
                    labelInputTexto.textContent = labelInput.texto
                    const input = document.createElement('INPUT')
                        input.setAttribute("placeholder", "Introduzca el dato")
                        input.setAttribute("id", "labelInput.titulo")

        divInputTexto.appendChild(labelInputTexto)
        divInputTexto.appendChild(input)
        divInput.appendChild(divInputTexto)
        todoHTML.appendChild(divInput)
        });

      

        return todoHTML.innerHTML
    }

    imprimirUO(arregloApartados, datosProyecto, checked, indexDatosProy){
       
        let arregloSecciones = []
        
        //selecciona las secciones
        arregloApartados.forEach(arregloApartado => {
            if(!arregloSecciones.includes(arregloApartado.seccion)){
                arregloSecciones.push(arregloApartado.seccion)}
        });
       

        const todoHTML = document.createElement('DIV')
        const cabecero = document.createElement('DIV')
        cabecero.setAttribute('id', "navCabecero")
        cabecero.textContent = "Seleccione lo que desea incluir"

        /*
        <div id="navCabecero">
        Selecciona las unidades de obra <span style="color: orangered;">(aqui buscador!!)</span>
    </div>*/

        const div = document.createElement('DIV')
        div.classList.add('nav-list')

        //Itera para generar las secciones.
        arregloSecciones.forEach(seccion => {
            const seccionDiv  = document.createElement('div')
            seccionDiv.classList.add('nav-list-item')

            //-----------DIV TITULO SECCION -------------//
            const tituloSeccionDiv  = document.createElement('DIV')
            tituloSeccionDiv.classList.add('nav-list-item-button')

            const iconTituloSeccion  = document.createElement('IMG')
            const parrafoTituloSeccion  = document.createElement('P')
            parrafoTituloSeccion.textContent = seccion
            const flechaTituloSeccion  = document.createElement('IMG')
            flechaTituloSeccion.setAttribute('src', "./js/icons/arrowRight.svg")
            flechaTituloSeccion.classList.add('flecha')
            //-----END -----DIV TITULO SECCION-------------//

            //---------- DIV UNIDAD DE OBRA --------------//
            //Imprimir las unidades de obra de la seccion
            const divUnidadesdeObra = document.createElement('DIV')
            divUnidadesdeObra.classList.add('nav-list-item-show')

            arregloApartados.forEach(arregloApartado => {
                console.log("entrada en iteracion de arreglo textos")
                if( arregloApartado.seccion===seccion){
                    const divUO = document.createElement('DIV')
                    divUO.classList.add('item-inside')

                        const input = document.createElement('INPUT')
                        input.setAttribute('name', "checkUO")
                        input.setAttribute('id', arregloApartado._id)
                        input.setAttribute('type', "checkbox")
                        if(checked && (datosProyecto[indexDatosProy].length===0)){
                            input.setAttribute('checked', true)
                        }
                        datosProyecto[indexDatosProy].forEach(UOchecked => {
                            if(UOchecked._id===arregloApartado._id){
                                input.setAttribute('checked', true)
                            }
                        });
                        const parrafo = document.createElement('P')
                        parrafo.textContent = arregloApartado.titulo
                        parrafo.setAttribute('id', arregloApartado._id)
                        parrafo.setAttribute('name', "parrafoUO")
                        


                    divUO.appendChild(input)
                    divUO.appendChild(parrafo)
                    divUnidadesdeObra.appendChild(divUO)
                
                }


            });
            //-- END ---- DIV UNIDAD DE OBRA --------------//
            
            tituloSeccionDiv.appendChild(iconTituloSeccion)
            tituloSeccionDiv.appendChild(parrafoTituloSeccion)
            tituloSeccionDiv.appendChild(flechaTituloSeccion)
            seccionDiv.appendChild(tituloSeccionDiv)
            seccionDiv.appendChild(divUnidadesdeObra)
            div.appendChild(seccionDiv)
            todoHTML.appendChild(cabecero)
            todoHTML.appendChild(div)
        });


           return todoHTML.innerHTML
    }

    imprimirMedAux(unidadObra, arregloMediosAux){
        const {mediosAux} = unidadObra

        let nombresMedAuxUnidadObra = []
        //?Buscar la info de la maquina en el arreglo.
        mediosAux.forEach(medioAux => {
            arregloMediosAux.forEach(medioAuxBD => {
            if(medioAux === medioAuxBD._id){
                nombresMedAuxUnidadObra.push(medioAuxBD.titulo)  
            }
        });
        })

        const todoHTML = document.createElement('DIV')
        
        nombresMedAuxUnidadObra.forEach(medioAux => {
        const divMedioAux = document.createElement('DIV')
        divMedioAux.classList.add('listaMediosITEM')
        const parrafo = document.createElement('P')
        parrafo.textContent = medioAux
        const button = document.createElement('BUTTON')
        button.textContent = "X"
 
        divMedioAux.appendChild(parrafo)
        divMedioAux.appendChild(button)
        todoHTML.appendChild(divMedioAux)
        });

        
                /* <div class="listaMediosITEM">
                        <p>medio 1</p>
                        <button>X</button>
                    </div>
                <div class="listaMediosITEM"><p>medio 2</p><button>X</button></div>
                <div class="listaMediosITEM"><p>medio 3</p><button>X</button></div>
                <div class="listaMediosITEM"><p>medio 4</p><button>X</button></div>
                <div class="listaMediosITEM"><p>medio 5</p><button>X</button></div>*/

        return todoHTML.innerHTML
    }

    imprimirEpis(unidadObra, arregloEpis){

        const {epis} = unidadObra

        let nombresEpiUnidadObra = []
        //?Buscar la info de la maquina en el arreglo.
        epis.forEach(epi => {
            arregloEpis.forEach(epiBD => {
            if(epi === epiBD._id){
                nombresEpiUnidadObra.push(epiBD.titulo+" "+epiBD.norma) 
            }
        });
        })



        const todoHTML = document.createElement('DIV')
        
        nombresEpiUnidadObra.forEach(epi => {
            const divEpi = document.createElement('DIV')
            divEpi.classList.add('listaMediosITEM')
        
        const parrafo = document.createElement('P')
        parrafo.textContent = epi
        const button = document.createElement('BUTTON')
        button.textContent = "X"
 
        divEpi.appendChild(parrafo)
        divEpi.appendChild(button)
        todoHTML.appendChild(divEpi)
        });

        
                

        return todoHTML.innerHTML
    }

    imprimirMaquinaria(unidadObra, arregloMaquinaria){

        const {maquinaria} = unidadObra
        
        let nombresMaquinaUnidadObra = []
        //?Buscar la info de la maquina en el arreglo.
        maquinaria.forEach(maquina => {
        arregloMaquinaria.forEach(maquinaBD => {
            if(maquina === maquinaBD._id){
                nombresMaquinaUnidadObra.push(maquinaBD.titulo)  
            }
        });
        })

        const todoHTML = document.createElement('DIV')
        
        nombresMaquinaUnidadObra.forEach(maquina => {

            const divMaq = document.createElement('DIV')
            divMaq.classList.add('listaMediosITEM')
        
        
        const parrafo = document.createElement('P')
        parrafo.textContent = maquina
        const button = document.createElement('BUTTON')
        button.textContent = "X"
 
        divMaq.appendChild(parrafo)
        divMaq.appendChild(button)
        todoHTML.appendChild(divMaq)
        });

        return todoHTML.innerHTML
    }

    imprimirRiesgos(unidadObra){
        const arrgloRiesgos = unidadObra.riesgos

        const todoHTML = document.createElement('DIV')

        const tabla = document.createElement('TABLE')
        tabla.classList.add('tabla')
        const leyendaCaption = document.createElement('CAPTION')
        const filaTitulo = document.createElement('TR')
        const titulo1 = document.createElement('TH')
        titulo1.textContent = "RIESGO"
        titulo1.setAttribute('style', 'width: 50%')
        const titulo2 = document.createElement('TH')
        titulo2.textContent = "PROBABILIDAD"
        const titulo3 = document.createElement('TH')
        titulo3.textContent = "CONSECUENCIA"
        
        tabla.appendChild(leyendaCaption)
        tabla.appendChild(filaTitulo)
        filaTitulo.appendChild(titulo1)
        filaTitulo.appendChild(titulo2)
        filaTitulo.appendChild(titulo3)


        arrgloRiesgos.forEach(itemRiesgo => {
            const {riesgo,probabilidad,consecuencia} = itemRiesgo
            
            const filaItemRiesgo = document.createElement('TR')
            const columna1 = document.createElement('TD')
                const columna1Label = document.createElement('LABEL')
                columna1Label.textContent = riesgo
            const columna2 = document.createElement('TD')
                const columna2Input = document.createElement('INPUT')
                    columna2Input.setAttribute('type', 'number')
                    columna2Input.setAttribute('min', '0')
                    columna2Input.setAttribute('max', '3')
                    columna2Input.setAttribute('value', probabilidad)
            const columna3 = document.createElement('TD')
                const columna3Input = document.createElement('INPUT')
                    columna3Input.setAttribute('type', 'number')
                    columna3Input.setAttribute('min', '0')
                    columna3Input.setAttribute('max', '3')
                    columna3Input.setAttribute('value', consecuencia)

            columna1.appendChild(columna1Label)
            columna2.appendChild(columna2Input)
            columna3.appendChild(columna3Input)
            filaItemRiesgo.appendChild(columna1)
            filaItemRiesgo.appendChild(columna2)
            filaItemRiesgo.appendChild(columna3)
            tabla.appendChild(filaItemRiesgo)
        });

        todoHTML.appendChild(tabla)


/*<table class="tabla">
        <caption>Riesgos de la unidad obra</caption>
        <tr>
            <th style="width: 50%;">RIESGO</th>
            <th>PROBABILIDAD</th>
            <th>CONSECUENCIA</th>
        </tr>
        <!--ESTO DE ABAJO DE INYECTA DINAMICAMENTE-->
        <tr>
            <td><label>txt riesgo</label></td>
            <td><input type="number" value="3" min="0" max="3"></td>
            <td><input type="number" value="3" min="0" max="3"></td>
        </tr>
        <tr>
            <td><label>txt riesgo</label></td>
            <td><input type="number" value="3" min="0" max="3"></td>
            <td><input type="number" value="3" min="0" max="3"></td>
        </tr>
      </table>
*/



        return todoHTML.innerHTML
    }
}
