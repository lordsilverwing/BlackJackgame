// set constants
const suitsArr = ["diamonds", "hearts", "spades", "clubs"]
    //card values 2-10
const cardsPerSuit = 13;
const cardMap = {
    1 : "A",
    11 : "J",
    12 : "Q",
    13 : "K"
}
function getCardClasses(suit, value, isFaceDown){
    const output = ["card", "large"]
     if (isFaceDown){
         output.push("back-red")
     } else {
         output.push(suitsArr[suit])
         output.push(cardMap[value] || `r${value < 10 ? "0" : ""}${value}`)
     }
    return output;
}
    // card j,q,k = 10
    // card ace = 1 or 11 depending on handTotal
//set global variables
    //hand total
let handTotal;
    //deck
let deck = generateDeck();
    //winner
let winner;
//cache element
    //current player, computer hand
const handEls = {
    player: document.getElementById('playerhand'),
    computer: document.getElementById('computerhand')
}
    // message about game state(win, bust, lose, blackjack)
const gameMessage = document.getElementById('message')
    //win loses and ties
const scoreEls = {
    wins: document.getElementById('wintotal'),
    losses: document.getElementById('losstotal'),
    ties: document.getElementById('tietotal')
}
// event listeners
    //deal
document.getElementById("deal").addEventListener("click", Deal)
    //hit
let hitButton = document.getElementById("hit")
hitButton.addEventListener("click", Hit)
    //hold
document.getElementById("hold").addEventListener("click", Hold)

init() 
//set up init
function init(){
    //set scores = 0
    scores = {
        player: 0,
        computer: 0,
        ties: 0
    }
    // set player hand to empty {}
    playerHand = {}
    // set computer hand to empty {}
    computerHand = {}
    //set winner to null
    winner = null;
    //render()
    render();
}
// render function
function render(){

}
    // update score to dom
    // update cards to dom
 // hand total
 function getHandTotal(hand){
     const output = {
         high: 0,
         low: 0
     }
    const cards = [...hand].sort(function(a, b){
         return b.value - a.value;
     })
     for (i = 0; i < cards.length; i++){     
         output.low += Math.min(cards[i].value, 10)
         output.high += Math.min(cards[i].value, 10)
         if (cards[i].value === 1 && output.high < 12){
            output.high += 10;
         }
     }

     return output
 }
    // reduce hand arrays
    // create two arrays, high total and low total to handle aces   
// evaluate hand total
function determineHandValue(handTotal){
    return handTotal.high > 21 ? handTotal.low : handTotal.high;
}

function determinePlayerOutcome(player, computer){
    const playerTotal = determineHandValue(getHandTotal(playerHand));
    const computerTotal = determineHandValue(getHandTotal(computerHand));
    if (playerTotal === computerTotal){
        return 0
    } else if (playerTotal > computerTotal){
        return 1
    } else {
        return -1;
    }
}
    // if player hand is 21 with two cards (black jack!)
    // else if player hand is 21 with more than two cards (end player turn)
    // else if player hand is 21 or more (end player turn, bust)
    // if computer hand is 21 with two cards (computer wins unless player won)
    // else if computer hand is 21 or lower compare to player highest wins unless tie
    // else if computer busts and player is lower than 21 player wins
    // else if both computer and player bust = tie
// set up initiate deal
function Deal(){
    shuffleDeck(deck)
    playerHand = deck.slice(0, 2);
    computerHand = deck.slice(2, 4);
    computerHand[0].isFaceDown = true;
    hit = 4;
    hitButton.disabled = false;
    gameMessage.innerText = "The Dealer and Player have been dealt two cards!"
}
    //deals two cards to player
    // deal one visible and one hidden to computer
// set up hit button
let hit;
function Hit(){
    console.log("Hit!")
    playerHand.push(deck[hit])
    hit++;
    if (getHandTotal(playerHand).low > 21){
        hitButton.disabled = true;
        gameMessage.innerText = "Player has Busted!"
    } else if (getHandTotal(playerHand).low === 21){
        gameMessage.innerText = "I to like to live dangerously"
    }
}
    //add random card to hand, recalculate total of hand
// set up hold button
function Hold(){
    hitButton.disabled = true;
    computerTurn()   
}
    //disables hit, intiates computer turn
// computer turn
function computerTurn(){
    computerHand[0].isFaceDown = false;
    while (getHandTotal(computerHand).low <= 15){
        computerHand.push(deck[hit])
        hit++
        computerTurn();
    }
    if (getHandTotal(computerHand).low > 21){
        gameMessage.innerText = "Dealer has busted!"
    }
    //if (getHandTotal(computerHand).low <= 15){
     //   computerHand.push(deck[hit])
     //   hit++;
     //   computerTurn();
    //} else if (getHandTotal(computerHand).low > 21){
     //   gameMessage.innerText = "Dealer has busted!"
   // }
    //determinePlayerOutcome(playerHand, computerHand)
}
    // computer will draw card if total less than 15
// generate deck
function generateDeck(){
    const output = []
    for (let i = 0; i < suitsArr.length; i++){
        for (let j = 1; j <= cardsPerSuit; j++){
            output.push({suit : i, value : j})
        }
    }
    return output;
}
function shuffleDeck(deck){
   return deck.sort(() => Math.random() - Math.random())
}