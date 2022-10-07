// creating canvas

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width =  650;
canvas.height = 600;



document.getElementById("theCanvas").appendChild(canvas);
var lbGo = false;
var bgImage = new Image();
bgImage.onload = function () {
  lbGo = true;
};

// creating background image
bgImage.src = "BU.jpeg";
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
  bugReady = true;
};

// creating bug image
bugImage.src = "bug.png";
bugImage.style.width="20%";
var score = 0;
//setting hop time
var hoptime = 2000;
var hop = setInterval(function () {
  hopLocation();
}, hoptime);
var lb = {
  speed: 256,
};

// function for hoping location (x-axis and y-axis in canvas)
canvas.addEventListener("mousedown", clicked, false);
function clicked(e) {
  e.preventDefault();
  var x = e.clientX;
  var y = e.clientY;
  if (x > lb.x && x < lb.x + 170 && y > lb.y && y < lb.y + 278) {
    score += 10;
    hopLocation();
    if (hoptime - 100 >= 50) {
      clearInterval(hop);
      hoptime -= 100;
      hop = setInterval(function () {
        hopLocation();
      }, hoptime);
    }
  }
}

// reset location function
var hopLocation = function () {
  lb.x = 20 + Math.random() * (canvas.width - 84);
  lb.y = 20 + Math.random() * (canvas.height - 84);
};

// reset speed function
var resetSpeed = function () {
  clearInterval(hop);
  hoptime = 2000;
  hop = setInterval(function () {
    hopLocation();
  }, hoptime);
};

// reset score function
var resetScore = function () {
  score = 0;
  resetSpeed();
};


var render = function () {
  if (lbGo) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (bugReady) {
    ctx.drawImage(bugImage, lb.x, lb.y);
  }

  // ctx.fillStyle = "rgb(0, 0, 250)";
  // ctx.font = "24px Helvetica";
  // ctx.textAlign = "left";
  // ctx.textBaseline = "top";
  document.getElementById("score").innerHTML = "Score : " + score;
};


var main = function () {
  render();
  requestAnimationFrame(main);
};


var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;


main();
