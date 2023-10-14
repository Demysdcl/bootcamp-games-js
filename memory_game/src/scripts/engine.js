const emojis = [
  "💴​",
  "💴​",
  "🍕",
  "🍕",
  "🍔",
  "🍔",
  "🌍",
  "🌍",
  "🍟",
  "🍟",
  "🍪",
  "🍪",
  "🍩",
  "🍩",
  "🎸",
  "🎸",
];

let openCards = [];

const game = document.querySelector(".game");

const shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

shuffleEmojis.forEach((emoji) => {
  const box = document.createElement("div");
  box.className = "item";
  box.innerHTML = emoji;
  box.onclick = handleClick;
  game.appendChild(box);
});

function handleClick() {
  if (openCards.length < 2) {
    this.classList.add("box-open");
    openCards.push(this);
  }

  if (openCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [card1, card2] = openCards;
  if (card1.innerHTML !== card2.innerHTML) {
    card1.classList.remove("box-open");
    card2.classList.remove("box-open");
  }

  openCards = [];

  const allOpenCards = document.querySelectorAll(".box-open");

  if (allOpenCards.length === emojis.length) {
    allOpenCards.forEach((card) => {
      card.innerHTML = "🎉";
    });
    game.classList.add("game-over");
  }
}
