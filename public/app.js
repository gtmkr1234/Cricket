// public/app.js

const socket = io();

socket.on('scoreUpdate', (score) => {
  updateScore(score);
});

function updateScore(score) {
  const scoreUpdateElement = document.getElementById('scoreUpdate');
  scoreUpdateElement.textContent = `Score: ${score}`;
}
