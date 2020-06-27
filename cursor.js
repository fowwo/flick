var cursor = {
	x: -1,
	y: -1
}

const playArea = document.getElementById("play-area");

document.addEventListener("mousemove", (event) => {
	let rect = playArea.getBoundingClientRect();
	cursor.x = 100 * (event.clientX - rect.left) / rect.width;
	cursor.y = 100 * (event.clientY - rect.top) / rect.height - diameter;
});

setInterval(() => {
    if (playing) {
        replay.cursor.push({time: timeSince(startTime), x: cursor.x, y: cursor.y});
	}
}, 10);
