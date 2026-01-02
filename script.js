const player = '👽'
const computer = '💻'
let playerPoints = 0;
let computerPoints = 0;

const playerDice = document.getElementById('player-dice');
const computerDice = document.getElementById('computer-dice');
const playerPointsEl = document.getElementById('player-points');
const computerPointsEl = document.getElementById('computer-points');
const playerPanel = document.getElementById('player-panel');
const computerPanel = document.getElementById('computer-panel');
const playerLog = document.getElementById('player-log');
const computerLog = document.getElementById('computer-log');
const centerLog = document.getElementById('center-log');
const faces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

const addLog = (text) => {
    const li = document.createElement('li');
    li.textContent = text;
    if (/Wins/.test(text)) {
        li.className = 'gold';
    }
    if (text.startsWith('Player')) {
        playerLog.prepend(li);
    }
    else if (text.startsWith('Computer')) {
        computerLog.prepend(li);
    }
    else {
        centerLog.prepend(li);
    }
};

const rollDice = (face) => {
    const el = face === 'player' ? playerDice : computerDice;
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
};

const originalLog = console.log;
console.log = (...args) => {
    originalLog(...args);
    const text = args.join(' ');
    addLog(text);
    const playerMatch = text.match(/Player Dice .*?: (\d+)/);
    const computerMatch = text.match(/Computer Dice .*?: (\d+)/);
    const playerWin = /Player Win 1 point/.test(text);
    const computerWin = /Computer Win 1 point/.test(text);
    const playerWins = /Player Wins/.test(text);
    const computerWins = /Computer Wins/.test(text);
    if (playerMatch) {
        rollDice('player');
        playerDice.textContent = faces[Number(playerMatch[1])];
    }
    if (computerMatch) {
        rollDice('computer');
        computerDice.textContent = faces[Number(computerMatch[1])];
    }
    if (playerWin || playerWins) {
        playerPointsEl.textContent = playerWin ? Number(playerPointsEl.textContent) + 1 : 3;
        playerPanel.classList.add('win');
        computerPanel.classList.remove('win');
    }
    if (computerWin || computerWins) {
        computerPointsEl.textContent = computerWin ? Number(computerPointsEl.textContent) + 1 : 3;
        computerPanel.classList.add('win');
        playerPanel.classList.remove('win');
    }
    if (playerWins || computerWins) {
        playerDice.textContent = '🏆';
        computerDice.textContent = '🏆';
    }
};

function game() {
    let playerdice = Math.floor((Math.random()) * (6) + 1);
    console.log(`Player Dice ${player}: ${playerdice}`);

    let computerdice = Math.floor((Math.random()) * (6) + 1);
    console.log(`Computer Dice ${computer}: ${computerdice}`)

    if (playerdice > computerdice) {
        console.log("Player Win 1 point🎉!");
        playerPoints++;
    }
    else if (playerdice === computerdice) {
        console.log("Match Draw🤧!");
    }
    else {
        console.log("Computer Win 1 point🎉!");
        computerPoints++;
    }

}

const rollBtn = document.getElementById('roll-btn');
const resetBtn = document.getElementById('reset-btn');

rollBtn.addEventListener('click', () => {
    rollBtn.disabled = true;
    setTimeout(() => {
        game();
        if (playerPoints === 3) {
            console.log('Player Wins🎉!');
        }
        else if (computerPoints === 3) {
            console.log('Computer Wins🎉!');
        }
        else {
            rollBtn.disabled = false;
        }
    }, 450);
});

resetBtn.addEventListener('click', () => {
    playerPoints = 0;
    computerPoints = 0;
    playerPointsEl.textContent = '0';
    computerPointsEl.textContent = '0';
    playerDice.textContent = '❓';
    computerDice.textContent = '❓';
    playerPanel.classList.remove('win');
    computerPanel.classList.remove('win');
    playerLog.innerHTML = '';
    computerLog.innerHTML = '';
    centerLog.innerHTML = '';
    rollBtn.disabled = false;
});