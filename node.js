function loadFinalStage() {
  document.getElementById('status').textContent = `Progress: 0 taps`;
  let timeLeft = 10;
  currentRound = 0;

  const timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `⏱ Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (currentRound >= 30) {
        stage++;
        startStage();
      } else {
        resetGame('❌ You didn’t tap enough in 10 seconds! Back to Stage 1');
      }
    }
  }, 1000);

  function showNewTarget() {
    if (timeLeft <= 0) return;

    const correct = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('target').textContent = `Tap: ${correct}`;
    const area = document.getElementById('game-area');
    area.innerHTML = '';
    const shuffled = [...colors].sort(() => 0.5 - Math.random());
    shuffled.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'color-btn';
      btn.style.backgroundColor = colorHex[c];
      btn.textContent = c;
      btn.onclick = () => {
        if (c === correct && timeLeft > 0) {
          currentRound++;
          document.getElementById('status').textContent = `Progress: ${currentRound} taps`;
          showNewTarget(); // Show next one quickly
        } else {
          resetGame('❌ Wrong tap! Back to Stage 1');
        }
      };
      area.appendChild(btn);
    });
  }

  document.getElementById('timer').textContent = `⏱ Time Left: ${timeLeft}s`;
  showNewTarget();
}

