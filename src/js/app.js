let page = 2;

document.addEventListener('DOMContentLoaded', () => {
    startApp();
});

function startApp() {
    showServices();
    createSectionBtn();
    showFirstSection();
    formAnimations();
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
                }else {
                    event.currentTarget.classList.add('selected');
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
}
