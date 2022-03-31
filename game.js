var numCards = cards.length;
var deck = [];
var playerHand = []; // recipiant: player
var houseHand = []; // recipiant: house
var playerMoney = 500;
var playerScore,
  houseScore,
  betAmount = 0;
var bust = false;

// BUILD DECK
cards.forEach((card) => {
  deck.push(card);
});

// (function () {
// })();

// deal cards to either PLAYER or HOUSE
function dealCards(recipiant, amount) {
  for (let i = 0; i < amount; i++) {
    let rendomNum = Math.floor(Math.random() * numCards);
    recipiant.push(deck[rendomNum]);

    // REMOVE THE CARD FROM THE DECK ONCE ITS DELT TO THE PLAYER
    deck.splice(rendomNum, 1);
    numCards--;
  }
}

// DEAL INITIAL HAND OF 2 CARDS TO PLAYER AND 1 CARD TO HOUSE
(function () {
  dealCards(playerHand, 2);
  dealCards(houseHand, 1);
})();

// DISPLAY CARDS FROM PLAYERS HAND
function showPlayersCards() {
  let playerCards = "";
  playerHand.forEach((card) => {
    playerCards += `
  <img src="${card.img}" alt="${card.name}">
  `;
  });
  document.getElementById("displayPlayerCards").innerHTML = playerCards;
}

// DISPLAY CARDS FROM HOUSE HAND
function showHouseCards() {
  let houseCards = "";
  houseHand.forEach((card) => {
    houseCards += `
  <img src="${card.img}" alt="${card.name}">
  `;
  });
  document.getElementById("displayHouseCards").innerHTML = houseCards;
}

// DISPLAY PLAYERS SCORE
// function showScores() {
//   document.getElementById("displayPlayerScore").innerHTML =
//     getScore(playerHand);
//   document.getElementById("displayhouseScore").innerHTML = getScore(houseHand);
// }

function updateScores() {
  playerScore = getScore(playerHand);
  houseScore = getScore(houseHand);
}

// CHECK IF THE PLAYER HAS BUST
function checkGameEnd(playerScore) {
  if (playerScore > 21) location.reload();
}

// DEAL ANOTHER CARD TO PLAYER
function hit(recipiant) {
  dealCards(recipiant, 1);
  checkGameEnd(getScore(recipiant));
}

function sit() {
  playerScore = getScore(playerHand);

  dealCards(houseHand, 1);
  if (houseScore < 16) {
    dealCards(houseHand, 1);
  } else {
    endGame();
  }
}

// CALCULATE AND RETURN PLAYERS SCORE
function getScore(player) {
  let score = 0;
  let aces = 0;
  player.forEach((card) => {
    if (card.name == "Ace") {
      aces += 1;
      score += card.value[1];
    } else {
      score += card.value;
    }
  });
  if (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  } else if (score > 21) {
    bust = true;
  }
  return score;
}
