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
            moveInPlayArea(hitObject);
        }
    }

}

function moveInPlayArea(hitObject, left, top) {
    if (left !== undefined && top !== undefined) {
        hitObject.style.left = left;
        hitObject.style.top = top;
    } else {
        hitObject.style.left = `${randBetween(0, 100 - diameter * 0.75)}%`;
        hitObject.style.top = `${randBetween(0, 100 - diameter)}%`;
    }
}

function reset() {
    playing = false;
    score = max;
    startTime = -1;
    resetReplay();
    hideReplayButtons();

    const hitObject = document.getElementById('target');
    hitObject.style.filter = "";
    hitObject.style.width = `${diameter * 0.75}%`;
    hitObject.style.height = `${diameter}%`;
    moveInPlayArea(hitObject, `calc(${50 - diameter * 0.75 / 2}%)`, `calc(${50 - diameter / 2}%)`);

    document.getElementById("timer").innerHTML = "0:00.000";
    document.getElementById("score").innerHTML = score;
}

function chooseDifficulty(difficulty) {
    if (!playing && !viewing) {
        if (difficulty == "easy") {
            diameter = 20;
        } else if (difficulty == "normal") {
            diameter = 13.5;
        } else if (difficulty == "hard") {
            diameter = 8;
        }
        reset();
    }
}

setInterval(() => {
    if (playing) {
        document.getElementById("timer").innerHTML = timeFormat(timeSince(startTime));
    }
}, 1);
