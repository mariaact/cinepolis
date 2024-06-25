var express = require('express');
var router = express.Router();
var database = require('../consultasDB');

const { ethers } = require('ethers');
const { provider, wallet } = require('../ganache-config');

/* GET users listing. */
router.get('/valoraciones', async function (req, res, next) {
  const pelicula = req.query.titulo;
  const usuario = req.session.usuario;
  const perfil = req.session.perfiles;
  const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(req.session.usuario);
  const posicionPerfil = nombrePerfiles.indexOf(req.session.perfiles);

  let html = ''

  const datosChat = await database.obtenerTodosLosComentarios(pelicula)
  .then(async resultado => {
  console.log('Resultado:', resultado);

  if(resultado.length == 0){
    html = '<h1 class="vacio">Se el primero en añadir una valoración a la película '+pelicula+'</h1>';
      }
    for(let i = 0; i< resultado.length; i++){
      console.log(usuario)
      const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(resultado[i].usuario);
      console.log(nombrePerfiles)
      console.log(nombrePerfiles.indexOf(resultado[i].nombrePerfil))
      let color = '';
      if(nombrePerfiles.indexOf(resultado[i].nombrePerfil) == 0){
        color = 'icon1';
      }else if(nombrePerfiles.indexOf(resultado[i].nombrePerfil) == 2){
        color = 'icon2';
      }else if(nombrePerfiles.indexOf(resultado[i].nombrePerfil) == 3){
        color = 'icon3';
      }
      console.log('colores iconoo ------ '   + color)
      html += '<div class="itemCrit" data-id="1403"><div class="headCri canReply" style="padding: 1.3vh 1.3vh 1.3vh 1.3vh;">'
      + '<div class="uAvatar"><img id="'+color+'" class="iconUser" src="/images/userIcon.png"></div><a href="javascript:void(0)">'+resultado[i].nombrePerfil +' [ '+resultado[i].usuario+' ]</a>'
      + '<p class="dateContainer"></p></div> <div class="cuerCri canReply">'+resultado[i].comentario+'</div></div>'
    }
  })

 

  res.render('valoraciones', {  pelicula, html, perfil, usuario, posicionPerfil });
});

router.post('/valoraciones', async function (req, res, next) {
  const pelicula = req.query.titulo;
  const valoracion = req.body.textoValoracion;
  const usuario = req.session.usuario;
  const perfil = req.session.perfiles;
  let html = '';
  const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(req.session.usuario);
  const posicionPerfil = nombrePerfiles.indexOf(req.session.perfiles); 



  await database.añadirNuevoComenatrio(pelicula, valoracion, usuario, perfil);

  const datosChat = await database.obtenerTodosLosComentarios(pelicula)
  .then(async resultado => {
  console.log('Resultado:', resultado);
    for(let i = 0; i< resultado.length; i++){
      const nombrePerfiles = await database.obtenerPerfilesDeUnUsuario(usuario);
      let color = '';
      if(nombrePerfiles.indexOf(resultado[i].nombrePerfil) == 0){
        color = 'box1';
      }else if(nombrePerfiles.indexOf(resultado[i].nombrePerfil) == 2){
        color = 'box2';
      }else if(nombrePerfiles.indexOf(resultado[i].nombrePerfil) == 3){
        color = 'box3';
      }
      console.log(color)
      html += '<div class="itemCrit" data-id="1403"><div class="headCri canReply" style="padding: 1.3vh 1.3vh 1.3vh 1.3vh;">'
      + '<div class="uAvatar"><img id="'+color+'" class="iconUser" src="/images/userIcon.png"></div><a href="javascript:void(0)">'+resultado[i].nombrePerfil +' [ '+resultado[i].usuario+' ]</a>'
      + '<p class="dateContainer"></p></div> <div class="cuerCri canReply">'+resultado[i].comentario+'</div></div>'
    }
  })

  try {

    const user = await database.obtenerTodaLaInformacionUsuario(usuario);
    console.log('info de los usuarios  ' + user.direccionWallet)

    // Calcula el incentivo basado en la valoración
    const incentive = ethers.utils.parseEther((0.01).toString());
    

    console.log(user.direccionWallet)

    try {
      // Crear una transacción
      const tx = {
        to: user.direccionWallet,
        value: incentive,
      };

      console.log(tx)
      console.log(wallet)

      const initialBalance = await wallet.provider.getBalance(user.direccionWallet);


      // Enviar la transacción
      const transaction = await wallet.sendTransaction(tx);
      await transaction.wait();


      console.log(`Incentivo de ${ethers.utils.formatEther(incentive)} ETH enviado a ${user.direccionWallet}`)

      // Esperar a que la transacción se confirme
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        console.log(`Incentivo de ${ethers.utils.formatEther(incentive)} ETH enviado a ${user.direccionWallet}`);
      } else {
        console.log('La transacción falló');
      }

      const finalBalance = await wallet.provider.getBalance(user.direccionWallet);

      console.log('Balance inicial:', ethers.utils.formatEther(initialBalance));
      console.log('Balance final:', ethers.utils.formatEther(finalBalance));

    } catch (error) {
      console.error(error);
    }

  } catch (error) {

  }
  
  res.render('valoraciones', { pelicula, html, perfil, usuario, posicionPerfil});
});


module.exports = router;
