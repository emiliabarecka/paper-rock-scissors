const gameSummary = {
    numbers: 0,
    wins: 0,
    looses: 0,
    draws: 0
}

const game = {
    playerHand: "",
    aiHand: ""
}
const hands = [...document.querySelectorAll(".select img")];

function handSelection(){
    
    game.playerHand = this.dataset.option;
    hands.forEach((hand)=>{
        hand.style.boxShadow = "";
    });
    this.style.boxShadow = "0 0 0 10px orange";
}

hands.forEach((hand) =>{
   hand.addEventListener('click', handSelection)
});

const btn = document.querySelector('button');

function computerChoice(){
    const aiHand = hands[Math.floor(Math.random()*3)].dataset.option;
    return aiHand;
}

function result(player, ai, gameResult){
    document.querySelector('[data-summary = "your-choice"]').textContent = player;
    document.querySelector('[data-summary = "ai-choice"]').textContent = ai;
    gameSummary.numbers++;
    document.querySelector('.numbers span').textContent = gameSummary.numbers;
    if(gameResult === 'wygrałeś'){
        document.querySelector('[data-summary = "who-win"]').textContent = 'TY! :)';
        document.querySelector('[data-summary = "who-win"]').style.color = 'green';
        gameSummary.wins++;
        document.querySelector('.wins span').textContent = gameSummary.wins; 
    }
    if(gameResult === 'przegrałeś'){
        document.querySelector('[data-summary = "who-win"]').textContent = 'Komputer! :('
        document.querySelector('[data-summary = "who-win"]').style.color = 'red'
        gameSummary.looses++;
        document.querySelector('.looses span').textContent = gameSummary.looses; 
    }
   
    if(player === ai){
        document.querySelector('[data-summary = "who-win"]').textContent = 'remis';
        document.querySelector('[data-summary = "who-win"]').style.color = 'gray';
        gameSummary.draws++;
        document.querySelector('.draws span').textContent = gameSummary.draws;
    }
}

// gameResult == 'wygrales' ? 'ty' : 'komputer'

function checkResult(player, ai){
    console.log(player, ai);
    if(player === ai){
        return 'remis';
    }else if((player === 'papier' && ai === 'kamień') || 
    (player === 'kamień' && ai === 'nożyce') ||
    (player === 'nożyce' && ai === 'papier')){
        return 'wygrałeś';
    }else{
        return 'przegrałeś';
    }
    
}
function endGame(){
    document.querySelector(`[data-option ='${game.playerHand}']`).style.boxShadow = "";
    game.playerHand = '';
}

function startGame(){
    if(game.playerHand === ""){
     return  alert('wybierz obrazek');     
    }
    game.aiHand = computerChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    result(game.playerHand, game.aiHand,gameResult);
    endGame();
}

btn.addEventListener('click', startGame);

