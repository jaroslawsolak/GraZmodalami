//Rock, paper, scissors

'use strict';

//define buttons
var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var scissors = document.getElementById('scissors');
var allButtons = document.getElementsByClassName('.player-move');
var newGame = document.getElementById('newGame');

// hide buttons at beggining
document.getElementById('paper').style.visibility = 'hidden';
document.getElementById('rock').style.visibility = 'hidden';
document.getElementById('scissors').style.visibility = 'hidden';

//display values
var output = document.getElementById('outputScore');
var resultSum = document.getElementById('result');
var maxScore = document.getElementById('maxScore');
var infoAboutWinnerMain = document.getElementById('infoAboutWinnerHtml');
var gameOverDisplay = document.getElementById('gameOverDisplay');

//variables
var whoWin
/*var scorePlayer;
var scoreComputer;
var howManyGames; 
var newGameStarted;*/
var infoAboutWinnerText;
var gameOver;
var progress = new Array();

var params = {
    score: {
        player: 0,
        computer: 0
    },
    howManyGames: null,
    newGameStarted: false
}
progress = []

// new game - click button
newGame.addEventListener('click', function () {
    //reset values
    output.innerHTML = '';
    resultSum.innerHTML = '';
    infoAboutWinnerMain.innerHTML = '';
    gameOverDisplay.innerHTML = '';
    /*howManyGames = 0;
    scorePlayer = 0;
    scoreComputer = 0;*/
    params.score.player = 0;
    params.score.computer = 0;
    infoAboutWinnerText = '';
    gameOver = '';
    params.newGameStarted = true;
    //progress = '';
    //set how long to play
    params.howManyGames = window.prompt('How many rounds you want to play?');
    var display
    if (params.howManyGames > 0) {
        display = 'You will play until ' + params.howManyGames + ' points;' +
            '<br>';
        document.getElementById('paper').style.visibility = 'visible';
        document.getElementById('rock').style.visibility = 'visible';
        document.getElementById('scissors').style.visibility = 'visible';
    } else {
        display = 'Not set yet which score wins. Set number how long you want to play or play as training!';
    }
    maxScore.innerHTML = display;
});

// click on buttons to make move
/*paper.addEventListener('click', function () {
    getPlayerMove('paper');
});
rock.addEventListener('click', function () {
    getPlayerMove('rock');
});
scissors.addEventListener('click', function () {
    getPlayerMove('scissors');
});
*/

var gameButtons = document.querySelectorAll('.game-buttons button');
for(var i = 0; i < gameButtons.length; i++) {
    gameButtons[i].addEventListener('click', function (e) {
        getPlayerMove(e.target.getAttribute('data-move'));
    });
}
/*
allButtons
for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', function (event) {
        event.stopPropagation();
    });
}
*/

//computer move 
var getComputerMove = function () {
    var computerUse = Math.random();
    computerUse = computerUse * 2 + 1;
    computerUse = Math.round(computerUse);
    if (computerUse == 1) {
        return computerUse = 'paper';
    }
    if (computerUse == 2) {
        return computerUse = 'rock';
    }
    if (computerUse == 3) {
        return computerUse = 'scissors';
    }
};

// player move
function getPlayerMove(parameter) {

    var computerUse = getComputerMove();
    infoAboutWinnerText = ''

    //Game finished - to check before next round
    if (
        params.score.player == params.howManyGames || params.score.computer == params.howManyGames
    ) {
        gameOver = '<br> Game over, please press the new game button!';
        gameOverDisplay.innerHTML = gameOver + gameOverDisplay.innerHTML;
    } else {

        //compare who won round
        //draw 
        if (
            parameter == computerUse
        ) {
            var whoWin = 'DRAW!';
        }
        //won player
        else if ((parameter == 'rock' && computerUse == 'scissors') || (parameter == 'paper' && computerUse == 'rock') || (parameter == 'scissors' && computerUse == 'paper')) {
            var whoWin = 'YOU WON!';
            params.score.player += 1;
            if (params.score.player == params.howManyGames) {
                infoAboutWinnerText = 'YOU WON THE ENTIRE GAME!!!';
            }
        }
        //won computer
        else {
            var whoWin = 'COMPUTER WON!';
            params.score.computer  += 1;
            if (params.score.computer == params.howManyGames) {
                infoAboutWinnerText = 'COMPUTER WON THE ENTIRE GAME!!!';
            }
        }
        output.innerHTML = 'You played: ' + parameter + '. Computer played: ' + computerUse + '. ' + whoWin + '<br>' + output.innerHTML;
    }

    progress.push({
        playerScore: params.score.player,
        playerMove: parameter,
        computerScore: params.score.computer,
        computerMove: computerUse,
        whoWin: whoWin
    });

    console.log(progress)



    //display data
    resultSum.innerHTML = 'Your score: ' + params.score.player + '. Computer score: ' + params.score.computer;
    /*infoAboutWinnerMain.innerHTML = '' + infoAboutWinnerText; */
    if(infoAboutWinnerText) {
        document.querySelector('#game-result-modal h3').innerHTML = infoAboutWinnerText
        renderProgressTable;
        debugger
        showModal('game-result-modal')
    } 
    
};

function showModal(modalName) {
document.querySelector('.overlay').classList.add('show')
var modals = document.querySelectorAll('.modal')
for(var i = 0; i <modals.length; i++) {
    modals[i].classList.remove('show')
}
    /*document.querySelector('.modal#'+modalName).classList.add('show') */
    document.querySelector('.modal#'+modalName).classList.add('show')
}

function hideModal() {
    document.querySelector('.overlay').classList.remove('show')
}

document.querySelector('#game-result-modal').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');

for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

function renderProgressTable(){
    var tbody = document.querySelector('#game-result-modal tbody')
    tbody.innerHTML = ''

    for(var i = 0; i < progress.length; i++) {
        var row = document.createElement('tr');

        var roundNumberClolumn = document.createElemement('td');
        roundNumberClolumn.innerHTML = (i + 1) + '.'
        
        var playerMoveClolumn = document.createElemement('td');
        playerMoveClolumn.innerHTML = progress[i].playerMove

        var computerMoveClolumn = document.createElemement('td');
        computerMoveClolumn.innerHTML = progress[i].computerMove
        
        var whoWinClolumn = document.createElemement('td');
        whoWinClolumn.innerHTML = progress[i].whoWin

        var scoreColumn = document.createElemement('td');
        scoreColumn.innerHTML = progress[i].playerScore + ' : ' + progress[i].computerScore 
        
        row.append(roundNumberClolumn, playerMoveClolumn, computerMoveClolumn, whoWinClolumn, scoreColumn)
        tbody.append(row)
        
    }
}

