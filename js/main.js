// set constants
    //card values 2-10
    // card j,q,k = 10
    // card ace = 1 or 11 depending on handTotal
//set global variables
    //hand total
let handTotal;
    //deck
let deck;
    //winner
let winner;
//cache element
    //current player, computer hand
const handEls = {
    player:
    computer:
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
document.getElementById("hit").addEventListener("click", Hit)
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
    // update score to dom
    // update cards to dom
// evaluate hand total
    // if player hand is 21 with two cards (black jack!)
    // else if player hand is 21 with more than two cards (end player turn)
    // else if player hand is 21 or more (end player turn, bust)
    // if computer hand is 21 with two cards (computer wins unless player won)
    // else if computer hand is 21 or lower compare to player highest wins unless tie
    // else if computer busts and player is lower than 21 player wins
    // else if both computer and player bust = tie
// hand total
    // reduce hand arrays
    // create two arrays, high total and low total to handle aces
// set up initiate deal
function Deal(){
    console.log("Deal!")
}
    //deals two cards to player
    // deal one visible and one hidden to computer
// set up hit button
function Hit(){
    console.log("Hit!")
}
    //add random card to hand, recalculate total of hand
// set up hold button
function Hold(){
    console.log("Hold!")
}
    //disables hit, intiates computer turn
// computer turn
    // computer will draw card if total less than 15

// generate random card selector