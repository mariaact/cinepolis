let corazon = false;

function toggleHeart(button, pelicula, user, perfil) {
  console.log('estoy en el script corazon detalles  ' +button +pelicula +user+ perfil)

  button.querySelector('.heart-icon').classList.toggle('active');
  var heartIcon = button.querySelector('.heart-icon');
  console.log('esty en corazon y el user es ' + user)

  if (heartIcon.classList.contains('active')) {
    console.log('esta activo');
    corazon = true;
    const dataToSend = { 'Pelicula': pelicula, 'Usuario': user, 'Corazon': corazon, 'Perfil': perfil}

  fetch('http://localhost:3000/enviar-datos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error al enviar datos al servidor:', error);
    });

  } else {
    console.log('esta desactivado')
    corazon = false;
    const dataToSend = {'Pelicula': pelicula, 'Usuario': user, 'Corazon': corazon,'Perfil': perfil }

  fetch('http://localhost:3000/enviar-datos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error al enviar datos al servidor:', error);
    });
  }
}



