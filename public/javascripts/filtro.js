var contadorOcultarDiv = 0;

function ocultarDiv() {
    var div = document.getElementById("formularioCheckboxes");
    div.style.display = "none";
    
  }

  function mostrarDiv() {
    var div = document.getElementById("formularioCheckboxes");
    div.style.display = "block";
    contadorOcultarDiv++;
    console.log(ocultarDiv)
    if (contadorOcultarDiv % 2 === 0) {
      cancelar();
    }
}

function cancelar() {
  var div = document.getElementById("formularioCheckboxes");
  div.style.display = "none";
}