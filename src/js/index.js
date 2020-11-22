import '../sass/main.scss';
const confetti = require("canvas-confetti")

var myCanvas = document.getElementById('myCanvas');

var myConfetti = confetti.create(myCanvas, {
  resize: true,
  useWorker: true
});
myConfetti({
  particleCount: 2000,
  spread: 50,
  ticks: 2000,
  // any other options from the global
  // confetti function
});