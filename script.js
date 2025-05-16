// Game variables
let credits = 100;
let currentBet = 10;
const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '💰', '7️⃣'];

// DOM elements
const menuScreen = document.getElementById('menuScreen');
const gameScreen = document.getElementById('gameScreen');
const startBtn = document.getElementById('startBtn');
const menuBtn = document.getElementById('menuBtn');
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

// Event listeners
startBtn.addEventListener('click', startGame);
menuBtn.addEventListener('click', returnToMenu);
spinBtn.addEventListener('click', spin);
betUpBtn.addEventListener('click', () => changeBet(5));
betDownBtn.addEventListener('click', () => changeBet(-5));

// Initialize slots
resetSlots();

// Game functions
function startGame() {
    menuScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    resetGame();
}

function returnToMenu() {
    gameScreen.style.display = 'none';
    menuScreen.style.display = 'block';
}

function resetGame() {
    credits = 100;
    currentBet = 10;
    updateDisplay();
    resetSlots();
}

function resetSlots() {
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
    // Set final symbols
    const s1 = getRandomSymbol();
    const s2 = getRandomSymbol();
    const s3 = getRandomSymbol();
    const s4 = getRandomSymbol();
    
    slot1.textContent = s1;
    slot2.textContent = s2;
    slot3.textContent = s3;
    slot4.textContent = s4;
    
    // Check win
    const symbols = [s1, s2, s3, s4];
    const unique = [...new Set(symbols)];
    
    if (unique.length === 1) {
        // All 4 match
        const winAmount = currentBet * 20;
        credits += winAmount;
        messageEl.textContent = `JACKPOT! You won ${winAmount} credits!`;
    } 
    else if (unique.length === 2) {
        // 3 match or 2 pairs
        const counts = {};
        symbols.forEach(s => counts[s] = (counts[s] || 0) + 1);
        const values = Object.values(counts);
        
        if (values.includes(3)) {
            // 3 of a kind
            const winAmount = currentBet * 10;
            credits += winAmount;
            messageEl.textContent = `3 OF A KIND! You won ${winAmount} credits!`;
        } else {
            // 2 pairs
            const winAmount = currentBet * 5;
            credits += winAmount;
            messageEl.textContent = `2 PAIRS! You won ${winAmount} credits!`;
        }
    }
    else if (unique.length === 3) {
        // Pair
        const winAmount = currentBet * 2;
        credits += winAmount;
        messageEl.textContent = `PAIR! You won ${winAmount} credits!`;
    }
    else {
        messageEl.textContent = "No win this time. Try again!";
    }
    
    updateDisplay();
    spinBtn.disabled = credits < currentBet;
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function changeBet(amount) {
    currentBet += amount;
    currentBet = Math.max(5, Math.min(50, currentBet)); // Keep between 5-50
    betDisplay.textContent = currentBet;
    spinBtn.disabled = credits < currentBet;
}

function updateDisplay() {
    creditsDisplay.textContent = credits;
    betDisplay.textContent = currentBet;
    spinBtn.disabled = credits < currentBet;
}
