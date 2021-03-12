let page = 1;

document.addEventListener('DOMContentLoaded', () => {
    startApp();
});

function startApp() {
    showServices();
    showSection();    
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

function serviceSelected(event) {
    if(event.currentTarget.classList.contains('selected')) {
        event.currentTarget.classList.remove('selected');
    }else {
        event.currentTarget.classList.add('selected');
    }
}

function showSection() {
    const navItems = document.querySelectorAll('.nav__item');
    navItems[page - 1].classList.add('selected');

    const sections = document.querySelectorAll('section');
    sections[page - 1].classList.add('selected');

    // const currentSection = document.querySelector(`#section-${page}`);
    // currentSection.classList.add('selected');

    navItems.forEach((item) => {
        item.addEventListener('click', sectionSelected);
    });

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
            btn.addEventListener('click', changePage);
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
    btn.addEventListener('click', changePage);
    btnContainer.appendChild(btn);
    return btnContainer;
}

function changePage(event) {
    // console.log(event.currentTarget);
    const btn = event.currentTarget;
    // console.log(btn.textContent.toLowerCase().includes("next"));
    if(btn.textContent.toLowerCase().includes("next")) {
        page++;
    } else {
        page--;
    }
    showPage();
}

function showPage() {
    const previousSelectedTab = document.querySelector('.nav__item.selected');
    const previousSelectedSectionId = previousSelectedTab.dataset.section;
            
    const previousSelectedSection = document.querySelector(`#section-${previousSelectedSectionId}`);
}

function sectionSelected(event) {
    if(!event.currentTarget.classList.contains('selected')) {
        const previousSelectedTab = document.querySelector('.nav__item.selected');
        if(previousSelectedTab !== null) {
            const previousSelectedSectionId = previousSelectedTab.dataset.section;
            
            const previousSelectedSection = document.querySelector(`#section-${previousSelectedSectionId}`);

            previousSelectedTab.classList.remove('selected');
            previousSelectedSection.classList.remove('selected');

            event.currentTarget.classList.add('selected');
    
            const newSectionId = event.currentTarget.dataset.section;
            const newSelectedSection = document.querySelector(`#section-${newSectionId}`);
            newSelectedSection.classList.add('selected');
        }
    }
}
