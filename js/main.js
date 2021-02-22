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
    // message about game state(win, bust, lose, blackjack)
    //win loses and ties
// event listeners
    //deal
document.getElementById("deal").addEventListener("click", Deal)
    //hit
document.getElementById("hit").addEventListener("click", Hit)
    //hold
document.getElementById("hold").addEventListener("click", Hold)

    
//set up init
    //set scores = 0
    // set player hand to empty {}
    // set computer hand to empty {}
    //set winner to null
    //render()
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