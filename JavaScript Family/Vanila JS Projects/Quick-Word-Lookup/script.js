const wordInput = document.getElementById('word-input');
const sendBtn = document.getElementById('send-btn');
const wordElem = document.getElementById('word');
const phoneticsElem = document.getElementById('phonetics');
const meaningsElem = document.getElementById('meanings');
const resultCard = document.getElementById('result-card');

function triggerSearchBtn() {
    const value = wordInput.value.trim();
    if (value) fetchWordData(value);
}

wordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') triggerSearchBtn();
});

if (sendBtn) {
    sendBtn.addEventListener('click', triggerSearchBtn);
}

async function fetchWordData(query) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(query)}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Word not found');
        const data = await res.json();
        displayWordData(data[0]);
    } catch (err) {
        if (resultCard) resultCard.style.display = 'block';
        wordElem.textContent = 'Not found';
        phoneticsElem.innerHTML = '';
        meaningsElem.innerHTML = '';
    }
}

function displayWordData(data) {
    if (resultCard) resultCard.style.display = 'block';
    // Word
    wordElem.textContent = data.word || '';

    // Phonetics
    let phoneticsHTML = '';
    if (data.phonetics && data.phonetics.length) {
        data.phonetics.forEach((p, idx) => {
            if (p.text) {
                phoneticsHTML += `<span>${p.text}</span> `;
            }
            if (p.audio) {
                const audioSrc = p.audio.startsWith('http') ? p.audio : 'https:' + p.audio;
                phoneticsHTML += `
                  <button class="phonetics-audio-btn" data-audio="${audioSrc}" aria-label="Play pronunciation">
                    <svg viewBox="0 0 24 24"><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM14 3.23v2.06c3.39.49 6 3.39 6 6.71s-2.61 6.22-6 6.71v2.06c4.01-.51 7-3.86 7-7.77s-2.99-7.26-7-7.77z"/></svg>
                  </button>
                `;
            }
        });
    }
    phoneticsElem.innerHTML = phoneticsHTML.trim();

    // Add event listeners for audio buttons
    document.querySelectorAll('.phonetics-audio-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const audio = new Audio(this.getAttribute('data-audio'));
            audio.play();
        });
    });

    // Meanings
    let meaningsHTML = '';
    if (data.meanings && data.meanings.length) {
        data.meanings.forEach(meaning => {
            meaningsHTML += `<div class="meaning">`;
            meaningsHTML += `<div class="part-of-speech">${meaning.partOfSpeech}</div>`;
            meaning.definitions.forEach(def => {
                meaningsHTML += `<div class="definition">${def.definition}</div>`;
                if (def.example) {
                    meaningsHTML += `<div class="example">${def.example}</div>`;
                }
            });
            meaningsHTML += `</div>`;
        });
    }
    meaningsElem.innerHTML = meaningsHTML;
}


// fetchWordData('hello');



// Animation code from Codepen.io

function getRandomNumber() {
  return Math.floor(Math.random() * 255);
}

function getBrightness(r, b, g) {
  // brightness calculation from http://alienryderflex.com/hsp.html
  return Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );
}

setInterval(()=> {
  const r = getRandomNumber(),
        g = getRandomNumber(),
        b = getRandomNumber(),
        brightness = getBrightness(r,g,b);
  
  document.documentElement.style.setProperty(`--r`, r);
  document.documentElement.style.setProperty(`--g`, g);
  document.documentElement.style.setProperty(`--b`, b);
  
  let bgColor;
  if (brightness > 40) {
    bgColor = '#121212';
  } else {
    bgColor = '#BDBCBF';
  }
  document.documentElement.style.setProperty(`--bg`, bgColor);
}, 2000);