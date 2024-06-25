var express = require('express');
var router = express.Router();
var database = require('../consultasDB');
var algoritmoNaiveBayes = require('../algoritmoNaiveBayes');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const { use } = require('./catalogo');


const dbURI = 'mongodb://127.0.0.1:27017/Series';
const dbName = 'Series'
const client = new MongoClient(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = client.db(dbName);

router.get('/peliculaDetallada', async function (req, res, next) {

  const nombrePelicula = req.query.valor;
  const perfil = req.session.perfiles
  const user = req.session.usuario
  console.log('*////////*///////   ' + nombrePelicula  + '----' +perfil+ '-----' + user)

  const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(user);
  const posicionPerfil = nombrePerfiles.indexOf(perfil);
  const peliculaDetalles = await database.peliculaDetalles(nombrePelicula);
  const titulo = peliculaDetalles.title;
  const fechaLanzamiento = new Date(peliculaDetalles.release_date).getFullYear();
  const review = peliculaDetalles.overview;
  const foto = peliculaDetalles.backdrop_path;
  const duracion = peliculaDetalles.duracion;
  const reparto = peliculaDetalles.reparto.slice(0, 10);;
  const imageUrl = 'https://image.tmdb.org/t/p/original' + foto;
  const generos = await database.obtenerNombreGenero(peliculaDetalles.genre_ids);
  const pelicula = titulo;
  const comprobarPeliculaLista = await database.comprobarPeliculaLista(user, perfil, titulo);

  const recomendaciones = await algoritmoNaiveBayes.resultado(nombrePelicula);
  let html = '';
  console.log('Perdil dentro dde peli detalles    '+ perfil)

  for (var i = 1; i <= 5; i++) {
    html += '<div class="box-1"> <div class="content"> <img src="https://image.tmdb.org/t/p/original' + recomendaciones[i].imagen + '" alt=""> <h3>' + recomendaciones[i].titulo + '</h3><a href="/peliculaDetallada?valor=' + recomendaciones[i].titulo + '"> ver mas </a> </div>   </div>  '
  }
  const cargarMas = '<div class="load-more"  class="btn-1" id="cargarPeliculas"> <a href="/cargarMasPeliculasSimilares?valor=' + nombrePelicula + '"> ver mas </a> </div>';

  res.render('peliculaDetallada', { titulo, fechaLanzamiento, duracion, review, imageUrl, reparto, generos, pelicula, user, comprobarPeliculaLista, perfil, posicionPerfil, html, cargarMas });
});


router.post('/enviar-datos', async (req, res) => {
  const nombreUsuario = req.body.Usuario;
  const pelicula = req.body.Pelicula;
  const perfil = req.body.Perfil;
  const peliculaDetalles = await database.peliculaDetalles(req.body.Pelicula);
  const fechaLanzamiento = new Date(peliculaDetalles.release_date).getFullYear();
  const review = peliculaDetalles.overview;
  const foto = peliculaDetalles.backdrop_path;
  const duracion = peliculaDetalles.duracion;
  const reparto = peliculaDetalles.reparto.slice(0, 10);;
  const imageUrl = 'https://image.tmdb.org/t/p/original' + foto;
  const generos = await database.obtenerNombreGenero(peliculaDetalles.genre_ids);
  const comprobarPeliculaLista = await database.comprobarPeliculaLista(nombreUsuario, perfil, pelicula);
  
  console.log('*////////*///////   '   + '----' +perfil+ '-----' + nombreUsuario)

  try {
    if (req.body.Corazon === false) {
      console.log('estoy es enviar-datooosss   if')
      const usuario = await database.comprobarExistenciausuario(nombreUsuario);
      console.log(usuario)
      console.log(comprobarPeliculaLista)
      if (usuario && comprobarPeliculaLista) {
        console.log('dentro del if grande')
        const result = await database.eliminarPeliculaListaPerfil(nombreUsuario, perfil, pelicula)
        console.log(result)
        console.log('ha entrado en eliminar')
        /*if (result.modifiedCount === 1) {
          res.status(200).json({ message: 'Película borrada correctamente' });
        } else {
          res.status(404).json({ message: 'Película no encontrada en el array' });
        }*/
      } else {
        res.status(404).json({ message: 'Usuario no encontrado o película no presente en el array' });
      }

    } else {
      console.log('estoy es enviar-datooosss   else')
      console.log(nombreUsuario)
      const usuario = await database.comprobarExistenciausuario(nombreUsuario);
      console.log(usuario)
      if (usuario) {
        console.log('demtro if usuario')
        const result = await database.agregarPeliculaListaPerfil(nombreUsuario, perfil, pelicula)
        /* if (result.modifiedCount === 1) {
           res.status(200).json({ message: 'Película borrada correctamente' });
         } else {
           res.status(404).json({ message: 'Película no encontrada en el array' });
         }
       } else {
         res.status(404).json({ message: 'Usuario no encontrado o película no presente en el array' });
       */ }
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
  //res.render('peliculaDetalles', { pelicula, fechaLanzamiento, duracion, review, imageUrl, reparto, generos, pelicula, user, comprobarPeliculaLista, perfil });

});

let numero = 5;
let contador = 5;
router.get('/cargarMasPeliculasSimilares', async function (req, res, next) {

  const usuario = req.session.usuario;
  const perfil = req.session.perfiles;
  const nombrePelicula = req.query.valor;

  const user = req.session.usuario
  const peliculaDetalles = await database.peliculaDetalles(nombrePelicula);
  const titulo = peliculaDetalles.title;
  const fechaLanzamiento = new Date(peliculaDetalles.release_date).getFullYear();
  const review = peliculaDetalles.overview;
  const foto = peliculaDetalles.backdrop_path;
  const duracion = peliculaDetalles.duracion;
  const reparto = peliculaDetalles.reparto.slice(0, 10);;
  const imageUrl = 'https://image.tmdb.org/t/p/original' + foto;
  const generos = await database.obtenerNombreGenero(peliculaDetalles.genre_ids);
  const pelicula = titulo;
  const comprobarPeliculaLista = await database.comprobarPeliculaLista(user, perfil, titulo);

  const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(req.session.usuario);
  const posicionPerfil = nombrePerfiles.indexOf(req.session.perfiles);
  const recomendaciones = await algoritmoNaiveBayes.resultado(nombrePelicula);

  let html = '';
  let listaGenero = '';


  if (perfil == 'Kids') {
    numero = contador + 1;
    contador = contador + 5;
    if (contador <= 45) {
      for (var i = numero; i <= contador; i++) {
        html += '<div class="box-1"> <div class="content"> <img src="https://image.tmdb.org/t/p/original' + recomendaciones[i].imagen + '" alt=""> <h3>' + recomendaciones[i].titulo + '</h3> <a href="/peliculaDetallada?valor=' + recomendaciones[i].titulo + '"> ver mas </a> </div> </div>'
      }
    }
  } else {
    numero = contador + 1;
    contador = contador + 5;
    if (contador <= 45) {
      for (var i = numero; i <= contador; i++) {
          html += '<div class="box-1"> <div class="content"> <img src="https://image.tmdb.org/t/p/original' + recomendaciones[i].imagen + '" alt=""> <h3>' + recomendaciones[i].titulo + '</h3> <a href="/peliculaDetallada?valor=' + recomendaciones[i].titulo + '"> ver mas </a> </div> </div>'
      }
    }
  }
  let cargarMas = '';

  if (contador < 45) {
    cargarMas = '<div class="load-more"  class="btn-1" id="cargarPeliculas"> <a href="/cargarMasPeliculasSimilares?valor=' + nombrePelicula + '"> ver mas </a> </div>';
  } else {
    cargarMas = '<div class="load-more"  class="btn-1" id="cargarPeliculas" style="display:none"> <a href="/cargarMasPeliculasSimilares?valor=' + nombrePelicula + '"> ver mas </a> </div>';
  }

  res.render('peliculaDetallada', { nombrePelicula, fechaLanzamiento, duracion, review, imageUrl, reparto, generos, pelicula, user, comprobarPeliculaLista, perfil, posicionPerfil, html, cargarMas });

});

router.get('/guardarValoraciones', async function (req, res, next) {

  const usuario = req.session.usuario;
  const perfil = req.session.perfiles;
  const nombrePelicula = req.query.titulo;
  const valoracion  = req.query.valoracion;

  const user = req.session.usuario
  const peliculaDetalles = await database.peliculaDetalles(nombrePelicula);
  const titulo = peliculaDetalles.title;
  const fechaLanzamiento = new Date(peliculaDetalles.release_date).getFullYear();
  const review = peliculaDetalles.overview;
  const foto = peliculaDetalles.backdrop_path;
  const duracion = peliculaDetalles.duracion;
  const reparto = peliculaDetalles.reparto.slice(0, 10);;
  const imageUrl = 'https://image.tmdb.org/t/p/original' + foto;
  const generos = await database.obtenerNombreGenero(peliculaDetalles.genre_ids);
  const pelicula = titulo;
  const comprobarPeliculaLista = await database.comprobarPeliculaLista(user, perfil, titulo);

  const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(req.session.usuario);
  const posicionPerfil = nombrePerfiles.indexOf(req.session.perfiles);

  console.log('Valoracion ----   '+ nombrePelicula+ valoracion+ usuario+ perfil + valoracion + '  -----*  '+ nombrePelicula);
  

  //pelicula, valoracion, comentario, usuario, perfil
  await database.añadirNuevaValoracion(nombrePelicula, valoracion, usuario, perfil);

  //res.render('peliculaDetallada', { nombrePelicula, fechaLanzamiento, duracion, review, imageUrl, reparto, generos, pelicula, user, comprobarPeliculaLista, perfil, posicionPerfil, html, cargarMas });

  res.redirect('/peliculaDetallada?valor=' + nombrePelicula)
});

module.exports = router;
