'use strict';

// Selecting Elements
const player_elem_0 = document.querySelector('.player--0');
const player_elem_1 = document.querySelector('.player--1');
const score_elem_0 = document.getElementById('score--0');
const score_elem_1 = document.getElementById('score--1');
const currentScore_0 = document.getElementById('current--0');
const currentScore_1 = document.getElementById('current--1');
const dice_elem1 = document.querySelector('.dice-1');
const dice_elem2 = document.querySelector('.dice-2');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');

// Starting conditions
let score, currentScore, activePlayer, playing;

const init = () => {
  playing = true;
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  currentScore_0.textContent = 0;
  currentScore_1.textContent = 0;
  score_elem_0.textContent = '0';
  score_elem_1.textContent = '0';
  dice_elem1.classList.add('hidden');
  dice_elem2.classList.add('hidden');
  player_elem_0.classList.remove('player--winner');
  player_elem_1.classList.remove('player--winner');
  player_elem_0.classList.add('player--active');
  player_elem_1.classList.remove('player--active');
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player_elem_0.classList.toggle('player--active');
  player_elem_1.classList.toggle('player--active');
};

// Rolling dice functionality
btn_roll.addEventListener('click', () => {
  if (playing) {
    // 1. Generate randome dice roll
    const dice1 = Math.trunc(Math.random() * 6) + 1;
    const dice2 = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    dice_elem1.src = `dice-${dice1}.png`;
    dice_elem2.src = `dice-${dice2}.png`;
    dice_elem1.classList.remove('hidden');
    dice_elem2.classList.remove('hidden');

    // 3. Check for rolled 1; if true, switch to next player
    if (dice1 !== 1 && dice2 !== 1) {
      if (dice1 === dice2) {
        currentScore += dice1 * 2 + 5;
      } else {
        currentScore += dice1 + dice2;
      }
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (dice1 === 1 && dice2 === 1) {
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      score[activePlayer] = 0;
      switchPlayer();
    } else {
      switchPlayer();
    }
  }
});

// Hold funcitonality
btn_hold.addEventListener('click', () => {
  if (playing) {
    // 1. Add current score to active player's total score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // Check if total score is >= 100.
    if (score[activePlayer] >= 100) {
      // If yes, finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Else switch players
      if (currentScore != 0) switchPlayer();
    }
  }
});

// Resetting functoinality
btn_new.addEventListener('click', init);

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnShowModal = document.querySelector('.btn--info');
const btnCloseModal = document.querySelector('.close-modal');

const closeModel = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const showModel = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnShowModal.addEventListener('click', showModel);

btnCloseModal.addEventListener('click', closeModel);
overlay.addEventListener('click', closeModel);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      closeModel();
    }
  }
});
