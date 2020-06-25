var replay = {
    time: -1,
    target: [],
    hit: [],
    cursor: []
}

var viewing = false;
function watchReplay(replay) {
    if (replay.time !== -1 && !viewing) {
        viewing = true;
        hideDifficultyButtons();
        hideReplayButtons();
        var cursorArray =  [...replay.cursor];
        var targetArray =  [...replay.target];
        var hitArray =  [...replay.hit];
        const score = document.getElementById('score');
        const hitObject = document.getElementById('target');
        const cursor = document.getElementById('replay-cursor');
        score.innerHTML = max;
        hitObject.style.filter = "opacity(100%)";
        cursor.style.filter = "opacity(100%)";
        var pop = cursorArray.shift();
        move(cursor, pop.x, pop.y);
        pop = targetArray.shift();
        move(hitObject, pop.x, pop.y);
        setTimeout(() => {
            var replayStart = (new Date).getTime();
            var loop = setInterval(() => {
                document.getElementById("timer").innerHTML = timeFormat(timeSince(replayStart));
                while (cursorArray.length > 0 && timeSince(replayStart) >= cursorArray[0].time) {
                    pop = cursorArray.shift();
                    move(cursor, pop.x - 12.5, pop.y - 12.5);
                }
                while (targetArray.length > 0 && timeSince(replayStart) >= hitArray[0]) {
                    score.innerHTML = targetArray.length;
                    click.play();
                    hitArray.shift();
                    pop = targetArray.shift();
                    move(hitObject, pop.x, pop.y);
                }
                if (cursorArray.length === 0) {
                    clearInterval(loop);
                    document.getElementById("timer").innerHTML = timeFormat(replay.time);
                    click.play();
                    score.innerHTML = "0";
                    cursor.style.filter = "opacity(0%)";
                    hitObject.style.filter = "opacity(0%)";
                    showDifficultyButtons();
                    showReplayButtons();
                    viewing = false;
                }
            }, 1);
        }, 500);
    }
}

function resetReplay() {
    replay.time = -1;
    replay.target = [];
    replay.hit = [];
    replay.cursor = [];
}
