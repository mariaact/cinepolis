var express = require('express');
var router = express.Router();
var database = require('../consultasDB');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ethers = require('ethers');


/* GET home page. */
router.get('/registro', function (req, res, next) {
  let errores = ''
  res.render('registro', { title: 'Catalago', errores });
});



router.post("/registro", async function (req, res, next) {

  let direccion = '';
  let nombre = req.session.name = req.body.usernameRegistro;
  let pass = req.session.pass = req.body.passwordRegistro;
  let email = req.session.email = req.body.emailRegistro;


  let errores = validarDatos(nombre, pass, email);
  errores = errores[1];
  req.session.errores = errores;
  if (errores[0]) {
    req.session.error = errores[1];
    direccion = 'registro';
  }
  else {
    const usuarioExistente = await database.comprobarnombreUsuario(nombre)
    if(!usuarioExistente){

      // Crea la billetera
      const wallet = ethers.Wallet.createRandom();
      console.log(wallet);

     const resultado = await database.registrarUsuario(nombre, pass, email, wallet);
      if (!resultado){
        direccion = 'registro';
      }else{
        direccion = 'login';
      }
    }else{
      errores += 'El nombre ya existe</br>';
      direccion = 'registro'
    }
  }
  res.render(direccion, {errores});
});


function validarDatos(nombre, pass, email) {
  let error = false;
  let textoError = "";
  var patronCorreo = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
  var patronContrasenna = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  var patronNombre = /^[a-z]+$/; 

  if (nombre.length === 0) {
    console.log('1')
    textoError += "El nombre está vacío</br>";
  }else if(!patronNombre.test(nombre)) {
    console.log('5')
    textoError += "El nombre de usuario no cumple el patrón</br>";
  }
  if (email.length != 0 && !patronCorreo.test(email)) {
    console.log('2')
    textoError += "El formato de correo es incorrecto</br>";
  }
  if (pass.length === 0) {
    console.log('3')
    textoError += "La contraseña está vacía</br>";
  } else if (!patronContrasenna.test(pass)) {
    console.log('4')
    textoError += "La contraseña no cumple el patrón</br>";
  }
  if (textoError != "") {
    console.log()
    error = true;
  }
  console.log('errores   ' + textoError)
  return [error, textoError];
}


module.exports = router;
