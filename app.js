'use strict';

const diceEl = document.querySelector('.dice');
const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');
const btnNew = document.querySelector('.new-game');
const btnHold = document.querySelector('.hold');
const btnRoll = document.querySelector('.roll');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;

let scores = [0, 0],
  currentScore = 0,
  activePlayer = 0,
  playing = true;

const swithPlayer = () => {
  currentScore = 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};

btnRoll.addEventListener('click', () => {
  if (playing) {
    const dice = Math.round(Math.random() * 5) + 1;

    diceEl.src = `./assets/dice-${dice}.png`;

    diceEl.setAttribute('src', `./assets/dice-${dice}.png`);
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swithPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      btnHold.classList.add('hidden');
      btnRoll.classList.add('hidden');
      diceEl.classList.add('hidden');
      btnNew.classList.toggle('btn-New-move');
      if (activePlayer) {
        btnNew.classList.add('new-move-r');
      } else {
        btnNew.classList.add('new-move-l');
      }

      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('winner');

      document.querySelector(`#name--${activePlayer}`).textContent = 'Winner';
    } else {
      swithPlayer();
    }
  }
});

btnNew.addEventListener('click', () => {
  scores = [0, 0];
  currentScore = 0;
  playing = true;

  score1El.textContent = 0;
  score0El.textContent = 0;
  diceEl.classList.add('hidden');
  document.querySelector(`.player--${activePlayer}`).classList.remove('winner');
  document.querySelector(`#name--${activePlayer}`).textContent = `PLAYER ${
    activePlayer === 0 ? '1' : '2'
  }`;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  if (activePlayer) {
    btnNew.classList.remove('new-move-r');
  } else {
    btnNew.classList.remove('new-move-l');
  }

  setTimeout(() => {
    btnHold.classList.remove('hidden');
    btnRoll.classList.remove('hidden');
  }, 800);
  activePlayer = activePlayer === 0 ? 0 : 0;
  player0.classList.add('player-active');
  player1.classList.remove('player-active');
});
