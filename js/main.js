var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;

var mx;
var my;//mouse axis

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var data;

var wave;

var halo;

var dust;
var dustPic = [];

var settings = { difficulty: "normal", fishSpeed: 1 };
var difficulties = {
    easy: { fadeInterval: 500, fruitCount: 22, fruitSpeed: 0.8 },
    normal: { fadeInterval: 300, fruitCount: 15, fruitSpeed: 1 },
    hard: { fadeInterval: 200, fruitCount: 10, fruitSpeed: 1.3 }
};
function movementRatio() {
    return Math.pow(0.98, settings.fishSpeed * deltaTime / (1000 / 60));
}
function updateFeedClock() {
    var interval = difficulties[settings.difficulty].fadeInterval;
    var total = interval * 20;
    var remaining = data.gameOver ? 0 : Math.max(0, total - baby.babyBodyCount * interval - baby.babyBodyTimer);
    var urgent = remaining <= total * 0.3;
    document.getElementById("feed-clock").className = "feed-clock" + (urgent ? " urgent" : "");
    document.getElementById("feed-time").textContent = "Next feed in: " + (Math.ceil(remaining / 100) / 10).toFixed(1) + "s";
    document.getElementById("feed-progress").value = remaining / total;
    var warning = data.gameOver ? " Game over — play again to restart." : urgent ? " Feed the baby now!" : "";
    var status = document.getElementById("feed-warning");
    if (status.textContent !== warning) status.textContent = warning;
}
function resetGame() {
    ane = new aneObj(); ane.init();
    fruit = new fruitObj(); fruit.init();
    mom = new momObj(); mom.init();
    baby = new babyObj(); baby.init();
    data = new dataObj();
    wave = new waveObj(); wave.init();
    halo = new haloObj(); halo.init();
    dust = new dustObj(); dust.init();
    mx = canWidth * 0.5; my = canHeight * 0.5;
    lastTime = Date.now(); deltaTime = 0;
    document.getElementById("game-over").hidden = true;
    updateFeedClock();
    document.getElementById("difficulty-help").textContent =
        "Time between feeds: " + (difficulties[settings.difficulty].fadeInterval * 20 / 1000) + " seconds. " +
        "Fish speed: 0.5× (slow) to 2× (fast).";
}
function setupControls() {
    document.getElementById("restart").addEventListener("click", resetGame);
    document.getElementById("play-again").addEventListener("click", function() {
        resetGame(); document.getElementById("restart").focus();
    });
    document.getElementById("difficulty").addEventListener("change", function(e) {
        settings.difficulty = e.target.value; resetGame();
    });
    document.getElementById("fish-speed").addEventListener("input", function(e) {
        settings.fishSpeed = Number(e.target.value);
        document.getElementById("speed-value").textContent = settings.fishSpeed + "×";
    });
}
document.body.onload = game;
function game()
{
	init();
	setupControls();
	resetGame();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init()
{
	//获得canvas
	can1 = document.getElementById("canvas1");//fishes,dust,UI,circle
	ctx1 = can1.getContext('2d');	
	can2 = document.getElementById("canvas2");//background,ane,fruits
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src = "src/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	for(var i = 0; i < 8; i++)
	{
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail0.png";//tail sucai not enough
	}

	for(var i = 0; i < 2; i++)
	{
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye" + i + ".png";
	}

	for(var i = 0; i < 20; i++)
	{
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade" + i + ".png";
	}

	for(var i = 0; i < 8; i++)
	{
		momTail[i] = new Image();
		momTail[i].src = "./src/bigTail" + i + ".png";
	}	
	for(var i = 0; i < 2; i++)
	{
		momEye[i] = new Image();
		momEye[i].src = "./src/bigEye" + i + ".png";
	}	
	for(var i = 0; i < 8; i++)
	{
		momBodyOrange[i] =new Image();
		momBodyBlue[i] =new Image();
		momBodyOrange[i].src = "./src/bigSwim" + i + ".png";
		momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";		
	}

	data = new dataObj();

	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for(var i = 0; i < 7; i++)
	{
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" + i +".png";
	}
	dust = new dustObj();
	dust.init();

}

function gameloop()
{
	window.requestAnimFrame(gameloop);//setInterval, setTimeout,
	var now = Date.now();
	deltaTime = now - lastTime;
	if (deltaTime > 40) deltaTime = 40;
	lastTime = now;

	if (data.gameOver) return;
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0, 0, canWidth,canHeight);
	mom.draw();
	baby.draw();
	momFruitsCollision();
	momBabyCollision();

	data.draw();
	updateFeedClock();
	
	wave.draw();
	halo.draw();
	dust.draw();
    if (data.gameOver) {
        document.getElementById("final-score").textContent = "Final score: " + data.score;
        document.getElementById("game-over").hidden = false;
        document.getElementById("play-again").focus();
    }

}

function onMouseMove(e)
{
    if (!data.gameOver) {
        var rect = can1.getBoundingClientRect();
        mx = (e.clientX - rect.left) * canWidth / rect.width;
        my = (e.clientY - rect.top) * canHeight / rect.height;
    }
}
