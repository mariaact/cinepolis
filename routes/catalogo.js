var express = require('express');
var router = express.Router();
const { request } = require('express');
var database = require('../consultasDB');
//const { informacionGeneros } = require('../consultasDB');
//const { informacionPeliculas } = require('../consultasDB');

router.get('/catalogo', async function (req, res, next) {

  console.log('Valores de las variables de sesion son:  perfil:  '
    + req.session.perfiles + '  usuario: ' + req.session.usuario)

  const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(req.session.usuario);
  const posicionPerfil = nombrePerfiles.indexOf(req.session.perfiles);


  const peliculasGeneros = await database.peliculasMasVistas();
  const peliculasMasVistasInfantiles = await database.ObtenerPeliculasMasPopularesInfantiles();
  const generos = await database.obtenerTodosLosNombresGeneros();
  const generoPeliculasInfantiles = await database.obtenerGenerosPeliculasInfantiles();

  let html = '';
  let cont = 0;
  let numero = 1;
  let contador = 0;
  let listaGenero = '';
  const usuario = req.session.usuario;
  const perfil = req.session.perfiles;

  if (perfil == 'Kids') {
    for (let i = 0; i < generoPeliculasInfantiles.length; i++) {
      listaGenero += `<input type="checkbox" name="opcion" value="${generos[i]}">
                             <label>${generos[i]}</label><br>`;
    }
  }else{
    for (let i = 0; i < (generos.length -1); i++) {
      listaGenero += `<input type="checkbox" name="opcion" value="${generos[i]}">
                             <label>${generos[i]}</label><br>`;
    }
  }

 

  html += '<h2> Catálogo </h2>  <hr> ';

  if (perfil == 'Kids') {
    for (let i = 0; i <= 3; i++) {

      html += '<section class="movies container"> <div class="box-container-' + numero + '">';

      for (let i = cont; i <= cont + 3; i++) {
        //console.log('numero de pelicula   ' + i)
        html += '<div class="box-' + numero + '"><div class="content"><img class="imagenPelicula" src="https://image.tmdb.org/t/p/original' + peliculasMasVistasInfantiles[i].poster_path + ' " alt=""> ' +
          '<h3>' + peliculasMasVistasInfantiles[i].title + '</h3> <a href="/peliculaDetallada?valor=' + peliculasMasVistasInfantiles[i].title + '"> ver mas </a> </div>   </div>  '
        contador = i;
      }
      html += '</div>  </section>';
      cont = contador + 1;
      numero++;
    }
  } else {
    for (let i = 0; i <= 3; i++) {

      html += '<section class="movies container"> <div class="box-container-' + numero + '">';

      for (let i = cont; i <= cont + 3; i++) {
        //console.log('numero de pelicula   ' + i)
        html += '<div class="box-' + numero + '"><div class="content"><img class="imagenPelicula" src="https://image.tmdb.org/t/p/original' + peliculasGeneros[i].poster_path + ' " alt=""> ' +
          '<h3>' + peliculasGeneros[i].title + '</h3> <a href="/peliculaDetallada?valor=' + peliculasGeneros[i].title + '"> ver mas </a> </div>   </div>  '
        contador = i;
      }
      html += '</div>  </section>';
      cont = contador + 1;
      numero++;
    }

  }

  res.render('catalogo', { html, listaGenero, usuario, perfil, posicionPerfil });

});

let cont = 16;
router.get('/cargarMasPeliculas', async function (req, res, next) {

  const usuario = req.session.usuario;
  const perfil = req.session.perfiles;

  const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(req.session.usuario);
  const posicionPerfil = nombrePerfiles.indexOf(req.session.perfiles);


  const peliculasGeneros = await database.peliculasMasVistas();
  const peliculasMasVistasInfantiles = await database.ObtenerPeliculasMasPopularesInfantiles();

  const generos = await database.obtenerTodosLosNombresGeneros();

  let html = '';

  let numero = 1;
  let contador = 0;
  let listaGenero = '';


  for (let i = 0; i <= generos.length; i++) {
    listaGenero += `<input type="checkbox" name="opcion" value="${generos[i]}">
                           <label>${generos[i]}</label><br>`;
  }

  html += '<h2> Catálogo </h2>  <hr> ';

  if (perfil == 'Kids') {
    for (let i = 0; i <= 3; i++) {

      html += '<section class="movies container"> <div class="box-container-' + numero + '">';

      for (let i = cont; i <= cont + 3; i++) {
        // console.log('numero de pelicula   ' + i)
        html += '<div class="box-' + numero + '"><div class="content"><img class="imagenPelicula" src="https://image.tmdb.org/t/p/original' + peliculasMasVistasInfantiles[i].poster_path + ' " alt=""> ' +
          '<h3>' + peliculasMasVistasInfantiles[i].title + '</h3> <a href="/peliculaDetallada?valor=' + peliculasMasVistasInfantiles[i].title + '"> ver mas </a> </div>   </div>  '
        contador = i;
      }
      html += '</div>  </section>';
      cont = contador + 1;
      numero++;
    }
  } else {
    for (let i = 0; i <= 3; i++) {

      html += '<section class="movies container"> <div class="box-container-' + numero + '">';

      for (let i = cont; i <= cont + 3; i++) {
        // console.log('numero de pelicula   ' + i)
        html += '<div class="box-' + numero + '"><div class="content"><img class="imagenPelicula" src="https://image.tmdb.org/t/p/original' + peliculasGeneros[i].poster_path + ' " alt=""> ' +
          '<h3>' + peliculasGeneros[i].title + '</h3> <a href="/peliculaDetallada?valor=' + peliculasGeneros[i].title + '"> ver mas </a> </div>   </div>  '
        contador = i;
      }
      html += '</div>  </section>';
      cont = contador + 1;
      numero++;
    }
  }


  res.render('catalogo', { html, listaGenero, usuario, perfil, posicionPerfil });

});



router.post('/guardar-filtro', async function (req, res) {
  const usuario = req.session.usuario;
  const perfil = req.session.perfiles;

  const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(req.session.usuario);
  const posicionPerfil = nombrePerfiles.indexOf(req.session.perfiles);

  const generos = await database.obtenerTodosLosNombresGeneros();

  let listaGenero = '';

  for (let i = 0; i <= generos.length; i++) {
    listaGenero += `<input type="checkbox" name="opcion" value="${generos[i]}">
                           <label>${generos[i]}</label><br>`;
  }


  const checkboxesSeleccionados = req.body.opcion;

  const peliculasGeneros = await database.obtenerInfoPeliculasGenero(checkboxesSeleccionados);
  const peliculasInfantilesGeneros = await database.ObtenerPeliculasInfantilesSegunElGenero(checkboxesSeleccionados);


  let html = '';
  let cont = 2;
  let numero = 1;
  let contador = 0;

  html += '<h2>' + checkboxesSeleccionados + '</h2>  <hr>';

  if (perfil == 'Kids') {
    for (let i = 0; i <= 3; i++) {

      html += '<section class="movies container"> <div class="box-container-' + numero + '">';

      for (let i = cont; i <= cont + 3; i++) {
        //console.log('numero de pelicula   ' + i)
        html += '<div class="box-' + numero + '"><div class="content"> <img class="imagenPelicula" src="https://image.tmdb.org/t/p/original' + peliculasInfantilesGeneros[i].poster_path + ' " alt=""> ' +
          '<h3>' + peliculasInfantilesGeneros[i].title + '</h3> <a href="/peliculaDetallada?valor=' + peliculasInfantilesGeneros[i].title + '"> ver mas </a> </div>   </div>   '
        contador = i;


      }
      html += '</div>  </section>';
      cont = contador + 1;
      numero++;
    }
  } else {
    for (let i = 0; i <= 3; i++) {

      html += '<section class="movies container"> <div class="box-container-' + numero + '">';

      for (let i = cont; i <= cont + 3; i++) {
        //console.log('numero de pelicula   ' + i)
        html += '<div class="box-' + numero + '"><div class="content"> <img class="imagenPelicula" src="https://image.tmdb.org/t/p/original' + peliculasGeneros[i].poster_path + ' " alt=""> ' +
          '<h3>' + peliculasGeneros[i].title + '</h3> <a href="/peliculaDetallada?valor=' + peliculasGeneros[i].title + '"> ver mas </a> </div>   </div>   '
        contador = i;


      }
      html += '</div>  </section>';
      cont = contador + 1;
      numero++;
    }
  }

  res.render('catalogo', { html, listaGenero, usuario, perfil, posicionPerfil });
});


module.exports = router;

