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

function setCardsField(randonId) {
  console.log("clicked", randonId);
}

function drawDefaultCard() {
  cardSprites.avatar.src = `${ICONS_PATH}/card-back.png`;
  cardSprites.name.innerText = "Selecione";
  cardSprites.type.innerText = `uma carta`;
}

function drawSelectedCard(index) {
  const { img, name, type } = cardData[index];
  cardSprites.avatar.src = img;
  cardSprites.name.innerText = name;
  cardSprites.type.innerText = `Attribute: ${type}`;
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
  drawCards(5, playersKey.player);
  drawCards(5, playersKey.computer);
}

init();
