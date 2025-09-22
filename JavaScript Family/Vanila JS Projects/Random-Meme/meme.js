const memeImageElem = document.getElementById('meme-image');
const memeTitleElem = document.getElementById('meme-title');
const subredditElem = document.getElementById('subreddit');
const upsElem = document.getElementById('ups');

const authorElem = document.getElementById('author');

const nextMemeButton = document.getElementById('next-meme');
const shareButton = document.getElementById('share');



nextMemeButton.addEventListener('click', () => {
    if (!memeDataArray.length) return;
    memeIndex = (memeIndex + 1) % memeDataArray.length;
    displayMeme();
});

let memeIndex = 0;
let memeDataArray = [];



async function fetchRandomMeme() {
    try {
        const response = await fetch('https://meme-api.com/gimme/10');
        const memeData = await response.json();
        memeDataArray = memeData.memes || [];
        memeIndex = 0;
        displayMeme();
    } catch (error) {
        console.error('Error fetching meme:', error);
    }
}

function displayMeme() {
    if (!memeDataArray.length) return;
    const meme = memeDataArray[memeIndex];
    memeImageElem.src = meme.url;
    memeTitleElem.textContent = meme.title;
    subredditElem.textContent = `r/${meme.subreddit}`;
    upsElem.textContent = `👍 ${meme.ups}`;
    authorElem.textContent = `Posted by u/${meme.author}`;
}

// Initialize on page load
fetchRandomMeme();

