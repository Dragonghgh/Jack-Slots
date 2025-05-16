// Game variables
let credits = 100;
let currentBet = 10;
const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '💰', '7️⃣'];

// DOM elements
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const creditsDisplay = document.getElementById('credits');
const betDisplay = document.getElementById('betAmount');
const spinBtn = document.getElementById('spinBtn');
const betUpBtn = document.getElementById('betUp');
const betDownBtn = document.getElementById('betDown');
const messageEl = document.getElementById('message');

// Initialize game
updateDisplay();

// Event listeners
spinBtn.addEventListener('click', spin);
betUpBtn.addEventListener('click', () => changeBet(5));
betDownBtn.addEventListener('click', () => changeBet(-5));

// Game functions
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
    
    // Spin animation
    let spins = 0;
    const spinInterval = setInterval(() => {
        slot1.textContent = getRandomSymbol();
        slot2.textContent = getRandomSymbol();
        slot3.textContent = getRandomSymbol();
        
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
    
    // Set final symbols
    const s1 = getRandomSymbol();
    const s2 = getRandomSymbol();
    const s3 = getRandomSymbol();
    
    slot1.textContent = s1;
    slot2.textContent = s2;
    slot3.textContent = s3;
    
    // Check win
    if (s1 === s2 && s2 === s3) {
        // Jackpot!
        const winAmount = currentBet * 10;
        credits += winAmount;
        showWinMessage(`JACKPOT! You won ${winAmount} credits!`, true);
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        // Small win
        const winAmount = currentBet * 2;
        credits += winAmount;
        showWinMessage(`You won ${winAmount} credits!`, true);
    } else {
        showWinMessage("No win this time. Try again!", false);
    }
    
    updateDisplay();
    spinBtn.disabled = credits < currentBet;
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
