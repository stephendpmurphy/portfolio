import '../sass/main.scss';
const confetti = require("canvas-confetti")

var myCanvas = document.getElementById('myCanvas');

var myConfetti = confetti.create(myCanvas, {
  resize: true,
  useWorker: true
});
myConfetti({
  particleCount: 100,
  spread: 160
  // any other options from the global
  // confetti function
});