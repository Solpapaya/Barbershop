let page = 1;

// const appointment = {
//     firstName: 'Daniel Rafael',
//     lastName: 'Solorio Paredes',
//     date: 'Monday 15, March 2021',
//     time: '12:30',
//     services: [{name: "Men's Haircut", price: "80"}, {name: "Nails", price: "400"}]
// };

const appointment = {
    firstName: '',
    lastName: '',
    date: '',
    time: '',
    services: []
};


document.addEventListener('DOMContentLoaded', () => {
    startApp();
});

function startApp() {
    showServices();
    createSectionBtn();
    showFirstSection();
    formAnimations();
    createSummary();
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

            serv.addEventListener('click', (event) => {
                if(event.currentTarget.classList.contains('selected')) {
                    event.currentTarget.classList.remove('selected');
                    updateAppointment(event.currentTarget, 'services', false);
                }else {
                    event.currentTarget.classList.add('selected');
                    updateAppointment(event.currentTarget, 'services');
                }
            });

            serv.classList.add('service', 'unselectable');
            servName.classList.add('service__name');
            servPrice.classList.add('service__price');

            servName.textContent = name;
            servPrice.textContent = `$${price}`;
        });

    } catch(error) {
        console.log(error);
    }
}

function createSectionBtn() {
    const sections = document.querySelectorAll('section');

    // Generate Button(s) in Section
    for(let i = 0; i < sections.length; i++) {
        const btnContainer = createBtn();

        if(i === 0) {
            btnContainer.classList.add('first-page');
            btnContainer.firstElementChild.textContent = 'Next >>';
        }else if (i === (sections.length - 1)){
            btnContainer.classList.add('last-page');
        }else {
            btnContainer.classList.add('middle-page');

            // Create another Button
            const btn = document.createElement('BUTTON');
            btn.textContent = 'Next >>';
            btn.classList.add('button');
            btn.addEventListener('click', changeSection);
            btnContainer.appendChild(btn);
        }

        sections[i].appendChild(btnContainer);
    }
}

function createBtn() {
    const btnContainer = document.createElement('DIV');
    btnContainer.classList.add('button-container');
    const btn = document.createElement('BUTTON');
    btn.textContent = '<< Previous';
    btn.classList.add('button');
    btn.addEventListener('click', changeSection);
    btnContainer.appendChild(btn);
    return btnContainer;
}

function showFirstSection() {
    const navItems = document.querySelectorAll('.nav__item');
    navItems[page - 1].classList.add('selected');

    const sections = document.querySelectorAll('section');
    sections[page - 1].classList.add('selected');

    navItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            if(!event.currentTarget.classList.contains('selected')) {
                page = event.currentTarget.dataset.section;
                showSection();
            }
        });
    });
}

function changeSection(event) {
    const btn = event.currentTarget;
    if(btn.textContent.toLowerCase().includes("next")) {
        page++;
    } else {
        page--;
    }
    showSection();
}

function showSection() {
    const previousSelectedTab = document.querySelector('.nav__item.selected');
    const previousSelectedSectionId = previousSelectedTab.dataset.section;
    const previousSelectedSection = document.querySelector(`#section-${previousSelectedSectionId}`);

    previousSelectedTab.classList.remove('selected');
    previousSelectedSection.classList.remove('selected');

    const newSection = document.querySelector(`#section-${page}`);
    const newTabSection = document.querySelector(`[data-section='${page}']`);

    newSection.classList.add('selected');
    newTabSection.classList.add('selected');

    if(page == 3) {
        updateSummary();
    }
}

function createSummary() {
    const appointmentDetails = document.querySelector('.appointment-details');
    const serviceDetails = document.querySelector('.service-details');
    const totalPrice = document.querySelector('.total-price');

    appointmentDetails.classList.add('no-display');
    serviceDetails.classList.add('no-display');
    totalPrice.classList.add('no-display');

    createSummaryMessage();
}

function createSummaryMessage() {
    const summarySection = document.querySelector('#section-3');
    const btnContainer = document.querySelector('#section-3 .button-container');

    const iconContainer = createIcon();

    const summaryMessageContainer = document.createElement('DIV');
    const summaryMessage = document.createElement('P');

    summaryMessageContainer.classList.add('message-container');

    if(Object.values(appointment).includes('') && appointment.services.length === 0) {
        summaryMessage.textContent = "Ups! You are missing Client Info & Services";
    }else if(appointment.services.length === 0) {
        summaryMessage.textContent = "Ups! You are missing Services";
    }else if(Object.values(appointment).includes('')) {
        summaryMessage.textContent = "Ups! You are missing Client Info";
    }else {
        summaryMessageContainer.classList.add('no-display');
        showSummary();
    }

    summaryMessageContainer.appendChild(summaryMessage);
    summaryMessageContainer.appendChild(iconContainer);

    summarySection.insertBefore(summaryMessageContainer, btnContainer);
}

function createIcon() {
    const iconContainer = document.createElement('DIV');
    const icon = document.createElement('I');

    iconContainer.classList.add('icon-container');
    icon.classList.add('far', 'fa-frown');

    iconContainer.appendChild(icon);

    return iconContainer;
}

function updateSummary() {
    const appointmentDetails = document.querySelector('.appointment-details');
    const serviceDetails = document.querySelector('.service-details');
    const totalPrice = document.querySelector('.total-price');

    if(!appointmentDetails.classList.contains('no-display')) {
        appointmentDetails.classList.add('no-display');
        serviceDetails.classList.add('no-display');
        totalPrice.classList.add('no-display');
    }

    const summaryMessage = document.querySelector('.message-container p');
    const messageContainer = document.querySelector('.message-container');

    if(messageContainer.classList.contains('no-display')) messageContainer.classList.remove('no-display');

    if(Object.values(appointment).includes('') && appointment.services.length === 0) {
        summaryMessage.textContent = "Ups! You are missing Client Info & Services";
    }else if(appointment.services.length === 0) {
        summaryMessage.textContent = "Ups! You are missing Services";
    }else if(Object.values(appointment).includes('')) {
        summaryMessage.textContent = "Ups! You are missing Client Info";
    }else {
        messageContainer.classList.add('no-display');
        showSummary();
    }
}

function showSummary() {
    // Shows the Appointment Details
    const appointmentDetails = document.querySelector('.appointment-details');
    appointmentDetails.classList.remove('no-display');

    const detailContent = document.querySelectorAll('.detail-content');

    detailContent[0].textContent = `${appointment.firstName} ${appointment.lastName}`
    detailContent[1].textContent = appointment.date;
    detailContent[2].textContent = appointment.time;

    // Shows the Service Details
    const serviceDetails = document.querySelector('.service-details');
    serviceDetails.classList.remove('no-display');

    const services = document.querySelectorAll('.service-detail');
    services.forEach(service => {
        service.remove();
    });
    
    appointment.services.forEach(service => {
        const {name, price} = service;

        const container = document.createElement('DIV');
        container.classList.add('service-detail');

        const nameService = document.createElement('P');
        nameService.classList.add('name-service');
        nameService.textContent = name;

        const priceService = document.createElement('P');
        priceService.classList.add('price-service');
        priceService.textContent = `$${price}`;

        container.appendChild(nameService);
        container.appendChild(priceService);

        serviceDetails.appendChild(container);
    });

    // Shows the Total Price
    const totalPrice = document.querySelector('.total-price');
    totalPrice.classList.remove('no-display');

    let total = 0;
    appointment.services.forEach(service => {
        total += parseInt(service.price);
    })

    const totalLabel = document.querySelector('.total-price .total-label');
    totalLabel.textContent = "Total:";

    const price = document.querySelector('.total-price .price');
    price.textContent = `$${total}`;

    totalPrice.appendChild(totalLabel);
    totalPrice.appendChild(price);
}