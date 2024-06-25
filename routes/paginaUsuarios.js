var express = require('express');
var router = express.Router();
var database = require('../consultasDB');
const { CommandStartedEvent } = require('mongodb');



router.get('/paginaUsuarios', async function (req, res, next) {

    const user = req.session.user
    const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(user);
    console.log('---------------------------------------------')
    console.log(nombrePerfiles.length)
    console.log(nombrePerfiles)
    console.log(nombrePerfiles[0] + nombrePerfiles[1])
    const numeroPerfiles = nombrePerfiles.length;
    console.log('---------------------------------------------')


    res.render('paginaUsuarios', { user, numeroPerfiles, nombrePerfiles});
});

router.get('/paginaUsuariosAdd', async function (req, res, next) {

    const user = req.session.user
    let perfil = req.query.nombre;

    console.log('estpy en add  ' + perfil)
    await database.añadirNuevoPerfil(user, perfil);

    const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(user);

    const numeroPerfiles = nombrePerfiles.length;
    
    res.render('paginaUsuarios', { user, nombrePerfiles, numeroPerfiles});



});

module.exports = router;
