// Biblioteca de análisis de sentimientos en español
const natural = require('natural');
const tokenizer = new natural.SentenceTokenizer();
var database = require('./consultasDB');

function obtenerPuntaje(valoracion) {
    switch (valoracion) {
        case 'excelente':
            return 5;
        case 'buena':
            return 4;
        case 'regular':
            return 3;
        case 'mala':
            return 2;
        default:
            return 1; // Valoración no especificada o incorrecta
    }
}

function obtenerPuntajeComentario(sentimiento) {
    switch (sentimiento) {
        case 'positivo':
            return 3;
        case 'neutral':
            return 2;
        case 'negativo':
            return 1;
        default:
            return 1; // Sentimiento no especificado o incorrecto
    }
}

//Analisis de Sentimiento
// Función para analizar los comentarios 
function analizarSentimientos(comentario) {
    if (comentario && typeof comentario === 'string') {
        if (comentario.includes('genial') || comentario.includes('excelente')) {
            return 'positivo';
        } else if (comentario.includes('regular') || comentario.includes('normal')) {
            return 'neutral';
        } else {
            return 'negativo';
        }
    } else {
        return 'desconocido'; 
    }
}

function calcularSimilitud(usuario, pelicula, perfil) {
    if (!perfil || !perfil[usuario]) {
      //  console.error(`El perfil del usuario ${usuario} no está disponible o no contiene información.`);
        return Number.MAX_VALUE;
    }
    const valoracionUsuario = perfil[usuario].find(item => item.pelicula === pelicula.titulo);
    if (!valoracionUsuario) {
        return 0; // No hay valoración del usuario para esta película
    }
    const puntajeValoracion = obtenerPuntaje(valoracionUsuario.valoracion);
    const similitud = Math.abs(puntajeValoracion - obtenerPuntaje(pelicula.valoracion)) +
        Math.abs(puntajeValoracion - obtenerPuntajeComentario(analizarSentimientos(valoracionUsuario.comentario)));
    return similitud;
}

function recomendarPeliculasSegunGustos(usuario, perfilUsuario, catalogoPeliculas) {
    if (!perfilUsuario || !perfilUsuario.perfil) {
        throw new Error(`El perfil del usuario ${usuario} no está disponible o no tiene la propiedad 'perfil'.`);
    }
    const perfil = perfilUsuario.perfil; 
    const peliculasConSimilitud = catalogoPeliculas.map(pelicula => {
        const similitud = calcularSimilitud(usuario, pelicula, perfil);
        return { pelicula, similitud };
    });
    peliculasConSimilitud.sort((a, b) => a.similitud - b.similitud);

    return peliculasConSimilitud.slice(0, 50).map(item => item.pelicula);
}


//--------------------------------------------------------------------------------------


async function analizarSentimientosValoracionesComentarios() {
    const todasLasPeliculas = await database.ObtenerTituloGeneroDescripcionDeTodasPeliculas();
    const todasLasValoraciones = await database.todasLasValoraciones();

    const peliculasMap = new Map();
    todasLasPeliculas.forEach(pelicula => {
        peliculasMap.set(pelicula.titulo,{
            titulo: pelicula.titulo,
            genero: pelicula.genero, // Supongo que también tienes los IDs de géneros aquí
            descripcion: pelicula.descripcion,
            imagen: pelicula.imagen,
            valoraciones: []
        });
    });

    todasLasValoraciones.forEach(valoracion => {
        if (peliculasMap.has(valoracion.pelicula)) {
            peliculasMap.get(valoracion.pelicula).valoraciones.push({
                valoracion: valoracion.valoracion,
                comentario: valoracion.comentario
            });
        }
    })
    return Array.from(peliculasMap.values());
}

function calcularPuntajeTotal(pelicula) {
    let puntajeTotal = 0;
    pelicula.valoraciones.forEach(valoracion => {
        const puntajeValoracion = obtenerPuntaje(valoracion.valoracion);
        const sentimiento = analizarSentimientos(valoracion.comentario);
        const puntajeComentario = obtenerPuntajeComentario(sentimiento);
        puntajeTotal += puntajeValoracion + puntajeComentario;
    });
    return puntajeTotal;
}

// Función para recomendar las 10 mejores películas a nivel global
async function recomendarTop10Peliculas() {
    const peliculas = await analizarSentimientosValoracionesComentarios();

    // Calcular el puntaje total para cada película
    peliculas.forEach(pelicula => {
        pelicula.puntajeTotal = calcularPuntajeTotal(pelicula);
    });

    // Ordenar las películas por puntaje total de mayor a menor
    peliculas.sort((a, b) => b.puntajeTotal - a.puntajeTotal);

    // Devolver las 10 mejores películas
    return peliculas.slice(0, 10);
}

let recomendaciones = []
async function principal(usuario, perfil) {
    const catalogoPeliculas = await database.ObtenerTituloGeneroDescripcionDeTodasPeliculas();
    console.log(usuario + perfil + ' ----')
    console.log(perfil !== undefined && usuario !== undefined)
    if(perfil !== undefined && usuario !== undefined){
        const perfilUsuario = await database.analisisSentimiento(usuario, perfil);
        recomendaciones = recomendarPeliculasSegunGustos(usuario, perfilUsuario, catalogoPeliculas);
        console.log('Recomendaciones de películas para', usuario + ':', recomendaciones);
        
    }else{
        recomendaciones = []
    }
   
    return recomendaciones;
}

async function principalTop10() {
    const top10Peliculas = await recomendarTop10Peliculas();
    //console.log('Top 10 películas:', top10Peliculas);
    return top10Peliculas;
}

//principalTop10();

//principal('maria', 'maria')

module.exports = { principal, principalTop10 };



