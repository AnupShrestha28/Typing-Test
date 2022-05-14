const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-from');
const difficultySelect = document.getElementById('difficulty');

// List of words for game

const words =[
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin', 
    'superficial',
    'quince',
    'feeble',
    'admit',
    'drag',
    'loving',
    'improve',
    'focusing',
    'accuracy',
    'matters',
    'personalized',
    'feedback',
    'begins',
    'common',
    'randomly',
    'curated',
    'designed',
    'allopurinol',
    'amifostine',
    'alendronate',
    'abacavir',
    'continue',
    'introducing',
    'alphabet',
    'grasp',
    'programming',
    'interface',
    'wizard',
    'languages',
    'javascript',
    'react',
    'developer',
    'elephant',
    'leopard',
    'kangaaroo',
    'rhododendron',
    'penguin',
    'location',
    'activity',
    'initialize',
    'repository',
    'description',
    'contact',
    'license',
    'animated',
    'elsewhere',
    'optional',
    'lightening',
    'fadetoblack',
    'thunderstorms',
    'forest',
    'water',
    'remember',
    'instagram',
    'telescope',
    'communication'
];

// Init Word
let randomWord;

// Init Score
let score = 0;

// Init Time
let time = 10;


// Set difficulty to value in local storage or medium
let difficulty = localStorage.getItem('difficulty') !== null ? 
localStorage.getItem('difficulty') : 'medium';



// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? 
localStorage.getItem('difficulty') : 'medium';


// Focus on text on start
text.focus();


// Start counting down
const timeInterval= setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

console.log(getRandomWord());

// Add word to dom
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update Score
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

// Update Time
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        // End the game
        gameOver();
    }
}

// Gameover, show end screen
function gameOver(){


    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    
    `;
    endgameEl.style.display ='flex';
}

addWordToDOM();


// Event listener

// Typing
text.addEventListener('input', e =>{
    const insertedText = e.target.value;
    if(insertedText === randomWord){
        addWordToDOM();
        updateScore();

        // Clear
        e.target.value = '';

        if(difficulty === 'hard'){
            time += 2;
        }else if(difficulty === 'medium'){
            time += 3;
        }else{
            time += 5;
        }

        updateTime();

    }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e =>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);

});