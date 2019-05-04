//Rock, paper, scissors

'use strict';

//define buttons
var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var scissors = document.getElementById('scissors');
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
var scorePlayer;
var scoreComputer;
var howManyGames;
var infoAboutWinnerText;
var gameOver;
var newGameStarted;

// new game - click button
newGame.addEventListener('click', function () {
    //reset values
    output.innerHTML = '';
    resultSum.innerHTML = '';
    infoAboutWinnerMain.innerHTML = '';
    gameOverDisplay.innerHTML = '';
    howManyGames = 0;
    scorePlayer = 0;
    scoreComputer = 0;
    infoAboutWinnerText = '';
    gameOver = '';
    newGameStarted = true;
    //set how long to play
    howManyGames = window.prompt('How many rounds you want to play?');
    var display
    if (howManyGames > 0) {
        display = 'You will play until ' + howManyGames + ' points;' +
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
paper.addEventListener('click', function () {
    getPlayerMove('paper');
});
rock.addEventListener('click', function () {
    getPlayerMove('rock');
});
scissors.addEventListener('click', function () {
    getPlayerMove('scissors');
});

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

    //Game finished - to check before next round
    if (
        scorePlayer == howManyGames || scoreComputer == howManyGames
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
            scorePlayer = scorePlayer + 1;
            if (scorePlayer == howManyGames) {
                infoAboutWinnerText = 'YOU WON THE ENTIRE GAME!!!';
            }
        }
        //won computer
        else {
            var whoWin = 'COMPUTER WON!';
            scoreComputer = scoreComputer + 1;
            if (scoreComputer == howManyGames) {
                infoAboutWinnerText = 'COMPUTER WON THE ENTIRE GAME!!!';
            }
        }
        output.innerHTML = 'You played: ' + parameter + '. Computer played: ' + computerUse + '. ' + whoWin + '<br>' + output.innerHTML;
    }

    //display data
    resultSum.innerHTML = 'Your score: ' + scorePlayer + '. Computer score: ' + scoreComputer;
    infoAboutWinnerMain.innerHTML = '' + infoAboutWinnerText;
};