
class PreProcesador{
    constructor(){
        this.vocab = new Set();
    }

    tokenize(texto) {
        return texto.toLowerCase().split(/\W+/).filter(Boolean);
    }

   /* transformarForma(descripcion){
        const vectores = descripcion.map(descripcion =>{
            const tokens = this.tokenize(descripcion);
            tokens.forEach(token => this.vocab.add(token));
            return tokens;       
        });
    
        this.vocab = Array.from(this.vocab);
        return vectores.map(tokens => this.transformarForma(tokens));
    }*/
    transformarForma(descripciones) {
        descripciones.forEach(descripcion => {
            const tokens = this.tokenize(descripcion);
            tokens.forEach(token => this.vocab.add(token));
        });
    
        const vectores = descripciones.map(descripcion => this.transformar(this.tokenize(descripcion)));
    
        return vectores;
    }

   /* transformar(tokens) {
        const vector = new Array(this.vocab.length).fill(0);
        tokens.forEach(token =>{
            const indice = this.vocab.indexOf(token);
            if(indice !== -1){
                vector[indice]++;
            }
        });
        return vector;
    }*/
    transformar(tokens) {
        const vector = new Array(this.vocab.size).fill(0);
        tokens.forEach(token => {
            if (this.vocab.has(token)) {
                const indice = Array.from(this.vocab).indexOf(token);
                vector[indice]++;
            }
        });
        return vector;
    }
    
}


module.exports = PreProcesador;