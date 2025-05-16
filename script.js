// Game variables
let credits = 100;
let currentBet = 10;
let currentGameMode = 'classic';

// Symbol sets for different game modes
const symbolSets = {
    classic: ['🍒', '🍋', '🍊', '🍇', '🍉', '💰', '7️⃣'],
    fruit: ['🍎', '🍏', '🍐', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒']
};

// Payout multipliers for different combinations
const payouts = {
    classic: {
        '4-of-a-kind': 20,
        '3-of-a-kind': 10,
        '2-pairs': 5,
        'pair': 2
    },
    fruit: {
        '4-of-a-kind': 15,
        '3-of-a-kind': 8,
        '2-pairs': 4,
        'pair': 1.5
    }
};

// DOM elements
const menuScreen = document.getElementById('menuScreen');
const gameScreen = document.getElementById('gameScreen');
const classicBtn = document.getElementById('classicBtn');
const fruitBtn = document.getElementById('fruitBtn');
const backBtn = document.getElementById('backBtn');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const slot4 = document.getElementById('slot4');
const creditsDisplay = document.getElementById('credits');
const betDisplay = document.getElementById('betAmount');
const spinBtn = document.getElementById('spinBtn');
const betUpBtn = document.getElementById('betUp');
const betDownBtn = document.getElementById('betDown');
const messageEl = document.getElementById('message');

// Initialize game
resetGame();

// Event listeners
classicBtn.addEventListener('click', () => startGame('classic'));
fruitBtn.addEventListener('click', () => startGame('fruit'));
backBtn.addEventListener('click', returnToMenu);
spinBtn.addEventListener('click', spin);
betUpBtn.addEventListener('click', () => changeBet(5));
betDownBtn.addEventListener('click', () => changeBet(-5));

// Game functions
function startGame(mode) {
    currentGameMode = mode;
    menuScreen.classList.remove('active');
    gameScreen.style.display = 'block';
    resetReels();
    updateDisplay();
}

function returnToMenu() {
    gameScreen.style.display = 'none';
    menuScreen.classList.add('active');
    resetGame();
}

function resetGame() {
    credits = 100;
    currentBet = 10;
    updateDisplay();
}

function resetReels() {
    const symbols = symbolSets[currentGameMode];
    slot1.textContent = symbols[0];
    slot2.textContent = symbols[1];
    slot3.textContent = symbols[2];
    slot4.textContent = symbols[3];
}

function spin() {
    // Deduct bet
    credits -= currentBet;
    updateDisplay();
    spinBtn.disabled = true;
    messageEl.textContent = "Spinning...";
    
    // Add spinning class
    slot1.classList.add('spinning');
    slot2.classList.add('spinning');
    slot3.classList.add('spinning');
    slot4.classList.add('spinning');
    
    // Spin animation
    let spins = 0;
    const spinInterval = setInterval(() => {
        slot1.textContent = getRandomSymbol();
        slot2.textContent = getRandomSymbol();
        slot3.textContent = getRandomSymbol();
        slot4.textContent = getRandomSymbol();
        
        spins++;
        if (spins > 10) {
            clearInterval(spinInterval);
            finishSpin();
        }
    }, 100);
}

function finishSpin() {
    // Remove spinning class
    slot1.classList.remove('spinning');
    slot2.classList.remove('spinning');
    slot3.classList.remove('spinning');
    slot4.classList.remove('spinning');
    
    // Set final symbols
    const symbols = [
        slot1.textContent = getRandomSymbol(),
        slot2.textContent = getRandomSymbol(),
        slot3.textContent = getRandomSymbol(),
        slot4.textContent = getRandomSymbol()
    ];
    
    // Check win
    const result = checkWin(symbols);
    if (result.win) {
        const winAmount = Math.floor(currentBet * result.multiplier);
        credits += winAmount;
        showWinMessage(`${result.type}! You won ${winAmount} credits!`, true);
    } else {
        showWinMessage("No win this time. Try again!", false);
    }
    
    updateDisplay();
    spinBtn.disabled = credits < currentBet;
}

function checkWin(symbols) {
    const symbolCount = {};
    
    // Count occurrences of each symbol
    symbols.forEach(symbol => {
        symbolCount[symbol] = (symbolCount[symbol] || 0) + 1;
    });
    
    // Check for wins
    const counts = Object.values(symbolCount).sort((a,b) => b-a);
    
    if (counts[0] === 4) {
        return { win: true, type: '4 OF A KIND', multiplier: payouts[currentGameMode]['4-of-a-kind'] };
    }
    if (counts[0] === 3) {
        return { win: true, type: '3 OF A KIND', multiplier: payouts[currentGameMode]['3-of-a-kind'] };
    }
    if (counts[0] === 2 && counts[1] === 2) {
        return { win: true, type: '2 PAIRS', multiplier: payouts[currentGameMode]['2-pairs'] };
    }
    if (counts[0] === 2) {
        return { win: true, type: 'PAIR', multiplier: payouts[currentGameMode]['pair'] };
    }
    
    return { win: false };
}

function showWinMessage(message, isWin) {
    messageEl.textContent = message;
    messageEl.style.color = isWin ? 'var(--accent)' : '#ff6b6b';
    messageEl.style.fontWeight = 'bold';
    
    if (isWin) {
        messageEl.classList.add('win-message');
        setTimeout(() => {
            messageEl.classList.remove('win-message');
        }, 1000);
    }
}

function getRandomSymbol() {
    const symbols = symbolSets[currentGameMode];
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function changeBet(amount) {
    currentBet += amount;
    currentBet = Math.max(5, Math.min(50, currentBet)); // Keep between 5-50
    betDisplay.textContent = currentBet;
    spinBtn.disabled = credits < currentBet;
    
    // Animate bet change
    betDisplay.classList.add('bet-change');
    setTimeout(() => {
        betDisplay.classList.remove('bet-change');
    }, 200);
}

function updateDisplay() {
    creditsDisplay.textContent = credits;
    spinBtn.disabled = credits < currentBet;
}
