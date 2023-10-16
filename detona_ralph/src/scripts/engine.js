const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
    play: document.querySelector(".play"),
    results: document.querySelector(".results"),
    resultScore: document.querySelector(".results h3"),
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

const { actions, values, view } = state;

function playGame() {
  actions.countDownTimerId = setInterval(countDown, 1000);
  view.results.classList.remove("show");
  actions.timerId = setInterval(positionEnemy, 800);
  view.play.style.visibility = "hidden";
  view.score.textContent = 0;
  view.timeLeft.textContent = 60;
  view.lives.textContent = 3;
  values.initialized = true;
}

function gameOver() {
  clearInterval(actions.countDownTimerId);
  clearInterval(actions.timerId);
  setTimeout(() => {
    values.initialized = false;
    view.results.classList.add("show");
    view.resultScore.innerHTML = `score: ${values.score}`;
    values.currentTime = 60;
    values.lives = 3;
    values.score = 0;
    view.play.style.visibility = "visible";
  }, 300);
}

function countDown() {
  view.timeLeft.textContent = --values.currentTime;

  if (values.currentTime <= 0) {
    gameOver();
  }
}

function positionEnemy() {
  view.squares.forEach((square) => square.classList.remove("enemy"));

  const randomId = Math.floor(Math.random() * 9);
  const randomSquare = view.squares[randomId];
  randomSquare.classList.add("enemy");
  values.hitPosition = randomSquare.id;
}

function playSound(name) {
  const audio = new Audio(`./src/audios/${name}.m4a`);
  audio.volume = 0.1;
  audio.play();
}

function increaseScore() {
  view.score.textContent = ++values.score;
  playSound("hit");
  values.hitPosition = null;
}

function descreaseLife() {
  view.lives.textContent = `x${--values.lives}`;
  playSound("fail");
  if (values.lives <= 0) {
    gameOver();
  }
}

function addListenerHitBox() {
  view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (values.initialized) {
        square.id === values.hitPosition ? increaseScore() : descreaseLife();
      }
    });
  });
}

function initizalize() {
  addListenerHitBox();
}

initizalize();
