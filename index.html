document.addEventListener('DOMContentLoaded', function() {
    // Game state
    let balance = 100;
    const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '7️⃣'];
    
    // Bet amounts
    const bets = {
        low: 5,
        medium: 25,
        high: 100
    };
    
    // Minimum balances required
    const minBalances = {
        low: 10,
        medium: 50,
        high: 200
    };
    
    // Payout multipliers
    const payouts = {
        '🍒🍒🍒': 2,
        '🍋🍋🍋': 3,
        '🍊🍊🍊': 4,
        '🍇🍇🍇': 5,
        '🍉🍉🍉': 7,
        '7️⃣7️⃣7️⃣': 10
    };
    
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const slotMachines = document.querySelectorAll('.slot-machine');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding slot machine
            slotMachines.forEach(machine => {
                machine.classList.remove('active');
                if (machine.classList.contains(`${tabId}-stakes`)) {
                    machine.classList.add('active');
                }
            });
        });
    });
    
    // Update balance display
    function updateBalance() {
        document.getElementById('balance').textContent = balance;
        
        // Enable/disable buttons based on balance
        document.getElementById('spin-low').disabled = balance < bets.low;
        document.getElementById('spin-medium').disabled = balance < bets.medium;
        document.getElementById('spin-high').disabled = balance < bets.high;
        
        // Add/remove low balance warning
        tabButtons.forEach(button => {
            const tabId = button.getAttribute('data-tab');
            if (balance < minBalances[tabId]) {
                button.classList.add('disabled-tab');
                button.title = `You need at least ${minBalances[tabId]} chips to play this machine`;
            } else {
                button.classList.remove('disabled-tab');
                button.title = '';
            }
        });
    }
    
    // Spin the slots
    function spin(betLevel) {
        const bet = bets[betLevel];
        if (balance < bet) {
            showMessage("Not enough chips to bet!", 'error');
            return;
        }
        
        // Deduct bet
        balance -= bet;
        updateBalance();
        
        // Get slot elements
        const slot1 = document.getElementById(`${betLevel}1`);
        const slot2 = document.getElementById(`${betLevel}2`);
        const slot3 = document.getElementById(`${betLevel}3`);
        
        // Disable buttons during animation
        document.getElementById('spin-low').disabled = true;
        document.getElementById('spin-medium').disabled = true;
        document.getElementById('spin-high').disabled = true;
        
        // Add spinning animation
        slot1.classList.add('spinning');
        slot2.classList.add('spinning');
        slot3.classList.add('spinning');
        
        // Animate spinning
        let spins = 0;
        const totalSpins = 20;
        const spinInterval = setInterval(() => {
            slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            spins++;
            if (spins >= totalSpins) {
                clearInterval(spinInterval);
                
                // Remove spinning animation
                slot1.classList.remove('spinning');
                slot2.classList.remove('spinning');
                slot3.classList.remove('spinning');
                
                // Final result
                const result1 = symbols[Math.floor(Math.random() * symbols.length)];
                const result2 = symbols[Math.floor(Math.random() * symbols.length)];
                const result3 = symbols[Math.floor(Math.random() * symbols.length)];
                
                slot1.textContent = result1;
                slot2.textContent = result2;
                slot3.textContent = result3;
                
                // Check for win
                checkWin(result1, result2, result3, betLevel);
                
                // Re-enable buttons
                updateBalance();
            }
        }, 100);
    }
    
    // Check if the spin was a win
    function checkWin(s1, s2, s3, betLevel) {
        const result = s1 + s2 + s3;
        
        if (s1 === s2 && s2 === s3) {
            const multiplier = payouts[result] || 1;
            const winAmount = bets[betLevel] * multiplier;
            balance += winAmount;
            updateBalance();
            
            // Win animation
            const machine = document.querySelector(`.${betLevel}-stakes`);
            machine.classList.add('win-animation');
            setTimeout(() => {
                machine.classList.remove('win-animation');
            }, 1500);
            
            showMessage(`JACKPOT! You won ${winAmount} chips! ${result} pays ${multiplier}x!`, 'success');
        } else {
            showMessage("No win this time. Try again!", 'info');
        }
    }
    
    // Show message to player
    function showMessage(msg, type = 'info') {
        const messageElement = document.getElementById('message');
        messageElement.textContent = msg;
        messageElement.className = 'message-box animate__animated animate__fadeIn';
        messageElement.style.display = 'block';
        
        // Set message color based on type
        if (type === 'error') {
            messageElement.style.backgroundColor = 'rgba(230, 57, 70, 0.9)';
            messageElement.style.color = 'white';
        } else if (type === 'success') {
            messageElement.style.backgroundColor = 'rgba(6, 214, 160, 0.9)';
            messageElement.style.color = 'white';
        } else {
            messageElement.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            messageElement.style.color = 'var(--dark-color)';
        }
        
        // Hide message after delay
        setTimeout(() => {
            messageElement.classList.add('animate__fadeOut');
            setTimeout(() => {
                messageElement.style.display = 'none';
                messageElement.classList.remove('animate__fadeIn', 'animate__fadeOut');
            }, 500);
        }, 3000);
    }
    
    // Event listeners
    document.getElementById('spin-low').addEventListener('click', () => spin('low'));
    document.getElementById('spin-medium').addEventListener('click', () => spin('medium'));
    document.getElementById('spin-high').addEventListener('click', () => spin('high'));
    
    // Initialize
    updateBalance();
    
    // Show welcome message
    setTimeout(() => {
        showMessage("Welcome to Lucky Slots! Start with 100 chips. Good luck!", 'info');
    }, 500);
});
