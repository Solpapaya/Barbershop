document.addEventListener('DOMContentLoaded', () => {
    startApp();
});

function startApp() {
    showServices();
}

async function showServices() {
    try {
        const result = await fetch('./services.json');
        const data = await result.json();

        const {services} = data;

        const listServices = document.querySelector('.list-services');

        // Generate HTML
        services.forEach((service) => {
            const {name, price} = service;

            const serv = document.createElement('DIV');
            const servName = document.createElement('P');
            const servPrice = document.createElement('P');
            serv.appendChild(servName);
            serv.appendChild(servPrice);
            listServices.appendChild(serv);

            serv.addEventListener('click', serviceSelected);

            serv.classList.add('service', 'service--not-selected');
            servName.classList.add('service__name');
            servPrice.classList.add('service__price');

            servName.textContent = name;
            servPrice.textContent = `$${price}`;
        });

    } catch(error) {
        console.log(error);
    }
}

function serviceSelected(event) {
    if(event.currentTarget.classList.contains('service--not-selected')) {
        event.currentTarget.classList.remove('service--not-selected');
        event.currentTarget.classList.add('service--selected');
    }else {
        event.currentTarget.classList.remove('service--selected');
        event.currentTarget.classList.add('service--not-selected');
    }
}