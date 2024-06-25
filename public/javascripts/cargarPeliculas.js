
let cont = 4;
let final = 8;
let ocultarBotonCargasMasMenos1 = document.getElementById('load-more-1');
let ocultarBotonCargasMas0 = document.getElementById('load-more0');
let ocultarBotonCargasMas = document.getElementById('load-more1');
let ocultarBotonCargasMas1 = document.getElementById('load-more2');
let ocultarBotonCargasMas2 = document.getElementById('load-more3');


function prueba(data, numero) {

    var peliculas = JSON.parse(data)
    var idCont = 1
    var bloque = '';

    if (numero == -1) {
        bloque = '10';
    } else if (numero == 0) {
        bloque = '0';
    } else if (numero == 1) {
        bloque = '1';
    } else if (numero == 2) {
        bloque = '2'
    } else {
        bloque = '3';
    }

  
    if (bloque == 10) {
        let inicio = 5;
        let terminar = 10;
        for (var i = inicio; i < terminar; i++) {

            var idTitulo = 'h3' + bloque + '-' + idCont;
            var idImg = 'img' + bloque + '-' + idCont;
            var idEnlacePelicula = 'enlacePelicula' + bloque + '-' + idCont;

            document.getElementById(idTitulo).innerHTML = peliculas[i].titulo
            document.getElementById(idImg).src = 'https://image.tmdb.org/t/p/original' + peliculas[i].imagen
            document.getElementById(idEnlacePelicula).href = '/peliculaDetallada?valor=' + peliculas[i].titulo
            idCont++;

            if (final = 10) {
                ocultarBotonCargasMasMenos1.style.display = 'none';
                cont = 4;
                final = 8;
            }
        }
    }else if (bloque == 0) {

        for (var i = cont; i < final; i++) {

            var idTitulo = 'h3' + bloque + '-' + idCont;
            var idImg = 'img' + bloque + '-' + idCont;
            var idEnlacePelicula = 'enlacePelicula' + bloque + '-' + idCont;

            if (bloque == '0') {
                document.getElementById(idTitulo).innerHTML = peliculas[i].titulo
                document.getElementById(idImg).src = 'https://image.tmdb.org/t/p/original' + peliculas[i].imagen
                document.getElementById(idEnlacePelicula).href = '/peliculaDetallada?valor=' + peliculas[i].titulo
            } else {
                document.getElementById(idTitulo).innerHTML = peliculas[i].titulo
                document.getElementById(idImg).src = 'https://image.tmdb.org/t/p/original' + peliculas[i].imagen
                document.getElementById(idEnlacePelicula).href = '/peliculaDetallada?valor=' + peliculas[i].titulo
            }

            document.getElementById(idTitulo).innerHTML = peliculas[i].titulo
            document.getElementById(idImg).src = 'https://image.tmdb.org/t/p/original' + peliculas[i].imagen
            document.getElementById(idEnlacePelicula).href = '/peliculaDetallada?valor=' + peliculas[i].titulo

            idCont++;
            if (i == 39) {
                ocultarBotonCargasMas0.style.display = 'none';
                cont = 4;
                final = 8;
            }
        }
    } else {
        for (var i = cont; i < final; i++) {
            var idTitulo = 'h3' + bloque + '-' + idCont;
            var idImg = 'img' + bloque + '-' + idCont;
            var idEnlacePelicula = 'enlacePelicula' + bloque + '-' + idCont;

            document.getElementById(idTitulo).innerHTML = peliculas[i].title
            document.getElementById(idImg).src = 'https://image.tmdb.org/t/p/original' + peliculas[i].poster_path
            document.getElementById(idEnlacePelicula).href = '/peliculaDetallada?valor=' + peliculas[i].title

            idCont++;
            if (i == 39) {
                if (bloque == 1) {
                    ocultarBotonCargasMas.style.display = 'none';
                } else if (bloque == 2) {
                    ocultarBotonCargasMas1.style.display = 'none';
                } else {
                    ocultarBotonCargasMas2.style.display = 'none';
                }
                cont = 4;
                final = 8;
            }
        }
    }
    cont = cont + 4;
    final = final + 4;
}
