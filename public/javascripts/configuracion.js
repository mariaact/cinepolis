function mostrar(boton) {
    let resultado = '';
    Swal.fire({
        title: 'Introduce el nuevo parametro ' + boton + ':',
        input: 'text',
        inputPlaceholder: 'Escribe el nuevo parametro...',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
            if (!inputValue) {
                Swal.showValidationMessage('Necesitas escribir algo!');
                return false;
            } else {
                resultado = inputValue;
                console.log('value' + inputValue)
            }
            return inputValue;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                text: 'Se estan procesando los datos ',
                icon: 'info'
            });
        }
        setTimeout(() => {
            window.location.href = "/modificarconfiguracionUsuario?parametro=" + boton + "&valor=" + resultado;
        }, 2000);
    });
}