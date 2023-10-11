const game = () => {
  let playerName = "Player Name";
  let pScore = 0;
  let cScore = 0;

  const updatePlayerName = () => {
    const playerNameElement = document.getElementById("playerName");
    const playerInput = document.getElementById("playerInput");

    playerName = playerInput.value || "Player Name";
    playerNameElement.textContent = playerName;
  };

  const startGame = () => {
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");
    const playBtn = document.getElementById("playBtn");

    playBtn.addEventListener("click", () => {
      updatePlayerName();
      introScreen.style.display = "none";
      match.classList.remove("fadeOut");
      match.style.opacity = "1";
    });
  };

  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          compareHands(this.textContent, computerChoice);
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);

        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");

    if (playerChoice === computerChoice) {
      winner.textContent = "It's a tie";
      return;
    }

    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = `${playerName} Wins`;
        pScore++;
        updateScore();
        checkForGameEnd();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        checkForGameEnd();
        return;
      }
    }

    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        checkForGameEnd();
        return;
      } else {
        winner.textContent = `${playerName} Wins`;
        pScore++;
        updateScore();
        checkForGameEnd();
        return;
      }
    }

    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        checkForGameEnd();
        return;
      } else {
        winner.textContent = `${playerName} Wins`;
        pScore++;
        updateScore();
        checkForGameEnd();
        return;
      }
    }
  };

  const checkForGameEnd = () => {
    if (pScore >= 3 || cScore >= 3) {
      returnToIntro();
    }
  };

  const returnToIntro = () => {
    const match = document.querySelector(".match");
    match.style.opacity = "0";

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  startGame();
  playMatch();
};

game();

const backgroundMusic = document.getElementById('backgroundMusic');
const playMusicButton = document.getElementById('playMusicBtn');
const nextTrackBtn = document.getElementById('nextTrackBtn');
const volumeControl = document.getElementById('volumeControl');

let isMusicPlaying = false;

playMusicButton.addEventListener('click', () => {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    isMusicPlaying = false;
    playMusicButton.textContent = 'Play Music';
  } else {
    backgroundMusic.play();
    isMusicPlaying = true;
    playMusicButton.textContent = 'Pause Music';
  }
});

nextTrackBtn.addEventListener('click', () => {
  playNextTrack();
});

volumeControl.addEventListener('input', () => {
  const volume = volumeControl.value / 100;
  backgroundMusic.volume = volume;
});

const musicTracks = [
  'music/track1.mp3',
  'music/track2.mp3',
  'music/track3.mp3',
  'music/track4.mp3'
];

let currentTrackIndex = 0;

const playNextTrack = () => {
  currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
  const nextTrackSource = musicTracks[currentTrackIndex];
  backgroundMusic.src = nextTrackSource;
  backgroundMusic.load();
  if (isMusicPlaying) {
    backgroundMusic.play();
  }
};
