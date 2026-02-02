// ===== ELEMENTS =====
const message = document.getElementById("message");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttons = document.getElementById("buttons");

// ===== CONFIG =====
// Change the name here
const partnerName = "Nidhi Mishra Ji";

// Music file (must be in same folder)
const music = new Audio("D:\Research_Kaushal\New folder\music.mp3.mp3");
music.loop = true;

// ===== INTERNAL STATE =====
let typingTimers = [];
let audioUnlocked = false;

// ===== TYPEWRITER (SAFE & RESETTABLE) =====
function typeText(text) {
  // Stop any previous typing
  typingTimers.forEach(t => clearTimeout(t));
  typingTimers = [];

  message.innerHTML = "";

  [...text].forEach((char, index) => {
    const timer = setTimeout(() => {
      message.innerHTML += char;
    }, index * 90);
    typingTimers.push(timer);
  });
}

// ===== INITIAL MESSAGE =====
window.onload = () => {
  typeText(`Hey ${partnerName}, will you be my Valentine? 💖`);
};

// ===== AUDIO UNLOCK (CRITICAL FOR MOBILE) =====
function unlockAudio() {
  if (audioUnlocked) return;

  music.volume = 0;
  music.play()
    .then(() => {
      music.pause();
      music.currentTime = 0;
      audioUnlocked = true;
    })
    .catch(() => {
      // Browser blocked it — will try again on next interaction
    });
}

// Unlock audio on FIRST user interaction
document.addEventListener("click", unlockAudio, { once: true });
document.addEventListener("touchstart", unlockAudio, { once: true });

// ===== PLAY MUSIC WITH FADE-IN =====
function playMusic() {
  if (!audioUnlocked) return;

  music.volume = 0;
  music.play();

  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 0.6) {
      vol += 0.02;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 200);
}

// ===== NO BUTTON (RUN AWAY) =====
function moveNoButton() {
  const x = Math.random() * 160 - 80;
  const y = Math.random() * 120 - 60;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

// ===== YES BUTTON (FINAL FLOW) =====
yesBtn.addEventListener("click", () => {
  // Remove buttons
  buttons.style.display = "none";

  // Replace message
  typeText("I knew it 💖");

  // Start music + effects
  playMusic();
  confettiBurst();
});

// ===== FLOATING HEARTS =====
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (4 + Math.random() * 3) + "s";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

setInterval(createHeart, 500);

// ===== CONFETTI =====
function confettiBurst() {
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.innerText = "🎉";
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-20px";
    confetti.style.fontSize = "20px";
    confetti.style.animation = "floatUp 3s linear forwards";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }
}
