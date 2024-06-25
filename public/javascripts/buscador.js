const searchContainer = document.querySelector('.search-input-box');
const inputSearch = searchContainer.querySelector('input');
const boxSuggestions = document.querySelector(
    '.container-suggestions'
);
const searchLink = document.querySelector('a');



fetch('/informacionListaPeliculasBuscador')
    .then(response => {
        if (!response.ok) {
            throw new Error('Hubo un problema al obtener la información');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos obtenidos del get peliculas buscador:', data);
        inputSearch.onkeyup = e => {
            let userData = e.target.value;
            console.log(userData)
            let emptyArray = [];

            if (userData) {
                emptyArray = data.filter(data => {
                    return data
                        .toLocaleLowerCase()
                        .startsWith(userData.toLocaleLowerCase());
                });

                emptyArray = emptyArray.map(data => {
                    return (data = `<li>${data}</li>`);
                });
                searchContainer.classList.add('active');
                showSuggestions(emptyArray);

                let allList = boxSuggestions.querySelectorAll('li');

                allList.forEach(li => {
                    li.setAttribute('onclick', 'select(this)');
                });
            } else {
                searchContainer.classList.remove('active');
            }
        };

        const showSuggestions = list => {
            let listData;
            if (!list.length) {
                userValue = inputSearch.value;
                listData = `<li>${userValue}</li>`;
            } else {
                listData = list.join(' ');
            }
            boxSuggestions.innerHTML = listData;
        };
    })
    .catch(error => {
        console.error('Error:', error);
    });


    function select(element) {
        let selectUserData = element.textContent;

        inputSearch.value = selectUserData;
        window.location.href = "/peliculaDetallada?valor="+ inputSearch.value;
        searchContainer.classList.remove('active');
    }

