const manoArriba = document.getElementById('manoArriba');
let activado = false;

console.log('divValoracioneeessss')

manoArriba.addEventListener('click', function(){
  console.log('divValoracioneeessss  iiff')

  if(activado){
    document.querySelector('.contenedorResenas1').style.display = 'none';
    activado = false;
  }else{
    document.querySelector('.contenedorResenas1').style.display = 'block';
    activado = true;
  }
})

/*manoArriba.addEventListener('mousedown', function(){
  console.log('divValoracioneeessss  iiff')

  if(activado){
    document.querySelector('.contenedorResenas1').style.display = 'none';
    activado = false;
  }else{
    document.querySelector('.contenedorResenas1').style.display = 'block';
    activado = true;
  }
})*/

/*manoArriba.addEventListener('mouseenter', function() {
  console.log('El ratón está sobre el elemento con el ID "manoArriba".');
  document.querySelector('.contenedorResenas1').style.display = 'block';

});*/

/*manoArriba.addEventListener('mouseleave', function() {
  console.log('El ratón ha salido del elemento con el ID "manoArriba".');
  document.querySelector('.contenedorResenas1').style.display = 'none';

});*/

