function pedirNombre() {
    var nombre = prompt("Por favor, ingresa el nombre de usuario:");
    if (nombre != null && nombre != "") {
        var box2 = window.getComputedStyle(document.querySelector('.container2')).display;
        var box3 = window.getComputedStyle(document.querySelector('.container3')).display;
        var box5 = window.getComputedStyle(document.querySelector('.container5')).display;


        if (typeof nombre !== "undefined" && nombre !== null) {
            if (box2 === "none") {
                document.querySelector(".container2").style.display = "block";
                document.getElementById("pBox2").textContent = nombre;
                enviarPerfiles(nombre);

            } else if (box3 == "none") {
                document.querySelector(".container3").style.display = "block";
                document.getElementById("pBox3").textContent = nombre;
                enviarPerfiles(nombre);
            } else {
                document.querySelector(".container5").style.display = "none"
            }
        }
        if (document.querySelector(".container2").style.display === "block" && document.querySelector(".container3").style.display === "block") {
            document.querySelector(".container5").style.display = "none"
        }
    } else {
        alert("No se ha creado el usuario.");
    }
}

function enviarPerfiles(nombre) {
    console.log('esgdsgfdgshd------')
    console.log(encodeURIComponent(nombre))
    console.log(nombre)
    console.log('/paginaUsuariosAdd?nombre=' + encodeURIComponent(nombre))
    /*-fetch('/paginaUsuariosAdd?nombre=' + encodeURIComponent(nombre))
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Ocurrió un error al enviar el nombre.');
            }
             alert('¡Nombre enviado con éxito!');
             window.location.href = '/paginaUsuariosAdd?nombre=' + encodeURIComponent(nombre);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al enviar el nombrse.');
        });
*/
window.location.href = '/paginaUsuariosAdd?nombre=' + encodeURIComponent(nombre);

}
