function hideDifficultyButtons() {
	document.getElementById("difficulty-list").style.left = `-200px`;
    document.getElementById("difficulty-list").style.filter = `opacity(0%)`;
}

function showDifficultyButtons() {
	document.getElementById("difficulty-list").style.left = `0px`;
	document.getElementById("difficulty-list").style.filter = `opacity(100%)`;
}

function hideReplayButtons() {
	document.getElementById("replay-button-list").style.right = `-200px`;
    document.getElementById("replay-button-list").style.filter = `opacity(0%)`;
}

function showReplayButtons() {
	document.getElementById("replay-button-list").style.right = `0px`;
	document.getElementById("replay-button-list").style.filter = `opacity(100%)`;
}
