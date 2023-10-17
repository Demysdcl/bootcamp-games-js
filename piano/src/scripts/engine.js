let audio = new Audio("src/tunes/a.wav");
const mappedKeys = [];

const playTune = (key) => {
  if (mappedKeys.includes(key)) {
    audio.src = `src/tunes/${key}.wav`;
    audio.play();
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
      clickedKey.classList.remove("active");
    }, 150);
  }
};

document.addEventListener("keydown", (event) => {
  playTune(event.key);
});

const pianoKeys = document.querySelectorAll(".piano-keys .key");

pianoKeys.forEach((key) => {
  mappedKeys.push(key.dataset.key);
  key.addEventListener("click", () => playTune(key.dataset.key));
});

const toggleKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

const keysChecked = document.querySelector(".keys-check input");
keysChecked.addEventListener("click", toggleKeys);

const volume = document.querySelector(".volume-slider input");
volume.addEventListener("change", (event) => {
  audio.volume = event.target.value;
});
