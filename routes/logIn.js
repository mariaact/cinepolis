var express = require('express');
var router = express.Router();
const { request } = require('express');
var database = require('../consultasDB');
const { emit } = require('process');
const { error } = require('console');

/* GET home page. */
router.get('/', function (req, res, next) {
  mensaje = '';
  res.render('logIn', { title: 'Catalago', mensaje });
});

router.post('/logIn', async function (req, res, next) {
  let usuario = req.body.username;
  let pwd = req.body.password;
  req.session.user = usuario;

  const usuarioEncontrado = await database.comprobarUsuario(usuario, pwd);
  if(typeof usuarioEncontrado == 'object'){
    res.redirect("/paginaUsuarios");
  }else{
    mensaje = usuarioEncontrado;
    console.log('  -----   ' + mensaje)
    res.render('logIn',  { title: 'Catalago', mensaje })
  }
});

router.post('/logInContra', async function (req, res, next) {
  let usuario = req.body.emailContrasena;
  let contrasenna = req.body.nuevaContrasena;
  let contrasenna1 = req.body.nuevaContrasena1;
  let errores = '';

  console.log(usuario + contrasenna + contrasenna1)

  if(contrasenna == contrasenna1){
    const usuarioEncontrado = await database.comprobarUsuario(usuario, contrasenna);
    if(typeof usuarioEncontrado == 'object'){
      const result = database.cambiarContrasenna(usuario, contrasenna);
      if(typeof result == 'object'){
        res.redirect("/paginaUsuarios");
      }else{
        errores += result;
      }
    }else{
      errores += usuarioEncontrado;
    }
  }else{
    errores += 'Las contraseñas no son las mismas'
  }

  console.log('erroresssss   ' + errores)
  res.render('logIn',  { title: 'Catalago', errores })

 
});



module.exports = router;
