const cursor = document.querySelector(".cursor");
const canvasIn = document.querySelector("canvas.in");
const canvasOut = document.querySelector("canvas.out");

let isMouseDown = false;

// When holding the mouse down, make the cursor bigger.
const growCursor = function () {
  cursor.classList.add("is-down");
  // cursor.innerHTML = `<span>Let go pls</span>`
}

// When I let go of the mouse, make the cursor smaller.
const shrinkCursor = function () {
  cursor.classList.remove("is-down");
  // cursor.innerHTML = `<span>Click me</span>`
}

// Move the cursor based on coordinates.
const moveCursor = function (x, y) {
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
}

// Set up the canvas
const setupCanvas = function (canvas) {
  const bodyTag = document.querySelector("body");

  const w = window.innerWidth;
  const h = bodyTag.offsetHeight;
  const dpi = window.devicePixelRatio;

  canvas.width = w * dpi;
  canvas.height = h * dpi;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";

  // Which context are we talking about? 2D? 3D? Something else?
  const context = canvas.getContext("2d");
  context.scale(dpi, dpi)

  if (canvas.classList.contains("in")) {
    context.fillStyle = "#000000";
    context.strokeStyle = "#ffffff";
  } else {
    context.fillStyle = "#ffffff";
    context.strokeStyle = "#000000";
  }

  context.lineWidth = 80;
  context.lineCap = "round";
  context.lineJoin = "round";

  context.shadowBlur = 10;
  context.shadowColor = context.strokeStyle;

  context.rect(0, 0, w, h);
  context.fill();
}

// Let's start to draw, based on the canvas, x, and y
const startDraw = function (canvas, x, y) {
  const context = canvas.getContext("2d");
  // const colors = ['red', 'blue', 'yellow', 'green'];
  // const randomNum = Math.floor(Math.random() * colors.length);
  //
  // context.strokeStyle = colors[randomNum];
  context.moveTo(x, y);
  context.beginPath();
}

// Let's draw based on three things: canvas, x, and y.
const moveDraw = function (canvas, x, y) {
  const context = canvas.getContext("2d");

  if (isMouseDown) {
    context.lineTo(x, y);
    context.stroke();
  }
  // context.rect(x - 30, y - 20, 60, 40);
  // context.fill();
}

setupCanvas(canvasIn);
setupCanvas(canvasOut);

document.addEventListener("mousedown", function(e) {
  isMouseDown = true;
  growCursor();
  startDraw(canvasIn, e.pageX, e.pageY);
  startDraw(canvasOut, e.pageX, e.pageY);
})

document.addEventListener("mouseup", function() {
  isMouseDown = false;
  shrinkCursor();
})

document.addEventListener("mousemove", function(e) {
  console.log(e);
  // e.pageX -> Where we are on the page across.
  // e.pageY -> Where we are on the page downwards.
  moveCursor(e.pageX, e.pageY);
  moveDraw(canvasIn, e.pageX, e.pageY);
  moveDraw(canvasOut, e.pageX, e.pageY);
})

window.addEventListener("resize", function() {
  setupCanvas(canvasIn);
  setupCanvas(canvasOut);
})