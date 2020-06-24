function hideDifficultyButtons() {
	document.getElementById("difficulty-list").style.left = `-220px`;
    document.getElementById("difficulty-list").style.filter = `opacity(0%)`;
}

function showDifficultyButtons() {
	document.getElementById("difficulty-list").style.left = `0px`;
	document.getElementById("difficulty-list").style.filter = `opacity(100%)`;
}
