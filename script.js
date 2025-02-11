let userName = '';

// Create floating hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.animation = `floatingHeart ${Math.random() * 3 + 2}s linear`;
    document.querySelector('.floating-hearts').appendChild(heart);
    
    heart.addEventListener('animationend', () => heart.remove());
}

setInterval(createFloatingHeart, 300);

// Transition between steps with fade effect
function transitionToStep(currentId, nextId, delay = 0) {
    setTimeout(() => {
        document.getElementById(currentId).classList.add('hidden');
        setTimeout(() => {
            document.getElementById(nextId).classList.remove('hidden');
        }, 500);
    }, delay);
}

// Heart click handling
document.querySelector('.heart-wrapper').addEventListener('click', () => {
    document.querySelector('.heart-wrapper').classList.add('zoom-out');
    setTimeout(() => transitionToStep('heartStep', 'nameStep'), 1000);
});

// Name input handling
document.querySelector('#nameStep .continue-btn').addEventListener('click', () => {
    userName = document.getElementById('nameInput').value.trim();
    if (userName) {
        transitionToStep('nameStep', 'loveMeterStep');
    }
});

// Love meter handling
const loveRange = document.getElementById('loveRange');
const loveMessage = document.getElementById('loveMessage');
const loveContinueBtn = document.getElementById('loveContinueBtn');

loveRange.addEventListener('input', () => {
    const value = parseInt(loveRange.value);
    if (value < 50) {
        loveMessage.textContent = "Ay so ganyan mo lang aq ka lab? 😀";
        loveContinueBtn.classList.add('hidden');
    } else if (value < 90) {
        loveMessage.textContent = "Konti na lang o 👉🏼👈🏼 ";
        loveContinueBtn.classList.add('hidden');
    } else {
        loveMessage.textContent = "Alam mo naman mas lab kita 😚💖";
        loveContinueBtn.classList.remove('hidden');
    }
});

// Continue to pre-valentine message
loveContinueBtn.addEventListener('click', () => {
    transitionToStep('loveMeterStep', 'preValentineStep');
    setTimeout(() => {
        transitionToStep('preValentineStep', 'valentineStep');
    }, 2000);
});

// Create additional Yes buttons
function createYesButton() {
    const btn = document.createElement('button');
    btn.textContent = 'Yes';
    btn.className = 'yes-btn spawning-yes';
    const size = Math.random() * 0.5 + 0.7;
    
    const maxWidth = window.innerWidth - 150;
    const maxHeight = window.innerHeight - 150;
    const x = Math.random() * maxWidth + 50;
    const y = Math.random() * maxHeight + 50;
    
    btn.style.transform = `scale(0)`; // Start at scale 0
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    document.body.appendChild(btn);
    
    // Apply the final scale after a tiny delay
    setTimeout(() => {
        btn.style.transform = `scale(${size})`;
    }, 50);
    
    btn.addEventListener('click', () => {
        document.querySelectorAll('.yes-btn').forEach(btn => btn.remove());
        document.querySelector('.no-btn').remove();
        finalStep();
    });
}

// Move No button
function moveNoButton(noBtn) {
    const maxAttempts = 100;
    let attempts = 0;
    let newX, newY;
    
    // Keep trying to find a new position that's not too close to the edges
    do {
        newX = Math.random() * (window.innerWidth - 100);
        newY = Math.random() * (window.innerHeight - 100);
        attempts++;
    } while (
        (newX < 50 || newX > window.innerWidth - 150 || 
         newY < 50 || newY > window.innerHeight - 150) && 
        attempts < maxAttempts
    );

    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
}

// Final step
function finalStep() {
    document.querySelector('.personal-message').textContent = 
        `Dearest ${userName}, thank you for making me the happiest person! I promise to make every day special for you.`;
    transitionToStep('valentineStep', 'finalStep');
    createHeartExplosion();
}

// Handle Valentine buttons
document.querySelector('.yes-btn').addEventListener('click', finalStep);

document.querySelector('.no-btn').addEventListener('click', function() {
    moveNoButton(this);
    for (let i = 0; i < 3; i++) {
        createYesButton();
    }
});



function spawnYesButtons(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createYesButton();
        }, i * 100); // 100ms delay between each button spawn
    }
}

// Update the No button click handler
document.querySelector('.no-btn').addEventListener('click', function() {
    moveNoButton(this);
    
    // Shrink the No button
    noButtonScale = Math.max(0.5, noButtonScale - 0.1); // Don't let it get smaller than 0.5
    this.style.transform = `scale(${noButtonScale})`;
    
    // Spawn buttons with delay
    spawnYesButtons(5);
});