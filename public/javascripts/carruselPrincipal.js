

let indice = 0;

function carrusel(data, boton) {


    if (boton == 'izq') {
        indice = indice - 1;
    } else {
        indice = indice + 1;
    }

    if (indice == -1) {
        indice = 4;
    } else if (indice == 5) {
        indice = 0;
    }

    const peliculas = JSON.parse(data);
    const titulo = peliculas[indice].title;
    const listaPeliculas = peliculas.map(pelicula => pelicula.backdrop_path);
    const img = peliculas[indice].backdrop_path;

    let valorImagen = document.getElementById("imagenCarrusel").src;
    document.getElementById("imagenCarrusel").src = "https://image.tmdb.org/t/p/original" + img;
    document.getElementById("tituloPeliculaCarrusel").innerText = titulo;

}

function verDetalle(){
    let tituloActual = document.getElementById("tituloPeliculaCarrusel").textContent;
console.log(tituloActual + '00')
    window.location.href = "/peliculaDetallada?valor="+ tituloActual;



}