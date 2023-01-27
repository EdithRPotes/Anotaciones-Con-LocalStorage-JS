//VARIABLES
const formulario = document.querySelector('#formulario');
const listaNotas = document.querySelector('#lista-notas');
let notas = []; //arreglo que va a almacenar todas las notas

// EVENT LISTENERS
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega una nueva nota
    formulario.addEventListener('submit',agregarNota);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',()=>{
        notas = JSON.parse(localStorage.getItem('notas')) || [];

        console.log(notas)

        crearHTML();
    })
}

// FUNCIONES

//AGREGAR NOTA CUANDO SE DISPARE EVENTO SUBMIT
function agregarNota(e){
e.preventDefault();
// console.log('agregando nota');

//VALIDACION DEL FORMULARIO 
//  textarea donde el usuario escribe
const nota = document.querySelector('#nota').value;
// console.log(nota)
//validación..
if(nota === ''){
 mostrarError('no puede ir vacio el campo de notas')
 return; // evita que se ejecuten más lineas de código
}
//  console.log('agregando nota...');


const notaObj={
    id: Date.now(),// registra el momento de ingreso de una nota
    texto: nota,
}

//AÑADIR AL ARREGLO DE NOTAS
notas = [...notas, notaObj ];
// console.log(notas);

//MOSTRAR EN EL HTML una vez que se añadan las notas 
crearHTML();

//REINICIAR EL FORMULARIO
formulario.reset();

}

//MOSTRAR MENSAJE DE ERROR CUANDO EL TEXT AREA ESTE VACIO Y SE INTENTE AGREGAR
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el Contenido del html
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // elimina la alerta despues de 3 segundos
    setTimeout(()=>{
        mensajeError.remove();
    },3000);

}

//MUESTRA LISTADO DE LAS NOTAS
function crearHTML(){
    limpiarHTML();

    if(notas.length>0){
        notas.forEach(texto=>{
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-nota');
            btnEliminar.innerText = 'X';

            // Añadir la función de eliminar
            btnEliminar.onclick = ()=>{
                borratNota(texto.id);
            }

            //Crear HTML
            const li = document.createElement('li');

            //anadir el texto 
            li.innerText = texto.texto;

            // Asignar el botón
            li.appendChild(btnEliminar);

            //insertarlo en el html 
            listaNotas.appendChild(li);
        });
    }

    sincronizarStorage();
}

//AGREGA LAS NOTAS ACTUALES AL LOCALSTORAGE
function sincronizarStorage(){
    localStorage.setItem('notas', JSON.stringify(notas));
}
//BORRAR NOTA AGREGADA 
function borratNota(id){
    // console.log('borrando',id)
    notas = notas.filter(texto =>texto.id !== id); // se trae todas las notas excepto la que borramos
    // console.log(notas);
    crearHTML();
}

//LIMPIAR HTML 
function limpiarHTML(){
    while(listaNotas.firstChild){
        listaNotas.removeChild(listaNotas.firstChild);
    }
}

