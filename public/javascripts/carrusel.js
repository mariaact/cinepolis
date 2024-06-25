const contenedorCarrusel = document.querySelector('.carrusel')
const imgCarrusel = document.querySelector('.imagen-carrusel');
const carrusel = document.querySelectorAll('.imagen-carrusel img');

let cont = 0;

function mostrarImagen(index){
    const offset = -index * contenedorCarrusel.offsetWidth;
    imgCarrusel.style.transform = `translateX(${offset}px)`;
}

function siguienteImg(){
    cont = (cont + 1) % carrusel.length
    mostrarImagen(cont)
}

setInterval(siguienteImg, 3000);

