var max = 75;
var score = 0;
var startTime = -1;
var time = -1;
var playing = false;
var diameter = -1;

const click = new Audio("sounds/click.mp3");

function hit() {

    if (score !== 0) {
        click.play();
        if (!playing && !viewing) {
            playing = true;
            startTime = (new Date).getTime();
            hideDifficultyButtons();
            hideReplayButtons();
        }

        score--;
        const hitObject = document.getElementById('target');
        document.getElementById("score").innerHTML = score;
        replay.target.push({time: timeSince(startTime), x: Number.parseFloat(target.style.left), y: Number.parseFloat(target.style.top)});
        replay.hit.push(timeSince(startTime));

        if (score === 0) {
            time = timeSince(startTime);
            document.getElementById("timer").innerHTML = timeFormat(time);
            replay.time = time;
            replay.cursor.push({time: time, x: cursor.x, y: cursor.y});
            playing = false;
            hitObject.style.filter = "opacity(0%)";
            showDifficultyButtons();
            showReplayButtons();
        } else {
            move(hitObject);
        }
    }

}

function move(hitObject, x, y) {
    if (x !== undefined && y !== undefined) {
        hitObject.style.left = `${x}px`;
        hitObject.style.top = `${y}px`;
    } else {
        hitObject.style.left = `${randBetween(0, window.innerWidth - hitObject.scrollWidth)}px`;
        hitObject.style.top = `${randBetween(120, window.innerHeight - hitObject.scrollWidth)}px`;
    }
}

function reset() {
    playing = false;
    score = max;
    startTime = -1;
    resetReplay();
    hideReplayButtons();

    const hitObject = document.getElementById('target');
    move(hitObject, (window.innerWidth - diameter) / 2, 120);
    hitObject.style.filter = "";
    hitObject.style.width = `${diameter}px`;
    hitObject.style.height = `${diameter}px`;

    document.getElementById("timer").innerHTML = "0:00.000";
    document.getElementById("score").innerHTML = score;
}

function chooseDifficulty(difficulty) {
    if (!playing && !viewing) {
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
