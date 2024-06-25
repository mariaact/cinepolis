window.addEventListener("scroll", function(){

    var scrollPosotion = window.scrollY;
    var fondoNegro = document.getElementById('contenedorFondoNegro');
    var altura = window.innerHeight * 0.1;

    if(scrollPosotion >=  211){
        fondoNegro.style.display = 'block';
    } else{
        fondoNegro.style.display = 'none';
    }

});

document.addEventListener('DOMContentLoaded', function () {
  console.log('dentro del boton usuariooo')
    var btnMostrarDivUser = document.querySelector('.btn-User');
    var divSobresaliente = document.getElementById('navbarUsuario');

    var divMostrarMenu = document.querySelector('.ventana-pequena');
    var btnMostrarMenuVentanaPequena = document.getElementById('icono-ventana-pequena');

    btnMostrarMenuVentanaPequena.addEventListener('click', function (event) {
      event.preventDefault(); 
      if (divMostrarMenu.style.display === 'block') {
        console.log('estoy en if usuario')
        divMostrarMenu.style.display = 'none'; 
      } else {
        console.log('estoy en else usuario')
        divMostrarMenu.style.display = 'block'; 
        divSobresaliente.style.display = 'none'; 
      }
    });
   
  
    btnMostrarDivUser.addEventListener('click', function (event) {
      event.preventDefault(); 
      if (divSobresaliente.style.display === 'block') {
        console.log('estoy en if usuario')
        divSobresaliente.style.display = 'none'; 
      } else {
        console.log('estoy en else usuario')

        divSobresaliente.style.display = 'block'; 
        divMostrarMenu.style.display = 'none'; 
      }
    });
  });