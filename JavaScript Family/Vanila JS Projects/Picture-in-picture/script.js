const videoElem = document.getElementById('video');
const button = document.getElementById('button');

async function promptMedia() {
  try {
    const screenshare = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    videoElem.srcObject = screenshare;
    videoElem.onloadedmetadata = () => {
      videoElem.play();
    } 

  }
  catch (err) {
    if (!videoElem.play)
      prompt("There's something wrong in getting screenshare")

  }
}

button.addEventListener('click', async () => {
  button.disabled = true;
  await videoElem.requestPictureInPicture();
  button.disabled = false;
});

promptMedia();