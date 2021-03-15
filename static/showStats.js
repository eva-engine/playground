var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

function update() {
	stats.update();
	requestAnimationFrame(update);
}

requestAnimationFrame(update);