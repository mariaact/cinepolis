
//---------------- INICIO DE SESION REGISTRO -------------------------

function toggleMostrarContrasena() {
  event.preventDefault();
  var contrasenaInput = document.getElementById("passwordRegistro");
  var toggleButton = document.querySelector(".toggleContrasena");

  if (contrasenaInput.type === "password") {
    contrasenaInput.type = "text";
    toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
    contrasenaInput.style.width = "100%"
  } else {
    contrasenaInput.type = "password";
    toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
  }
}

function toggleMostrarContrasenaLogin() {
  event.preventDefault();
  var contrasenaInput = document.getElementById("password");
  var toggleButton = document.querySelector(".toggleContrasenaLogin");

  if (contrasenaInput.type === "password") {
    contrasenaInput.type = "text";
    toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
  } else {
    contrasenaInput.type = "password";
    toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
  }
}

//------------------ CambiarContraseña -----------------------------
function toggleMostrarContrasenaOlvidad() {
  event.preventDefault();

  var contrasenaInput = document.getElementById("nuevaContrasena");
  var toggleButton = document.querySelector(".toggleContrasenaOlvidada");

  if (contrasenaInput.type === "password") {
    contrasenaInput.type = "text";
    toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
  } else {
    contrasenaInput.type = "password";
    toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
  }
}

function toggleMostrarContrasenaOlvidad1() {
  event.preventDefault();

  var contrasenaInput = document.getElementById("nuevaContrasena1");
  var toggleButton = document.querySelector(".toggleContrasenaOlvidada1");

  if (contrasenaInput.type === "password") {
    contrasenaInput.type = "text";
    toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
  } else {
    contrasenaInput.type = "password";
    toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
  }
}



function reiniciarCampos() {
  document.getElementById("password").value = "";
  document.getElementById("username").value = "";
 // document.getElementById("usernameRegistro").value = "";
  //document.getElementById("emailRegistro").value = "";
 // document.getElementById("passwordRegistro").value = "";

  document.getElementById("emailContrasena").value = "";
  document.getElementById("nuevaContrasena").value = "";
  document.getElementById("nuevaContrasena1").value = "";

}

window.onload = reiniciarCampos;

document.addEventListener('DOMContentLoaded', function () {
  var btnMostrarDiv = document.querySelector('.btn-1');
  var divSobresaliente = document.getElementById('div-sobresaliente');

  btnMostrarDiv.addEventListener('click', function (event) {
    event.preventDefault();
    if (divSobresaliente.style.display === 'block') {
      divSobresaliente.style.display = 'none';
      document.querySelector(".imagen-carrusel").style.opacity = "1";
    } else {
      reiniciarCampos();
      document.querySelector(".imagen-carrusel").style.opacity = "0.1";
      divSobresaliente.style.display = 'block';
    }
  });


  var formulario1 = document.getElementById("div-sobresaliente");
 // var formulario2 = document.getElementById("registro");
  var formulario3 = document.getElementById("cambiarContrasena");
  //var enlace = document.getElementById("enlaceCuenta");
  //var enlace1 = document.getElementById("enlaceCuentaExistente");
  //var cambiarContrasena = document.getElementById("preguntaContrasena");
  var volverInicioSesion = document.getElementById("enlaceCuentaExistente2");


/*
  //----------de iniciar sesion a cambair contrasena -------------------
  cambiarContrasena.addEventListener('click', function (event) {
    event.preventDefault();
    reiniciarCampos();
    formulario1.style.display = "none";
    formulario3.style.display = "block";
  });

  //---------------- de olvidar la contrseña a iniciar sesion --------------
  volverInicioSesion.addEventListener('click', function (event) {
    event.preventDefault();
    reiniciarCampos();
    formulario1.style.display = "block";
    formulario3.style.display = "none";
  });
*/


});


