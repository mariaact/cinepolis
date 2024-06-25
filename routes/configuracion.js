var express = require('express');
var router = express.Router();
var database = require('../consultasDB');
const Swal = require('sweetalert2');




/* GET home page. Obtiene los usuarios de la BD y crea dinámicamente el html formando una tabla que renderiza */
router.get('/configuracion', async function (req, res, next) {

    let usuario = req.session.usuario;
    let perfil = req.session.perfiles;
    const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(req.session.usuario);
    const posicionPerfil = nombrePerfiles.indexOf(req.session.perfiles);

    console.log('--------------------------------------------------------------------------------------------------------------------------')

    const infoUsuario = await database.obtenerTodaLaInformacionUsuario(req.session.usuario);

    let result = resultadoHTMLTabla(infoUsuario, usuario, perfil);


    let mensaje ='';
    let icon = '';



    res.render('configuracion', { content: result, perfil, usuario, posicionPerfil, showAlert: false, mensaje, icon  });
});

router.get('/modificarconfiguracionUsuario', async function (req, res, next) {

    let usuario = req.session.usuario;
    let perfil = req.session.perfiles;
    let email = await database.obtenerTodaLaInformacionUsuario(usuario);
    let parametroUsuario = req.query.parametro
    let valorUsuario = req.query.valor
    email = email.email
    let cambiarInfo = '';
    let mensaje ='';
    let icon = '';
    let alert = false;
    const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(req.session.usuario);
    const posicionPerfil = nombrePerfiles.indexOf(req.session.perfiles);
 

    if(parametroUsuario == 'nombre'){
        cambiarInfo = await database.cambiarUsuarioEmailPerfil(valorUsuario, usuario, parametroUsuario);
        console.log('-----  '+cambiarInfo)
        const result = mensajeAlert(cambiarInfo);
        mensaje = result[0];
        icon = result[1];
        alert = result[2];
        if(icon == 'success'){
            req.session.usuario = valorUsuario
        }
    }
    if(parametroUsuario == 'contraseña'){
        cambiarInfo = await database.cambiarContrasenna(usuario, valorUsuario);
        console.log('-----  '+cambiarInfo)
        const result = mensajeAlert(cambiarInfo);
        mensaje = result[0];
        icon = result[1];
        alert = result[2];
    }
    if(parametroUsuario == 'email'){
        cambiarInfo = await database.cambiarUsuarioEmailPerfil(valorUsuario, email, parametroUsuario);
        console.log('-----  '+cambiarInfo)
        const result = mensajeAlert(cambiarInfo);
        mensaje = result[0];
        icon = result[1];
        alert = result[2];
    }
    if(parametroUsuario == 'perfil'){
        cambiarInfo = await database.cambiarUsuarioEmailPerfil(valorUsuario, perfil, parametroUsuario);
        req.session.perfiles = valorUsuario;
        console.log('-----  '+cambiarInfo)
        const result = mensajeAlert(cambiarInfo);
        mensaje = result[0];
        icon = result[1];
        alert = result[2];

    }    

    console.log(' usuario sesiooon  ' + req.session.usuario)
    const infoUsuario = await database.obtenerTodaLaInformacionUsuario(req.session.usuario);


    let result = resultadoHTMLTabla(infoUsuario, usuario, perfil);


    res.render("configuracion",{
        content: result,
        showAlert: alert,
        mensaje, 
        icon, 
        perfil, 
        usuario,
        posicionPerfil});
});

router.get('/borrarUsuario', async function (req, res, next) {
    let usuario = req.query.nombre;
    console.log('esty en el get borrar user   '+ usuario)
    await database.borrarDatosUsuario(usuario)
    res.redirect('/')
});

 
router.get('/borrarPerfil', async function (req, res, next) {
    let perfil = req.query.nombre;
    let usuario = req.session.usuario;

    console.log('esty en el get borrar perf   '+ perfil)
     await database.borrarPerfil(usuario, perfil)
    res.redirect('configuracion')
});

function resultadoHTMLTabla(infoUsuario, usuario, perfil){
    let result = '<table class="tabla">';
    result += "<tr><th></th><th>Valor</th><th>Editar</th><th>Borrar</th></tr>"+
    "<tr><td>Nombre de Usuario</td><td>"+infoUsuario.nombre +"</td><td><button class='fas fa-edit' onclick='mostrar(\"nombre\")'></button></td><td><a class='borrar' href='/borrarUsuario?nombre="+usuario+"'>&#x274C;</a></td></tr>" +
    "<tr><td>Contraseña</td><td>***********</td><td><button class='fas fa-edit' onclick='mostrar(\"contraseña\")'></button></td><td></td></tr>"+
    "<tr><td>Email</td><td>"+infoUsuario.email +"</td><td><button class='fas fa-edit' onclick='mostrar(\"email\")'></button></td><td></td></tr>";

    infoUsuario.perfiles.forEach(perfiles => {
        console.log('=================   ' + perfiles.nombre)
        if(perfiles.nombre != 'Kids'){
            result += "<tr><td>Nombre de los perfiles</td><td>"+ perfiles.nombre +" </td><td><button class='fas fa-edit' onclick='mostrar(\"perfil\")'></button></td><td><a class='borrar' href='/borrarPerfil?nombre="+perfil+"'>&#x274C;</a></td></tr>";
        }
    })

    result += '</table>'
    return result;    
}


function mensajeAlert(cambiarInfo){
    console.log('estoy en la funcioon y el valor de cambiar info ees    ' + cambiarInfo)
    if(cambiarInfo == true){
        console.log('¡¡¡¡¡')
        mensaje = 'Operación realizada con éxito'
        icon = 'success'
        alert = true;
    }else{
        mensaje = cambiarInfo
        icon = 'error'
        alert = true
    }
    return [mensaje, icon, alert]
}


module.exports = router;
