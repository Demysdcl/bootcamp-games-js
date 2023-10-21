const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },

  button: document.getElementById("next-duel"),
};

const { score, cardSprites, fieldCards, button } = state;

const ICONS_PATH = "./src/assets/icons";

const cardData = [
  {
    id: 0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    img: `${ICONS_PATH}/dragon.png`,
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 1,
    name: "Dark Magician",
    type: "Rock",
    img: `${ICONS_PATH}/magician.png`,
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 2,
    name: "Exodia",
    type: "Scissors",
    img: `${ICONS_PATH}/exodia.png`,
    WinOf: [0],
    LoseOf: [1],
  },
];

const playersKey = {
  player: "player",
  computer: "computer",
};

function getRandomCardId() {
  return Math.floor(Math.random() * cardData.length);
}

function drawDefaultCard() {
  cardSprites.avatar.src = `${ICONS_PATH}/card-back.png`;
  cardSprites.name.innerText = "Select";
  cardSprites.type.innerText = `a card`;
}

function drawSelectedCard(index) {
  const { img, name, type } = cardData[index];
  cardSprites.avatar.src = img;
  cardSprites.name.innerText = name;
  cardSprites.type.innerText = `Attribute: ${type}`;
}

function removeAllCard() {
  const cards = document.querySelectorAll(".card-box img");
  cards.forEach((item) => item.remove());
}

function playAudio(result) {
  if (result !== "Draw") {
    const audio = new Audio(`./src/assets/audios/${result.toLowerCase()}.wav`);
    audio.play();
    audio.volume = 0.2;
  }
}

function checkDuelResult(playerCard, computerCard) {
  if (playerCard.WinOf.includes(computerCard.id)) {
    score.playerScore++;
    return "Win";
  }

  if (playerCard.LoseOf.includes(computerCard.id)) {
    score.computerScore++;
    return "Lose";
  }

  return "Draw";
}

function updateScore() {
  score.scoreBox.innerText = `Win: ${score.playerScore} | Lose: ${score.computerScore}`;
}

function drawButton(result) {
  button.style.display = "block";
  button.innerText = result;
}

function setCardsFieldDisplay(display) {
  fieldCards.player.style.display = display;
  fieldCards.computer.style.display = display;
}

function setCardsFieldImages(playerCard, computerCard) {
  fieldCards.player.src = playerCard.img;
  fieldCards.computer.src = computerCard.img;
}

function setCardsField(cardId) {
  removeAllCard();

  setCardsFieldDisplay("block");

  const computerCardId = getRandomCardId();

  const computerCard = cardData[computerCardId];
  const playerCard = cardData[cardId];

  setCardsFieldImages(playerCard, computerCard);

  const duelResult = checkDuelResult(playerCard, computerCard);

  playAudio(duelResult);
  updateScore(duelResult);
  drawButton(duelResult);
  drawDefaultCard();
}

async function createCardImage(fieldSide) {
  const randonId = getRandomCardId();

  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", `${ICONS_PATH}/card-back.png`);
  cardImage.setAttribute("data-id", randonId);

  if (playersKey.player === fieldSide) {
    cardImage.classList.add("card");
    cardImage.addEventListener("mouseover", () => drawSelectedCard(randonId));
    cardImage.addEventListener("mouseleave", drawDefaultCard);
    cardImage.addEventListener("click", () => setCardsField(randonId));
  }

  return cardImage;
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const cardImage = await createCardImage(fieldSide);
    document.getElementById(`${fieldSide}-cards`).appendChild(cardImage);
  }
}

function init() {
  setCardsFieldDisplay("none");
  drawCards(5, playersKey.player);
  drawCards(5, playersKey.computer);

  const bgm = document.getElementById("bgm");
  bgm.play();
}

function resetDuel() {
  init();
  drawDefaultCard();
  button.style.display = "none";
}

init();
