const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
    play: document.querySelector(".play"),
  },
  values: {
    hitPosition: 0,
    score: 0,
    lives: 3,
    currentTime: 60,
    initialized: false,
  },
  actions: {
    countDownTimerId: null,
    timerId: null,
  },
};

function playGame() {
  state.actions.countDownTimerId = setInterval(countDown, 1000);
  state.actions.timerId = setInterval(positionEnemy, 800);
  state.view.play.style.visibility = "hidden";
  state.view.score.textContent = 0;
  state.view.timeLeft.textContent = 60;
  state.view.lives.textContent = 3;
  state.values.initialized = true;
}

function gameOver() {
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);
  setTimeout(() => {
    state.values.initialized = false;
    alert("Game Over! O seu resultado foi:" + state.values.score);
    state.values.currentTime = 60;
    state.values.lives = 3;
    state.values.score = 0;
    state.view.play.style.visibility = "visible";
  }, 300);
}

function countDown() {
  state.view.timeLeft.textContent = --state.values.currentTime;

  if (state.values.currentTime <= 0) {
    gameOver();
  }
}

function positionEnemy() {
  state.view.squares.forEach((square) => square.classList.remove("enemy"));

  const randomId = Math.floor(Math.random() * 9);
  const randomSquare = state.view.squares[randomId];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function playSound(name) {
  const audio = new Audio(`./src/audios/${name}.m4a`);
  audio.volume = 0.1;
  audio.play();
}

function increaseScore() {
  state.view.score.textContent = ++state.values.score;
  state.values.hitPosition = null;
  playSound("hit");
}

function descreaseLife() {
  state.view.lives.textContent = `x${--state.values.lives}`;
  playSound("fail");
  if (state.values.lives <= 0) {
    gameOver();
  }
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (state.values.initialized) {
        square.id === state.values.hitPosition
          ? increaseScore()
          : descreaseLife();
      }
    });
  });
}

function initizalize() {
  addListenerHitBox();
}

initizalize();
