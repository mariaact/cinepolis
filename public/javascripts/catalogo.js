function toggleHeart(button) {
  button.querySelector('.heart-icon').classList.toggle('active');
}

//---------------- INICIO DE SESION REGISTRO -------------------------

function toggleMostrarContrasena() {
  event.preventDefault();
  var contrasenaInput = document.getElementById("passwordRegistro");
  var toggleButton = document.querySelector(".toggleContrasena");

  if (contrasenaInput.type === "password") {
    contrasenaInput.type = "text";
    toggleButton.innerHTML = '<i class="fas fa-eye"></i>'; // Cambiar a ojo abierto
    contrasenaInput.style.width = "100%"
  } else {
    contrasenaInput.type = "password";
    toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>'; // Mantener ojo cerrado
  }
}

function toggleMostrarContrasenaLogin() {
  event.preventDefault();
  var contrasenaInput = document.getElementById("password");
  var toggleButton = document.querySelector(".toggleContrasenaLogin");

  if (contrasenaInput.type === "password") {
    contrasenaInput.type = "text";
    toggleButton.innerHTML = '<i class="fas fa-eye"></i>'; // Cambiar a ojo abierto
  } else {
    contrasenaInput.type = "password";
    toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>'; // Mantener ojo cerrado
  }
}

//------------------ CambiarContraseña -----------------------------
function toggleMostrarContrasenaOlvidad() {
  event.preventDefault();

  var contrasenaInput = document.getElementById("nuevaContrasena");
  var toggleButton = document.querySelector(".toggleContrasenaOlvidada");

  if (contrasenaInput.type === "password") {
    contrasenaInput.type = "text";
    toggleButton.innerHTML = '<i class="fas fa-eye"></i>'; // Cambiar a ojo abierto
  } else {
    contrasenaInput.type = "password";
    toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>'; // Mantener ojo cerrado
  }
}

function toggleMostrarContrasenaOlvidad1() {
  event.preventDefault();

  var contrasenaInput = document.getElementById("nuevaContrasena1");
  var toggleButton = document.querySelector(".toggleContrasenaOlvidada1");

  if (contrasenaInput.type === "password") {
    contrasenaInput.type = "text";
    toggleButton.innerHTML = '<i class="fas fa-eye"></i>'; // Cambiar a ojo abierto
  } else {
    contrasenaInput.type = "password";
    toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>'; // Mantener ojo cerrado
  }
}


//-----------------------------------------------------------------------

/*function reiniciarCampos() {
  document.getElementById("password").value = "";
  document.getElementById("username").value = "";
  document.getElementById("usernameRegistro").value = "";
  document.getElementById("emailRegistro").value = "";
  document.getElementById("passwordRegistro").value = "";

  document.getElementById("emailContrasena").value = "";
  document.getElementById("nuevaContrasena").value = "";
  document.getElementById("nuevaContrasena1").value = "";
}

window.onload = reiniciarCampos;*/

document.addEventListener('DOMContentLoaded', function () {
 // var btnMostrarDiv = document.querySelector('.btn-1');
  var divSobresaliente = document.getElementById('div-sobresaliente');

  // Función para alternar la visibilidad del div sobresaliente al hacer clic en el botón
 /* btnMostrarDiv.addEventListener('click', function (event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    var titulo = document.getElementById("titulo");
    if (divSobresaliente.style.display === 'block') {
      divSobresaliente.style.display = 'none'; // Si está visible, ocultarlo
      titulo.style.display = "block";
    } else {
      divSobresaliente.style.display = 'block'; // Si está oculto, mostrarlo
      titulo.style.display = "none";
    }
  });
*/
  



  var formulario1 = document.getElementById("div-sobresaliente");
  var formulario2 = document.getElementById("registro");
  var formulario3 = document.getElementById("cambiarContrasena");
  //var enlace = document.getElementById("enlaceCuenta");
  //var enlace1 = document.getElementById("enlaceCuentaExistente");
  //var cambiarContrasena = document.getElementById("preguntaContrasena");
 // var volverInicioSesion = document.getElementById("enlaceCuentaExistente2");


  //------------------ Cambia de iniciar sesion a registrarse---------------
  /*enlace.addEventListener('click', function (event) {
    event.preventDefault();
    formulario1.style.display = "none";
    formulario2.style.display = "block";
  });
*/
  //------------------de registrase a iniciar sesion--------------------
 /* enlace1.addEventListener('click', function (event) {
    event.preventDefault();
    formulario1.style.display = "block";
    formulario2.style.display = "none";
  });
*/
  //----------de iniciar sesion a cambair contrasena -------------------
 /* cambiarContrasena.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('kkkdkkdkd')
    formulario1.style.display = "none";
    formulario3.style.display = "block";
  });
*/
  //---------------- de olvidar la contrseña a iniciar sesion --------------
  /*volverInicioSesion.addEventListener('click', function (event) {
    event.preventDefault();
    formulario1.style.display = "block";
    formulario3.style.display = "none";
  });*/
});


