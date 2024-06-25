var express = require('express');
var router = express.Router();
const { request } = require('express');
var database = require('../consultasDB');
const session = require('express-session');




router.get('/lista', async function (req, res, next) {

    console.log('Valores de las variables de sesion son:  perfil:  ' 
    + req.session.perfiles + '  usuario: '+ req.session.usuario)

    const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(req.session.usuario);
  const posicionPerfil = nombrePerfiles.indexOf(req.session.perfiles);


    console.log('estoy en cargasr lsita del archivo lista')


    const perfil = req.session.perfiles;
    const usuario = req.session.usuario;
        console.log('listaaa: ' + perfil + usuario)
    

    const listaPeliculas = await database.listaPeliculasUsuario(usuario, perfil);
    

    console.log(listaPeliculas)

    let html = '';
    let cont = 0;
    let numero = 1;
    let contador = 0;
    let listaGenero = '';
    let contPelis = 0;

    html += '<h2> Lista </h2>  <hr> ';

    if(typeof listaPeliculas === 'undefined' || !listaPeliculas || listaPeliculas.length == 0){

        html = '<div class="divListaVacia"><h1 class="mensajeListaVacia">No tiene ninguna pelicula en su lista</h1></div>'
    }else{

        const pelis = Object.values(listaPeliculas);

        if (listaPeliculas.length <= 3) {
            console.log('fgjfklgdjnj')
            html += '<section class="movies container"> <div class="box-container-' + numero + '">';
    
            for (let i = cont; i < listaPeliculas.length; i++) {
                const peliculaDetalles = await database.peliculaDetalles(pelis[i])
    
                //console.log('numero de pelicula   ' + i + peliculaDetalles.title)
                html += '<div class="box-' + numero + '"><div class="content"><img class="imagenPelicula" src="https://image.tmdb.org/t/p/original' + peliculaDetalles.poster_path + ' " alt=""> ' +
                    '<h3>' + peliculaDetalles.title + '</h3> <a href="/peliculaDetallada?valor=' + peliculaDetalles.title + '"> ver mas </a> </div>   </div>  '
            }
            html += '</div>  </section>';
        } else {
            console.log('elseee')
    
            for (let i = 0; i <= 3; i++) {
    
                html += '<section class="movies container"> <div class="box-container-' + numero + '">';
    
                for (let i = cont; i <= cont + 3; i++) {
                    if (contPelis < pelis.length) {
                        const peliculaDetalles = await database.peliculaDetalles(pelis[contPelis])
                        html += '<div class="box-' + numero + '"><div class="content"><img class="imagenPelicula" src="https://image.tmdb.org/t/p/original' + peliculaDetalles.poster_path + ' " alt=""> ' +
                            '<h3>' + peliculaDetalles.title + '</h3> <a href="/peliculaDetallada?valor=' + peliculaDetalles.title + '"> ver mas </a> </div>   </div>  '
                        contador = i;
                        contPelis++;
                    }
                }
                html += '</div>  </section>';
                numero++;
            }
            cont = contador + 1;
            console.log(html)
        }

    }

    
    console.log(html)
    res.render('lista', { html, perfil, usuario, posicionPerfil});

});

module.exports = router;





