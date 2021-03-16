function formAnimations() {
    // I have to add date input funcionality
    makeTimeInput();
    makeDateInput();    
    makeNameInput();
}

function makeNameInput() {
    const firstName = document.querySelector('input[name=firstName]');
    const lastName = document.querySelector('input[name=lastName]');

    firstName.addEventListener('input', function(e) {
        select(this);
    })

    firstName.addEventListener('focus', function(e) {
        select(this);
    })

    firstName.addEventListener('blur', function(e) {
        if(e.currentTarget.value === '') {
            this.setAttribute('placeholder', "Please insert First Name");   
            wrong(this);
            unSelect(this);
        }
        else { 
            correct(this);
            unSelect(this);
        }
    })

    lastName.addEventListener('input', function(e) {
        select(this);
    })

    lastName.addEventListener('focus', function(e) {
        select(this);
    })

    lastName.addEventListener('blur', function(e) {
        if(e.currentTarget.value === '') {
            this.setAttribute('placeholder', "Please insert Last Name");   
            wrong(this);
            unSelect(this);
        }
        else { 
            correct(this);
            unSelect(this);
        }
    })
}

function select(input) {
    input.style.webkitTextFillColor = "#000";
    if(!input.classList.contains('selected')) {
        input.classList.add('selected');
    }
    if(input.classList.contains('wrong')) {
        input.classList.remove('wrong');
        if(input.name === "firstName") {
            input.setAttribute('placeholder', "First Name");
        }else {
            input.setAttribute('placeholder', "Last Name");
        }
    }
    if(input.classList.contains('correct')) input.classList.remove('correct');
}

function unSelect(input) {
    if(input.classList.contains('selected')) {
        input.classList.remove('selected');
    }
    if(input.classList.contains('correct')) {
        input.style.webkitTextFillColor = "#65F200";
    }else if(input.classList.contains('wrong')) {
        input.style.webkitTextFillColor = "#F22439";
    }
}

function selectInput(label, input, type) {
    if(type === "time") label.textContent = "Opening hours 10:00 to 20:00";
    else label.textContent = "Weekdays Only";
    
    if(input.classList.contains('chosen')) input.classList.remove('chosen');
    if(!input.classList.contains('selected')) input.classList.add('selected');
}

function dateTransform(date) {
    let newDate = date.split('-');
    const year = newDate[0];
    const month = newDate[1] - 1;
    const day = newDate[2];
    
    newDate = new Date(year, month, day);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return newDate.toLocaleDateString('en-US', options);
}

function makeDateInput() {
    const dateLabel = document.querySelector('.field-date-time:nth-of-type(2) label');
    const dateInput = document.querySelector('.field-date-time:nth-of-type(2) input');

    const today = new Date();
    const todayString = today.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' );

    const next3Months = new Date(today.setMonth(today.getMonth() + 3));
    const next3MonthsString = next3Months.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' );

    dateInput.setAttribute('min', todayString);
    dateInput.setAttribute('max', next3MonthsString);
    
    dateInput.isFocus = false;
    dateInput.hasChanged = false;

    dateInput.mouseIsOver = false;
    dateLabel.mouseIsOver = false;

    const type = "date";

    dateLabel.addEventListener('mouseover', function() {
        this.mouseIsOver = true;
        selectInput(dateLabel, dateInput, type);
    });

    dateInput.addEventListener('mouseover', function() {
        this.mouseIsOver = true;
        selectInput(dateLabel, dateInput, type);
    })

    dateLabel.addEventListener('mouseout', function() {
        this.mouseIsOver = false;
        setTimeout(() => {
            if(dateInput.mouseIsOver === false && dateInput.isFocus === false) {
                unSelectInput(dateLabel, dateInput, type);
            }
        }, 10);
    })

    dateInput.addEventListener('mouseout', function() {
        this.mouseIsOver = false;
        setTimeout(() => {
            if(dateLabel.mouseIsOver === false && this.isFocus === false) {
                unSelectInput(dateLabel, dateInput, type);
            }
        }, 10);
    })

    dateInput.addEventListener('focus', function(e) {
        this.isFocus = true;
        selectInput(dateLabel, dateInput, type);
    });

    dateInput.addEventListener('blur', function() {
        this.isFocus = false;
        this.hasChanged = true;
        if(this.mouseIsOver === false && dateLabel.mouseIsOver === false) {
            unSelectInput(dateLabel, dateInput, type);
        }
    });

    dateInput.addEventListener('input', function(e) {
        this.hasChanged = true;
        validateDate(e);
    })
}

function validateDate(e) {
    const input = document.querySelector('.field-date-time:nth-of-type(2) input');

    const today = new Date();
    const todayEdit = new Date();
    const next3Months = new Date(todayEdit.setMonth(todayEdit.getMonth() + 3));


    const date = e.currentTarget.value.split('-')
    const year = date[0];
    const month = date[1] - 1;
    const day = date[2];

    const appointmentDate = new Date(Date.UTC(year, month, day));
    const dayOfWeek = appointmentDate.getUTCDay();
    if((year < today.getFullYear() || month < today.getMonth()) || (day < today.getDate() && month === today.getMonth()) || (month > next3Months.getMonth()) || (month === next3Months.getMonth() && day > next3Months.getDate()) || ([0,6].includes(dayOfWeek))) {
        wrong(input);
    }else {
        correct(input);
    }
}

function makeTimeInput() {
    const timeLabel = document.querySelector('.field-date-time:nth-of-type(3) label');
    const timeInput = document.querySelector('.field-date-time:nth-of-type(3) input');
    
    timeInput.isFocus = false;
    timeInput.hasChanged = false;

    timeInput.mouseIsOver = false;
    timeLabel.mouseIsOver = false;

    const type = "time";

    timeLabel.addEventListener('mouseover', function() {
        this.mouseIsOver = true;
        selectInput(timeLabel, timeInput, type);
    });

    timeInput.addEventListener('mouseover', function() {
        this.mouseIsOver = true;
        selectInput(timeLabel, timeInput, type);
    })

    timeLabel.addEventListener('mouseout', function() {
        this.mouseIsOver = false;
        setTimeout(() => {
            if(timeInput.mouseIsOver === false && timeInput.isFocus === false) {
                unSelectInput(timeLabel, timeInput, type);
            }
        }, 10);
    })

    timeInput.addEventListener('mouseout', function() {
        this.mouseIsOver = false;
        setTimeout(() => {
            if(timeLabel.mouseIsOver === false && this.isFocus === false) {
                unSelectInput(timeLabel, timeInput, type);
            }
        }, 10);
    })

    timeInput.addEventListener('focus', function(e) {
        this.isFocus = true;
        this.hasChanged = true;

        selectInput(timeLabel, timeInput, type);

        const stringTime = e.currentTarget.value.split(":");
        const hour = parseInt(stringTime[0]);
        const minutes = parseInt(stringTime[1]);
        validateTime(hour, minutes);
    });

    timeInput.addEventListener('blur', function() {
        this.isFocus = false;
        this.hasChanged = true;
        if(this.mouseIsOver === false && timeLabel.mouseIsOver === false) {
            unSelectInput(timeLabel, timeInput, type);
        }
    })

    timeInput.addEventListener('input', function(e) {
        this.hasChanged = true;

        const stringTime = e.currentTarget.value.split(":");
        const hour = parseInt(stringTime[0]);
        const minutes = parseInt(stringTime[1]);

        validateTime(hour, minutes);
    })
}

function validateTime(hour, minutes) {
    const input = document.querySelector('.field-date-time:nth-of-type(3) input');
    if(hour >= 10 && hour <= 19 ) {
        correct(input);
    }else if(hour === 20) {
        if(minutes > 0) {
            wrong(input);
        }else {
            correct(input);
        }
    }else {
        wrong(input);
    }
}

function correct(input) {
    if(input.classList.contains('wrong')) {
        input.classList.remove('wrong');
        input.classList.add('correct');
    }
    else if(!input.classList.contains('correct')) {
        input.classList.add('correct');
    }
}

function wrong(input) {
    if(input.classList.contains('correct')) {
        input.classList.remove('correct');
        input.classList.add('wrong');
    }
    else if(!input.classList.contains('wrong')) {
        input.classList.add('wrong');
    }
}


function unSelectInput(label, input, type) {
    if(input.hasChanged) {
        if(input.classList.contains('correct')) {
            if(type === 'date') label.textContent = dateTransform(input.value);
            else label.textContent = input.value;
        } else {
            if(!input.classList.contains('wrong')) input.classList.add('wrong');
            if(type === "time") label.textContent = "Please select a valid Time";
            else label.textContent = "Please select a valid Date";
        }
        input.classList.add('chosen');
    }else {
        if(type === "time") label.textContent = "Time";
        else label.textContent = "Date";
    }
    input.classList.remove('selected');
}