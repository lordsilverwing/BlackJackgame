// set constants
const suitsArr = ["diamonds", "hearts", "spades", "clubs"]
//card values 2-10
const cardsPerSuit = 13;
const cardMap = {
	1: "A",
	11: "J",
	12: "Q",
	13: "K"
}

function getCardClasses(suit, value, isFaceDown) {
	const output = ["card", "large"]
	if (isFaceDown) {
		output.push("back-red")
	} else {
		output.push(suitsArr[suit])
		// card j,q,k = 10 
		output.push(cardMap[value] || `r${value < 10 ? "0" : ""}${value}`)
	}
	return output;
}
// card ace = 1 or 11 depending on handTotal
//set global variables
//hand total
let handTotal;
//deck
let deck = generateDeck();
//winner
let handWinner;
let chips;
let bet;
//cache element
//current player, computer hand
const handEls = {
	player: document.getElementById('playerhand'),
	computer: document.getElementById('computerhand')
}
const currentBet = document.getElementById('currentbet')
const totalChips = document.getElementById('totalchips')
// message about game state(win, bust, lose, blackjack)
const gameMessage = document.getElementById('message')
//win loses and ties
const BET_INCREMENT = 10;
// event listeners
//deal
dealButton = document.getElementById("deal")
dealButton.addEventListener("click", initDeal)
//hit
let hitButton = document.getElementById("hit")
hitButton.addEventListener("click", initHit)
//hold
let holdButton = document.getElementById("stand")
holdButton.addEventListener("click", initStand)
// increase bet
let incBetButton = document.getElementById("raiseBet")
incBetButton.addEventListener("click", increaseBet)
// reduce current bet
let redBetButton = document.getElementById("reduceBet")
redBetButton.addEventListener("click", reduceBet)
let austinPowers = document.getElementById("austinpowers")
let numberTwo = document.getElementById("number2")
//reset button to reset game/total
document.getElementById("reset").addEventListener("click", resetGame)
init()
//set up init
function init() {
	//set current chips
	chips = 100;
	//set current bet
	bet = 0;
	// set player hand to empty {}
	playerHand = {}
	// set computer hand to empty {}
	computerHand = {}
	//set winner to null
	handWinner = null;
	displayMessage("Welcome to BlackJack! Adjust your bet and hit deal to begin!");
	//render()
	render();
}

function removeAllChildren(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}
// render function
function render() {
	// update cards to dom
	removeAllChildren(handEls.player)
	removeAllChildren(handEls.computer)
	generateCardMarkup(playerHand).forEach(card => handEls.player.appendChild(card));
	generateCardMarkup(computerHand).forEach(card => handEls.computer.appendChild(card));
	//update betting area to dom
	currentBet.innerText = bet;
	totalChips.innerText = chips;
}
// hand total
function getHandTotal(hand) {
	// create two arrays, high total and low total to handle aces
	const output = {
		high: 0,
		low: 0
	}
	const cards = [...hand].sort(function(a, b) {
		return b.value - a.value;
	})
	for (i = 0; i < cards.length; i++) {
		output.low += Math.min(cards[i].value, 10)
		output.high += Math.min(cards[i].value, 10)
		if (cards[i].value === 1 && output.high < 12) {
			output.high += 10;
		}
	}
	return output
}
// evaluate hand total
function determineHandValue(handTotal) {
	return handTotal.high > 21 ? handTotal.low : handTotal.high;
}

function determinePlayerOutcome() {
	const playerTotal = determineHandValue(getHandTotal(playerHand));
	const computerTotal = determineHandValue(getHandTotal(computerHand));
	if (playerTotal > 21) {
		displayMessage("Player has busted and lost");
		handWinner = -1;
	} else if (computerTotal > 21) {
		displayMessage("The dealer has busted! The player has won!");
		handWinner = 1;
	} else if (playerTotal === 21 && playerHand.length === 2) {
		displayMessage("The player has gotten BlackJack and has won!");
		handWinner = 1.5;
	} else if (playerTotal > computerTotal) {
		displayMessage("The player has won!");
		handWinner = 1;
	} else if (playerTotal === computerTotal) {
		displayMessage("Push! The player and computer have tied");
		handWinner = 0;
	} else {
		displayMessage("The Dealer has won!");
		handWinner = -1;
	}
	disableBetting(false);
	betWinLoss();
	if (chips >= 200) {
		endGame("You've doubled your earnings and won completely! Good job!");
	} else if (chips === 0) {
		endGame("You've gone broke!");
	}
}

function endGame(message) {
	displayMessage(message);
	disableBetting(true);
	disableHitHold(true);
}

function disableBetting(toggle) {
	dealButton.disabled = incBetButton.disabled = redBetButton.disabled = toggle;
}

function disableHitHold(toggle) {
	hitButton.disabled = holdButton.disabled = toggle;
}
// if computer hand is 21 with two cards (computer wins unless player won)
// else if computer hand is 21 or lower compare to player highest wins unless tie
// else if computer busts and player is lower than 21 player wins
// else if both computer and player bust = tie
// set up initiate deal
function initDeal() {
	deck.forEach(card => card.isFaceDown = false)
	shuffleDeck(deck)
	//deals two cards to player
	playerHand = deck.slice(0, 2);
	computerHand = deck.slice(2, 4);
	// deal one visible and one hidden to computer
	computerHand[0].isFaceDown = true;
	hit = 4;
	disableHitHold(false);
	disableBetting(true);
	displayMessage("The Dealer and Player have been dealt two cards!");
	// if player hand is 21 with two cards (black jack!)
	if (getHandTotal(playerHand).high === 21) {
		disableHitHold(true)
		determinePlayerOutcome();
	}
	render();
}
// set up hit button
let hit;

function initHit() {
	disableHitHold(true);
	let timeToWait = 0;
	if (getHandTotal(playerHand).low === 21) {
		timeToWait = 5000;
		displayMessage("I, too, like to live dangerously")
        austinPowers.style = ""
	}
	if (getHandTotal(playerHand).low === 20) {
		timeToWait = 5000;
		displayMessage("I like to live dangerously")
        numberTwo.style = ""
	}
	setTimeout(() => {
		//add random card to hand, recalculate total of hand
		playerHand.push(deck[hit])
		hit++;
		displayMessage("Player has been dealt a card!")
        austinPowers.style = "display:none"
        numberTwo.style = "display:none"
		// if player hand is 21 with more than two cards (end player turn)
		// else if player hand is 21 or more (end player turn, bust)
		if (getHandTotal(playerHand).low > 21) {
			disableHitHold(true);
			determinePlayerOutcome();
		} else {
			disableHitHold(false);
		}
		render();
	}, timeToWait)
}
// set up hold button
function initStand() {
	//disables hit, intiates computer turn
	disableHitHold(true);
	computerTurn()
	determinePlayerOutcome();
}
// computer turn
function computerTurn() {
	computerHand[0].isFaceDown = false;
	// computer will draw card if total less than 15
	while (getHandTotal(computerHand).low <= 16 && getHandTotal(computerHand).high !== 21) {
		computerHand.push(deck[hit])
		hit++
		render();
	}
	if (getHandTotal(computerHand).low > 21) {
		displayMessage("Dealer has busted!");
	}
	render();
}
//increase bet by 10
function increaseBet() {
	bet = Math.min(bet + BET_INCREMENT, chips);
	render();
}
//reduces bet by 10
function reduceBet() {
	bet = Math.max(bet - BET_INCREMENT, 0);
	render();
}

function betWinLoss() {
	chips += bet * handWinner
	bet = Math.min(bet, chips)
	render();
}
// generate deck
function generateDeck() {
	const output = []
	for (let i = 0; i < suitsArr.length; i++) {
		for (let j = 1; j <= cardsPerSuit; j++) {
			output.push({
				suit: i,
				value: j
			})
		}
	}
	return output;
}

function shuffleDeck(deck) {
	return deck.sort(() => Math.random() - Math.random())
}
//add card values to generate cards in render 
function generateCardMarkup(hand) {
	const output = []
	for (let i = 0; i < hand.length; i++) {
		const tempCard = document.createElement("div");
		tempCard.classList.add(...getCardClasses(hand[i].suit, hand[i].value, hand[i].isFaceDown))
		output.push(tempCard)
	}
	return output;
}

function displayMessage(message) {
	gameMessage.innerText = message
}

function resetGame() {
	disableBetting(false);
	init();
}