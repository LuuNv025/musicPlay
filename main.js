const audio = document.querySelector("#audio");
const playPauseBtn = document.querySelector("#play-pause");
const nextBtn = document.querySelector("#next");
const previousBtn = document.querySelector("#previous");
const songList = document.querySelector(".song-list");
const title = document.querySelector("#title");
const record = document.querySelector(".record");
const volSlider = document.querySelector(".slider");

let songArr = [];
let songHeading = "";
let songIndex = 0;
let songIsPlaying = false;
function loadAudio() {
  audio.src = songArr[songIndex];
  let songListItems = songList.getElementsByTagName("li");
  songHeading = songListItems[songIndex].getAttribute("data-name");
  title.innerText = songHeading;
  for (i = 0; i < songListItems.length; i++) {
    songListItems[i].classList.remove("active");
  }
  songList.getElementsByTagName("li")[songIndex].classList.add("active");
}
function loadSong() {
  let songs = songList.getElementsByTagName("li");
  for (i = 0; i < songs.length; i++) {
    songArr.push(songs[i].getAttribute("data-src"));
  }
  loadAudio();
}
loadSong();
const playAudio = () => {
  audio.play();
  playPauseBtn.querySelector("i.fa").classList.remove("fa-play");
  playPauseBtn.querySelector("i.fa").classList.add("fa-pause");
  songIsPlaying = true;
  record.classList.add("record-animation");
};
const pauseAudio = () => {
  audio.pause();
  playPauseBtn.querySelector("i.fa").classList.remove("fa-pause");
  playPauseBtn.querySelector("i.fa").classList.add("fa-play");
  songIsPlaying = false;
  record.classList.remove("record-animation");
};
const nextSong = () => {
  songIndex++;
  if (songIndex >= songArr.length) {
    songIndex = 0;
  }
  loadAudio();
  playAudio();
};
const preSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songArr.length - 1;
  }
  loadAudio();
  playAudio();
};
playPauseBtn.addEventListener("click", () => {
  if (songIsPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});
nextBtn.addEventListener(
  "click",
  () => {
    nextSong();
  },
  false
);
previousBtn.addEventListener(
  "click",
  () => {
    preSong();
  },
  false
);
songList.addEventListener("click", (e) => {
    songIndex = e.target.closest('li').getAttribute("data-index");
    loadAudio();
    playAudio();
},false)
songList.addEventListener("ended",()=>{
    nextSong();
})
volSlider.addEventListener("input", ()=>{
    audio.volume = volSlider.value/100;
})