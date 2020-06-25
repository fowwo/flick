var cursor = {
	x: -1,
	y: -1
}

document.addEventListener("mousemove", (event) => {
	cursor.x = event.clientX;
	cursor.y = event.clientY;
});

setInterval(() => {
    if (playing) {
        replay.cursor.push({time: timeSince(startTime), x: cursor.x, y: cursor.y});
    }
}, 10);
