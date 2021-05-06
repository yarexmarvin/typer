let input = document.querySelector('.input_inner');

let gameOverTitle = document.querySelector('.game_over');
let gameStartTitle = document.querySelector('.game_start');
let currentWordTitle = document.querySelector('.current_word');

let timerNumber = document.querySelector('.timer_inner');

let currentScore = document.querySelector('.current_score_number');
let bestScore = document.querySelector('.best_score_number');


let words;
let currentWord;
let timer;
let time;;

let score = 0;
let endScore = [];

// get all words
let wordsReq = new XMLHttpRequest();
wordsReq.onreadystatechange = function() {
    if (wordsReq.readyState == 4 && wordsReq.status == 200) {
        let allWords = JSON.parse(wordsReq.response);
        words = allWords;
        console.log(words);
    }
};

wordsReq.open("GET", "https://random-word-api.herokuapp.com/all", true);
wordsReq.send();




// start the game
input.addEventListener('input', start);

function start() {
    input.value = input.value.toLowerCase();
    if (input.value == 'start') {
        input.removeEventListener('input', start);
        input.addEventListener('input', playGame);
        game();

        input.value = '';
        gameStartTitle.classList.add('display_none');
        gameOverTitle.classList.add('display_none');
        time = 20;

        timer = setInterval(function() {
            if (time > 0) {
                time -= 1;
                timerNumber.innerHTML = time;
            } else {
                clearInterval(timer);
                gameOver();
            }
        }, 1000)
    }
}


// main game-function
function game() {
    let randomNumber = Math.floor(Math.random() * words.length);
    currentWord = words[randomNumber];
    input.removeAttribute('placeholder');
    input.setAttribute('placeholder',`type "${words[randomNumber]}"` );
    console.log(randomNumber);
    currentWordTitle.innerHTML = currentWord;
}


function playGame() {
    input.value = input.value.toLowerCase();
    if (input.value == currentWord) {
        input.value = "";
        score += 1;
        currentScore.innerHTML = score;
        game();
    }


}

function gameOver() {
    input.removeEventListener('input', playGame);
    input.addEventListener('input', start);
    endScore.push(score);
    endScore.sort(function(a, b) { return a - b })
    bestScore.innerHTML = endScore[endScore.length - 1];
    score = 0;
input.removeAttribute('placeholder');
    input.setAttribute('placeholder','type "start"' );
    gameStartTitle.classList.remove('display_none');
    gameOverTitle.classList.remove('display_none');
    currentWordTitle.innerHTML = '';
    input.value = "";
}