class MixOrMatchGame {
    constructor(totalTime, cards) {
        this.cardSet = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.count = document.getElementById('flips');
    }
    startGame() {
        this.cardtoCheck = null;
        this.timeRemaining = this.totalTime;
        this.totalFlips = 0;
        this.matchedCards = []; 
        this.busy = true;

        setTimeout(() => {
            this.shuffle();
            this.countdown = this.startCountDown();
            this.busy = false;
        }, 500);

        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.count.innerText = this.totalFlips;
    }

    startCountDown(){
        return setInterval(() => {
            this.timeRemaining --;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0){
                this.gameOver();
            }
        }, 1000);
    }

    hideCards(){
        this.cardSet.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        })
    }

    flipCard(card){
        if(this.checkIfCanFlipCard(card)){
            this.totalFlips ++;
            this.count.innerText = this.totalFlips;

            card.classList.add('visible');

            //check if the cards match
            if(this.cardtoCheck){    //if not null
                // check for match
                this.cardMatchCheck(card);
            }
            else{
                this.cardtoCheck = card;
            }
        }
    }

    cardMatchCheck(card){
        if(this.getCardType(card) === this.getCardType(this.cardtoCheck)){
            //matched
            this.cardMatched(card, this.cardtoCheck);
        }
        else {
            this.cardNoMatch(card, this.cardtoCheck);
        }

        this.cardtoCheck = null;
    }

    cardMatched(card1, card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardSet.length) {  // victory condition
            this.victory();
        }
    }
    cardNoMatch(card1, card2){
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000)
    }

    getCardType(card){
        console.log(card.getElementsByClassName('card-value')[0].id);
        return card.getElementsByClassName('card-value')[0].id;
    }
    

    gameOver() {
        clearInterval(this.countdown);
        document.getElementById('game-over-text').classList.add('visible');
    }

    victory() {
        clearInterval(this.countdown);
        window.setTimeout(window.location.href = '../html/victory.html', 5000);  // not working??
        
    }
    shuffle() {
        for(let i = this.cardSet.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i+1));
            this.cardSet[randomIndex].style.order = i;
            this.cardSet[i].style.order = randomIndex;
        }
    }

    checkIfCanFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card != this.cardtoCheck  // return true if meet all conditions
    }

}

// hold the button to flip all the cards over
function gameHint(){
    let cards = Array.from(document.getElementsByClassName('card'));
    for(let i=0; i < cards.length; i++){
        if(cards[i].classList.value === 'card'){
            cards[i].classList.add('visible');
            console.log(cards[i].classList);
        }
5
    }
}

// The cards flip it back if the mouse leave
function gameHintEnd(){
    let cards = Array.from(document.getElementsByClassName('card'));
    for(let i=0; i < cards.length; i++){
        if(cards[i].classList.value === 'card visible'){
            cards[i].classList.remove('visible');
        }

    }
}

function ready(){
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatchGame(80, cards);


    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });

}

if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready());
}
else {
    ready();
}

