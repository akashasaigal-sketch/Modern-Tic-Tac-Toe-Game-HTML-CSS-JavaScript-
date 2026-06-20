const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const restBtn = document.getElementById('resetBtn')

let currentPlayer='X';
let gameState=["","","","","","","","",""];
let gameActive = true;

const winConditions=[
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function handleCellClick(e){
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if(gameState[index] !=="" || !gameActive){
        return;
    }
    gameState[index]=currentPlayer;
    cell.innerText=currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkWinner();
}

function checkWinner(){
    let roundWon = false;
    for(let i = 0; i<winConditions.length; i++){
        const [a,b,c]= winConditions[i];
        if(gameState[a] !=="" && gameState[a] === gameState[b] && gameState[a]=== gameState[c]){
            roundWon=true;
            HighlightWinner([a,b,c]);
            break;
        }
    }

    if(roundWon){
        statusText.innerHTML=`PLAYER <span style="color:var(--neon-${currentPlayer === 'X' ? 'blue':'pink' })">${currentPlayer}</span> Won!`;
        gameActive = false;
        return;
    }

    if(!gameState.includes("")){
        statusText.innerText = "GAME OVER : DRAW";
        return;
    }

    currentPlayer = currentPlayer ==='X'?'O':'X';
    statusText.innerHTML = `PLAYER <span class="player-neon" style="color:var(--neon-${currentPlayer === 'X'?'blue':'pink'})">${currentPlayer}</span> TURN`;
}

function HighlightWinner(indices){
    indices.forEach(i => cells[i].classList.add('winner'));
}

function resetGame(){
    currentPlayer='X';
    gameState=["","","","","","","","",""];
    gameActive=true;
    statusText.innerHTML=`PLAYER <span class="player-neon">X</span> TURN`;
    cells.forEach(cell =>{
        cell.innerText="";
        cell.className="cell";
    });
}

cells.forEach(cell => cell.addEventListener('click',handleCellClick));
restBtn.addEventListener('click',resetGame);