const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
//const { ObtenerTituloGeneroDescripcionDeTodasPeliculas } = require('./consultasDB');

const dbURI = "mongodb+srv://admin:admin@cluster.6q36mls.mongodb.net/TFG?retryWrites=true&w=majority&appName=Cluster"
const apiKey = '7550c4f2e2a2e5f83baa7235c0426643';
const dbName = 'Series';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión establecida correctamente con MongoDB Atlas');

  // Llamar funciones o realizar operaciones aquí después de conectar
  //guardarGenerosBaseDeDatos();
  //guardarPeliculasBaseDeDatos();

  // Llamar a la función para obtener las fechas de lanzamiento y certificaciones de la película
  //getMovieCertifications();

  //actualizarInfoPeliculas();
  //resultadoTituloGeneroDescripcionDeTodasPeliculas();


}).catch((error) => {
  console.log('Error al conectar a MongoDB Atlas:', error);
});




  // Definir el esquema y modelo con Mongoose
const collectionNameSchema = new mongoose.Schema({
  id: Number,
  name: String,
});
const Generos = mongoose.model('Generos', collectionNameSchema);

const peliculasSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  genre_ids: [Number],
  id: { type: Number, required: true },
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: { type: String, required: true },
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  certificacion: String,
  reparto: [String], 
  duracion: String  
});

const Pelicula = mongoose.model('Peliculas', peliculasSchema);


const recomendacionesSchema = new mongoose.Schema({
  descripcion: String,
  genero: [String],
  imagen: String,
  titulo: String
});
const Recomendaciones = mongoose.model('Recomendaciones', recomendacionesSchema);


// Función para verificar y eliminar una colección en MongoDB
async function verificarYEliminarColeccion(nombreColeccion) {
  try {
    const db = mongoose.connection.db;
    const colecciones = await db.listCollections().toArray();
    const existeColeccion = colecciones.some(c => c.name === nombreColeccion);

    if (existeColeccion) {
      await db.collection(nombreColeccion).drop();
      console.log(`La colección ${nombreColeccion} ha sido eliminada`);
    } else {
      console.log(`La colección ${nombreColeccion} no existe`);
    }
  } catch (error) {
    console.log('Error al verificar y eliminar la colección:', error);
  }
}

// Función para guardar géneros en la base de datos
async function guardarGenerosBaseDeDatos() {
  try {
   // await verificarYEliminarColeccion('Generos');

    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error al obtener datos de la API');
    }

    const data = await response.json();
    const generosInfo = data.genres;

    const uniqueGenerosInfo = generosInfo.filter((valor, indice, self) =>
      self.findIndex(v => v.id === valor.id) === indice
    );

    const resultado = await Generos.insertMany(uniqueGenerosInfo, { ordered: false });

    console.log('Datos añadidos correctamente a la colección');
  } catch (error) {
    console.log('Error al agregar datos a la colección:', error);
  } finally {
    // Cerrar la conexión de mongoose al finalizar
    // mongoose.connection.close();
  }
}


async function obtenerTodasLasPeliculas() {
  let pagina = 1;
  let todasLasPeliculas = [];

  try {
    while (true) {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=7550c4f2e2a2e5f83baa7235c0426643&language=es&page=${pagina}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error al realizar la solicitud a la API');
      }

      const data = await response.json();
      const peliculas = data.results;

      todasLasPeliculas = todasLasPeliculas.concat(peliculas);

      if (pagina >= 500) {
        break;
      }

      pagina++;
    }

    console.log('Todas las películas obtenidas:', todasLasPeliculas.length);
    return todasLasPeliculas;
  } catch (error) {
    console.error('Error al obtener todas las películas:', error);
    return null;
  }
}

// Llamar a la función para obtener todas las películas
//obtenerTodasLasPeliculas();


async function guardarPeliculasBaseDeDatos() {
  try {
    await verificarYEliminarColeccion('Peliculas');

    const peliculas = await obtenerTodasLasPeliculas();

    for (const pelicula of peliculas) {
      const existente = await Pelicula.exists({ title: pelicula.title });

      if (!existente) {
        await Pelicula.create(pelicula);
        // console.log(`Película "${pelicula.title}" añadida correctamente`);
      } else {
        //console.log(`La película "${pelicula.title}" ya existe en la base de datos. No se insertará nuevamente.`);
      }
    }
    console.log('Proceso de inserción completado');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al agregar datos a la colección:', error);
    //  mongoose.connection.close();
  }
}

//const movieId = '39514';
//const releaseDatesUrl = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${apiKey}`;

async function getMovieCertifications() {
  try {
    let cont = 0
    const peliculas = await obtenerTodasLasPeliculas();
    console.log(`Número de películas: ${peliculas.length}`);

    const countryCodeForSpain = 'ES'; // Código ISO-3166-1 para España

    for (let pelicula of peliculas) {
      cont ++;
      //console.log(`Obteniendo detalles para la película con ID: ${pelicula.id}`);

      const response = await fetch(`https://api.themoviedb.org/3/movie/${pelicula.id}/release_dates?api_key=${apiKey}`);
      const releaseDatesData = await response.json();

      // Buscar la certificación para España
      let certificationForSpain = null;
      if (releaseDatesData.results) {
        const countryReleaseDates = releaseDatesData.results.find(countryInfo => countryInfo.iso_3166_1 === countryCodeForSpain);
        if (countryReleaseDates) {
          const releaseDates = countryReleaseDates.release_dates;
          if (releaseDates.length > 0) {
            certificationForSpain = releaseDates[0].certification;
          }
        }
      }
      
      if (certificationForSpain) {
        console.log(`Certificación para la película con ID ${pelicula.id}: ${certificationForSpain}`);

        await Pelicula.updateOne(
          { id: pelicula.id },
          { $set: { certificacion: certificationForSpain } },
          { new: true }  // Devolver el documento actualizado
        );

        console.log(`Información de la película ${pelicula.id} actualizada.`);
        console.log(cont)
      } else {
        console.log(`No se encontró certificación para la película con ID ${pelicula.id}.`);
      }
    }
  } catch (error) {
    console.error('Error al obtener las certificaciones de las películas:', error);
  } finally {
      //mongoose.connection.close();
  }
}


const axios = require('axios');

async function obtenerInfoPelicula(movieId) {
  try {
    const url = `https://api.themoviedb.org/3/movie/550?api_key=7550c4f2e2a2e5f83baa7235c0426643&language=en-US&append_to_response=credits`;
    const response = await axios.get(url);
    const { data } = response;

    // Extraer los datos relevantes
    const reparto = data.credits.cast.map(actor => actor.name);
    const duracion = data.runtime;

    return { reparto, duracion };
  } catch (error) {
    console.error(`Error al obtener información de la película ${movieId} desde TMDb:`, error);
    throw error;
  }
}

async function actualizarInfoPeliculas() {

  try {

    //const collection = db.collection('peliculas');

    //const peliculas = await collection.find().toArray();
    const peliculas = await Pelicula.find().exec();

    for (const pelicula of peliculas) {
      const { _id: movieId } = pelicula;

      const { reparto, duracion } = await obtenerInfoPelicula(movieId);

      await Pelicula.updateOne(
        { _id: movieId },
        { $set: { reparto, duracion } },
        { new: true}
      );

      console.log(`Información de la película ${movieId} actualizada correctamente.`);
    }

    console.log('Todas las películas han sido actualizadas correctamente.');
  } catch (error) {
    console.error('Error al actualizar la información de las películas en MongoDB:', error);
  } finally {
    mongoose.connection.close();
  }
}




async function resultadoTituloGeneroDescripcionDeTodasPeliculas() {
  try {
   // const collectionRecomendaciones = db.collection('recomendaciones');

    const result = await ObtenerTituloGeneroDescripcionDeTodasPeliculas();
    console.log(result)
    await Recomendaciones.deleteMany({});

    await Recomendaciones.insertMany(result);
  } catch (error) {
    console.error('Error al actualizar la información de las recomendaciones en MongoDB:', error);
  } finally {
    mongoose.connection.close();
  }
}
/*
async function obtenerTodosLosGeneros() {
  //const collection = db.collection('generos');
  const generos = await Generos.find().exec();
  return generos;
}*/

async function ObtenerTituloGeneroDescripcionDeTodasPeliculas() {
  // const collection = db.collection('peliculas');
   const todasLasPeliculas = await Pelicula.find().exec();
   const todosLosGeneros = await obtenerTodosLosGeneros();
   const mapaIDNombreGeneros = new Map();
   todosLosGeneros.forEach(genero => {
     mapaIDNombreGeneros.set(genero.id, genero.name);
   });
 
   const transformacion = todasLasPeliculas.map(async (pelicula) => {
     const nombreGenero = pelicula.genre_ids.map(id => mapaIDNombreGeneros.get(id)).join(', ');
     return {
       titulo: pelicula.title,
       genero: nombreGenero,
       descripcion: pelicula.overview,
       imagen: pelicula.poster_path
     };
   });
   return Promise.all(transformacion);
 }




/*
async function ejecutarMetodosIndependientes() {
  console.log('Iniciando Método 1');
  const guardarPeliculasPromise = resultadoTituloGeneroDescripcionDeTodasPeliculas(); // Ejecutar guardarPeliculasBaseDeDatos sin esperar
  await guardarPeliculasPromise; // Esperar a que se resuelva la promesa de guardarPeliculasBaseDeDatos
  console.log('Iniciando Método 1');
/* const guardarPeliculasPromise1 = guardarGenerosBaseDeDatos(); // Ejecutar guardarPeliculasBaseDeDatos sin esperar
 await guardarPeliculasPromise1; // Esperar a que se resuelva la promesa de guardarPeliculasBaseDeDatos
 console.log('TERMINADA LA CARGA')
}*/

//ejecutarMetodosIndependientes();


