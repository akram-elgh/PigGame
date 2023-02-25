// declaring the selectors
const newGame = document.querySelector(".new-game");
const rollDice = document.querySelector(".roll-dice");
const hold = document.querySelector(".hold");
const dice = document.querySelector(".dice");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const currentScore1 = document.querySelector(".score-1");
const currentScore2 = document.querySelector(".score-2");
const totalScore1 = document.querySelector(".total-1");
const totalScore2 = document.querySelector(".total-2");

// implementing the functions
function generateRanNum() {
  return Math.floor(Math.random() * 6) + 1;
}
var current = 0;
var playing = true;
var active = 1;

function increaseCurrentScore(score) {
  current += score;
  // we'll change the current score for the current player
  const currentPlayerScore = document.querySelector(`.score-${active}`);
  currentPlayerScore.textContent = current;
}

function changeActivePlayer() {
  // Changing the current player score back to 0
  document.querySelector(`.score-${active}`).textContent = 0;
  // Changing the global current score back to 0
  current = 0;
  // Toggling the class active for both player 1 and 2
  player1.classList.toggle("active");
  player2.classList.toggle("active");
  // Changing the active player to the other player
  active = active == 1 ? 2 : 1;
}

function holdScore() {
  // Getting the current total score of the active player
  const totalActive = document.querySelector(`.total-${active}`);
  const total = Number(totalActive.textContent);
  // Updating the total score of the active player
  totalActive.innerHTML = current + total;
  // Checking for a winner
  if (current + total >= 100) {
    playing = false;
    dice.style.backgroundImage = "";
    document.querySelector(`.player${active}`).classList.add("winner");
    document.getElementById(`winner-${active}`).textContent = "Winner!";
  } else {
    // Changing the player
    changeActivePlayer();
  }
}

rollDice.addEventListener("click", () => {
  if (playing) {
    // 1. Get random number between 1 and six
    const ranNum = generateRanNum();
    // 2. Showing the corresponding dice image
    const url = "images/" + ranNum + ".png";
    dice.style.backgroundImage = "url(" + url + ")";
    // 3. if the dice is not 1 then we will increase the score else we will change the player
    if (ranNum != 1) {
      increaseCurrentScore(ranNum);
    } else {
      changeActivePlayer();
    }
  }
});

hold.addEventListener("click", () => {
  if (playing) holdScore();
});

newGame.addEventListener("click", () => {
  // Setting everything to the initial state
  playing = true;
  current = 0;
  active = 1;
  player1.classList.add("active");
  player2.classList.remove("active");
  currentScore1.innerHTML = 0;
  currentScore2.innerHTML = 0;
  totalScore1.innerHTML = 0;
  totalScore2.innerHTML = 0;
  dice.style.backgroundImage = "";
  document.querySelector(".winner").children[1].textContent = "";
  document.querySelector(".winner").classList.remove("winner");
});
