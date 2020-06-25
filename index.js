var max = 75;
var score = 0;
var startTime = -1;
var playing = false;
var diameter = 100;

const click = new Audio("sounds/click.mp3");

function hit() {

    if (score !== 0) {
        click.play();
        if (!playing) {
            playing = true;
            startTime = (new Date).getTime();
            hideDifficultyButtons();
        }

        score--;
        const hitObject = document.getElementById('target');
        document.getElementById("score").innerHTML = score;

        if (score === 0) {
            playing = false;
            hitObject.style.filter = "opacity(0%)";
            showDifficultyButtons();
        } else {
            move(hitObject);
        }
    }

}

function move(hitObject, x, y) {
    if (x !== undefined && y !== undefined) {
        hitObject.style.left = `${x}px`;
        hitObject.style.top = `${y}px`;
    } else if (window.innerWidth >= window.innerHeight - 120) {
        hitObject.style.left = `${randBetween((window.innerWidth - window.innerHeight + 120) / 2, window.innerWidth - ((window.innerWidth - window.innerHeight - 120) / 2) - hitObject.scrollWidth)}px`;
        hitObject.style.top = `${randBetween(120, window.innerHeight - hitObject.scrollWidth)}px`;
    } else {
        hitObject.style.left = `${randBetween(120, window.innerWidth - hitObject.scrollWidth)}px`;
        hitObject.style.top = `${randBetween((window.innerHeight - window.innerWidth + 120) / 2, window.innerHeight - ((window.innerHeight - window.innerWidth - 120) / 2) - hitObject.scrollWidth)}px`;
    }
}

function reset() {
    playing = false;
    score = max;
    startTime = -1;

    const hitObject = document.getElementById('target');
    move(hitObject, (window.innerWidth - diameter) / 2, 120);
    hitObject.style.filter = "";
    hitObject.style.width = `${diameter}px`;
    hitObject.style.height = `${diameter}px`;

    document.getElementById("timer").innerHTML = "0:00.000";
    document.getElementById("score").innerHTML = score;
}

function chooseDifficulty(difficulty) {
    if (!playing) {
        if (difficulty == "easy") {
            diameter = 175;
        } else if (difficulty == "normal") {
            diameter = 110;
        } else if (difficulty == "hard") {
            diameter = 50;
        }
        reset();
    }
}

setInterval(() => {
    if (playing) {
        document.getElementById("timer").innerHTML = timeFormat(timeSince(startTime));
    }
}, 1);
