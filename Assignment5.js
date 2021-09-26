var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
var timer = 0;
var caught = false;
var fps = 10; 
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;

var backgroundReady = false;
var backgroundImage = new Image();

backgroundImage.onload = function () {
    backgroundReady = true;
};
backgroundImage.src = "covidbackground.jpg";

var virusReady = false;
var virusImage = new Image();
virusImage.onload = function () {
    virusReady = true;
};
virusImage.src = "virus.png";

var virus = {};
var virusCatch = 0;

var reset = function () {
    virus.x = 40 + (Math.random() * (canvas.width - 70));
    do {
        virus.y = 40 + (Math.random() * (canvas.height - 70));
    }
    while (virus.y < 100)
};


window.addEventListener("mousedown", onMouseDown, false);
function onMouseDown(e) {

    if (e.button != 0) return;

    mouseXinCanvas = e.clientX;
    mouseYinCanvas = e.clientY;

    if (virusBody(virus, mouseXinCanvas, mouseYinCanvas)) {
        caught = true;
        clearInterval(timer);
        timer = setInterval(reset, 20000 / fps);
        reset();
    }
    if (ResetScore(mouseXinCanvas, mouseYinCanvas)) {
        location.reload();
    }
    if (ResetSpeed(mouseXinCanvas, mouseYinCanvas)) {
        clearInterval(timer);
        timer = setInterval(reset, 20000 / fps);
        reset();
        render();
    }
};

function virusBody(bug, x, y) {

    if (x <= (bug.x + 80)
        && bug.x <= (x + 80)
        && y <= (bug.y + 80)
        && bug.y <= (y + 80)
    ) {
        fps = fps + 5;
        virusCatch++;
        return true;
    }
    return false;
};

function ResetScore(x, y) {

    if (x > (305)
        && x < (545)
        && y > (15)
        && y < (85)
    ) {
        return true;
    }
    return false;
};

function ResetSpeed(x, y) {
    if (x > (605)
        && x < (845)
        && y > (15)
        && y < (85)
    ) {
        fps = 10;
        return true;
    }
    return false;
};

var render = function () {


    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    if (backgroundReady) {
        ctx.drawImage(backgroundImage, 0, 100);
    }
    if (virusReady) {
        ctx.drawImage(virusImage, virus.x, virus.y);
    }
    if (caught == true) {
        if (backgroundReady) {
            ctx.drawImage(backgroundImage, 0, 100);
        }
        caught = false;
    }

    ctx.textBaseline = "top";
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "35px Black";
    ctx.fillText("Virus Smasher", 5, 40);

    ctx.font = "20px grey";
    ctx.fillText("Score: " + virusCatch, 10, 10);

    ctx.fillStyle = "rgb(244, 244, 244)";
    ctx.fillRect(250, 10, 250, 80);
    ctx.fillRect(520, 10, 250, 80);

    ctx.fillStyle = "rgb(244, 244, 244";
    ctx.fillRect(255, 15, 240, 70);
    ctx.fillRect(525, 15, 240, 70);

    ctx.fillStyle = "rgb(128, 128, 128)";
    ctx.font = "30px grey";
    ctx.fillText("Reset Score", 300, 35);
    ctx.fillText("Reset Speed", 560, 35);
};

var main = function () {
    render();

    requestAnimationFrame(main);
};
reset();
main();