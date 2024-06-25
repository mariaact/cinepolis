var express = require('express');
var router = express.Router();
var database = require('../consultasDB');
const { error } = require('console');


/* GET home page. */
router.get('/modificarUsuario', function (req, res, next) {
  let errores = '';
  res.render('modificarUsuario', {  errores });
});


router.post('/modificarUsuario', async function (req, res, next) {
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
    errores += 'Las contraseñas no son las mismas</br>'
  }

  console.log('erroresssss   ' + errores)
  res.render('modificarUsuario',  {  errores })

 
});



module.exports = router;
