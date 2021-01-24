var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

function update() {
	stats.update();
	requestAnimationFrame(update);
}

requestAnimationFrame(update);