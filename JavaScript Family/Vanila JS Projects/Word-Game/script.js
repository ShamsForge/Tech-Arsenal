
// Get DOM elements
const scrambledWord = document.getElementById('scrambled-word');
const guessedInput = document.getElementById('word');
const resultDiv = document.getElementById('result');

// List of words to scramble
const words = [
  "apple", "keyboard", "rocket", "banana", "monitor", "garden",
  "window", "purple", "planet", "guitar", "network", "button",
  "pencil", "cloud", "river"
];

let currentWord = '';

// Scramble logic: Fisher-Yates shuffle
function scrambleWord(word) {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure scrambled word is not the same as original
  if (arr.join("") === word) return scrambleWord(word);
  return arr.join("");
}


function newWord() {
  resultDiv.textContent = "";
  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambledWord.textContent = scrambleWord(currentWord);
  guessedInput.value = "";
  guessedInput.focus();
}

// Check user's guess
function guessWord() {
  const guess = guessedInput.value.trim().toLowerCase();
  if (!guess) {
    resultDiv.textContent = "Type your guess!";
    resultDiv.style.color = "#d35400";
    return;
  }
  if (guess === currentWord) {
    resultDiv.textContent = "Correct! 🎉";
    resultDiv.style.color = "#27ae60";
    setTimeout(newWord, 1200);
  } else {
    resultDiv.textContent = "Try again!";
    resultDiv.style.color = "#c0392b";
  }
}

// Event listeners
document.getElementById('new-word').addEventListener('click', newWord);
document.getElementById('guess-word').addEventListener('click', guessWord);
guessedInput.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') guessWord();
});

// Start with a word
window.onload = newWord;

