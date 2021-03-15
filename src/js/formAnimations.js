function formAnimations() {
    const timeLabel = document.querySelector('.field-date-time label');
    const timeInput = document.querySelector('.field-date-time input');
    
    timeInput.isFocus = false;
    timeInput.hasChanged = false;

    timeInput.mouseIsOver = false;
    timeLabel.mouseIsOver = false;

    timeLabel.addEventListener('mouseover', function() {
        this.mouseIsOver = true;
        selectInput(timeLabel, timeInput);
    });

    timeInput.addEventListener('mouseover', function() {
        this.mouseIsOver = true;
        selectInput(timeLabel, timeInput);
    })

    timeLabel.addEventListener('mouseout', function() {
        this.mouseIsOver = false;
        if(timeInput.mouseIsOver === false && timeInput.isFocus === false) {
            unSelectInput(timeLabel, timeInput);
        }
    })

    timeInput.addEventListener('mouseout', function() {
        this.mouseIsOver = false;
        if(timeLabel.mouseIsOver === false && this.isFocus === false) {
            unSelectInput(timeLabel, timeInput);
        }
    })

    timeInput.addEventListener('focus', function(e) {
        this.isFocus = true;
        selectInput(timeLabel, timeInput);

        const stringTime = e.currentTarget.value.split(":");
        const hour = parseInt(stringTime[0]);
        const minutes = parseInt(stringTime[1]);
        validateTime(hour, minutes);
    });

    timeInput.addEventListener('blur', function() {
        this.isFocus = false;
        if(this.mouseIsOver === false && timeLabel.mouseIsOver === false) {
            unSelectInput(timeLabel, timeInput);
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
    if(hour >= 10 && hour <= 19 ) {
        correctTime();
    }else if(hour === 20) {
        if(minutes > 0) {
            wrongTime();
        }else {
            correctTime();
        }
    }else {
        wrongTime();
    }
}

function correctTime() {
    const timeInput = document.querySelector('.field-date-time input');
    if(timeInput.classList.contains('wrong')) {
        timeInput.classList.remove('wrong');
        timeInput.classList.add('correct');
    }
    else if(!timeInput.classList.contains('correct')) {
        timeInput.classList.add('correct');
    }
}

function wrongTime() {
    const timeInput = document.querySelector('.field-date-time input');
    if(timeInput.classList.contains('correct')) {
        timeInput.classList.remove('correct');
        timeInput.classList.add('wrong');
    }
    else if(!timeInput.classList.contains('wrong')) {
        timeInput.classList.add('wrong');
    }
}

function unSelectInput(timeLabel, timeInput) {
    if(timeInput.hasChanged) {
        if(timeInput.classList.contains('correct')) {
            timeLabel.textContent = timeInput.value;
        } else {
            timeLabel.textContent = "Please select a valid Time";
        }
        timeInput.classList.add('chosen');
    }else {
        timeLabel.textContent = "Time";
    }
    timeInput.classList.remove('selected');
}

function selectInput(timeLabel, timeInput) {
    timeLabel.textContent = "Opening hours 10:00 to 20:00";
    if(timeInput.classList.contains('chosen')) timeInput.classList.remove('chosen');
    if(!timeInput.classList.contains('selected')) timeInput.classList.add('selected');
}