var database = require('./consultasDB');

const stopwords = new Set([
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 
    'de', 'del', 'al', 'a', 'con', 'sin', 'por', 'para', 
    'en', 'sobre', 'y', 'o', 'u', 'que', 'es', 'son', 
    'ser', 'estar', 'esta', 'este', 'estos', 'estas', 
    'lo', 'le', 'les', 'se', 'me', 'mi', 'mis', 'tu', 
    'tus', 'su', 'sus', 'nuestro', 'nuestra', 'nuestros', 
    'nuestras', 'vosotros', 'vosotras', 'ellos', 'ellas', 
    'nosotros', 'nosotras', 'ella', 'él'
]);

const cleanText = (text) => {
    if (!text) return [];
    return text.toLowerCase().match(/\b\w+\b/g).filter(word => !stopwords.has(word));
};

class TFIDF {
    constructor() {
        this.movies = [];
        this.wordDocumentFrequency = new Map();
        this.movieWordFrequency = [];
    }

    train(movies) {
        this.movies = movies;
        this.wordDocumentFrequency.clear();
        this.movieWordFrequency = [];
        const totalMovies = movies.length;

        for (const movie of movies) {
            const words = new Set(cleanText(movie.descripcion));
            const wordFrequency = new Map();
            for (const word of words) {
                wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
                this.wordDocumentFrequency.set(word, (this.wordDocumentFrequency.get(word) || 0) + 1);
            }
            this.movieWordFrequency.push(wordFrequency);
        }

        // Convert frequencies to TF-IDF
        this.movieWordTFIDF = this.movieWordFrequency.map(wordFreq => {
            const tfidf = new Map();
            for (const [word, freq] of wordFreq.entries()) {
                const idf = Math.log(totalMovies / (this.wordDocumentFrequency.get(word) || 1));
                tfidf.set(word, freq * idf);
            }
            return tfidf;
        });
    }

    cosineSimilarity(tfidf1, tfidf2) {
        let dotProduct = 0;
        let norm1 = 0;
        let norm2 = 0;

        for (const [word, tfidfValue] of tfidf1.entries()) {
            dotProduct += tfidfValue * (tfidf2.get(word) || 0);
            norm1 += tfidfValue * tfidfValue;
        }

        for (const tfidfValue of tfidf2.values()) {
            norm2 += tfidfValue * tfidfValue;
        }

        if (norm1 === 0 || norm2 === 0) return 0;

        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }

    findSimilarMovies(movie, k) {
        const movieWords = cleanText(movie.descripcion);
        const wordFrequency = new Map();
        for (const word of movieWords) {
            wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
        }

        const totalMovies = this.movies.length;
        const movieTFIDF = new Map();
        for (const [word, freq] of wordFrequency.entries()) {
            const idf = Math.log(totalMovies / (this.wordDocumentFrequency.get(word) || 1));
            movieTFIDF.set(word, freq * idf);
        }

        const similarities = this.movieWordTFIDF.map((tfidf, index) => {
            const similarity = this.cosineSimilarity(movieTFIDF, tfidf);
            return { movie: this.movies[index], similarity };
        });

        const sortedMovies = similarities.sort((a, b) => b.similarity - a.similarity);
        return sortedMovies.slice(0, k);
    }
}

async function resultado(nombrePelicula) {
    const movies = await database.ObtenerInformacionPeliculasRecomendaciones();
    const classifier = new TFIDF();
    classifier.train(movies);
    const movieToFindSimilar = await database.ObtenerPeliculaDeLasRecomendaciones(nombrePelicula);
    
    const similarMovies = classifier.findSimilarMovies(movieToFindSimilar, 50);

    const similarMoviesInfo = similarMovies.map(similar => ({
        titulo: similar.movie.titulo,
        descripcion: similar.movie.descripcion,
        genero: similar.movie.genero,
        imagen: similar.movie.imagen,
        similitud: similar.similarity
    }));
    return similarMoviesInfo;
}


resultado('Wonka')
  .then(resultado => {
    console.log('Resultado:', resultado);
  })
  .catch(error => {
    console.error('Error al obtener información de películas:', error);
  });




module.exports = { resultado };



