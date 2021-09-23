window.function = function (title, volume, author, songVal, img, url) {
  // data
  title = title.value ?? "";
  volume = volume.value ?? 50;
  if (volume < 0) volume = 0;
  if (volume > 100) volume = 100;

  author = author.value ?? "";
  songVal = songVal.value ?? "";
  img = img.value ?? "";
  url = url.value ?? "";

  let ht = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>Dictaphone</title>
    
      <style>
      * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    :root {
      font-size: 14px;
      font-family: "Roboto", sans-serif;
      --cubic-header: var(--duration) cubic-bezier(0.71, 0.21, 0.3, 0.95);
      --bg: #ebebeb;
      --black: #333333;
      --prog: #2f88a8;
    }
    
    body {
      color: var(--black);
    }
    
    .player {
      width: 80%;
      max-width: 275px;
      min-height: 400px;
      height: 480px;
      margin: 2rem auto;
      padding: 3rem 1.25rem;
      background: var(--bg);
      box-shadow: 8px 8px 10px #787878;
      border-radius: 15px;
      border: 1px solid rgb(223, 223, 223);
      position: relative;
    }
    
    /************************************
    * Header (cache, titre menu, search)
    ************************************/
    .player::before {
      content: "";
      display: block;
      background: #333;
      width: 100px;
      height: 20px;
      border-radius: 0 0 50% 50%;
      position: absolute;
      top: 0;
      left: 87px;
    }
    
    .header {
      position: relative;
      top: -30px;
      height: 40px;
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
      align-items: center;
      justify-items: center;
    }
    
    .header > .button {
      width: 2rem;
      height: 2rem;
      display: grid;
      align-items: center;
      justify-items: center;
      color: var(--black);
      background: linear-gradient(145deg, #fbfbfb, #d4d4d4);
      box-shadow: 4px 4px 7px #cccccc, -4px -4px 7px #ffffff;
      border-radius: 6px;
      position:relative;
      top:-5px;
    }

    .header_title {
      user-select: none;    
    }
    
    /**********************************
    *         Info Artist, Song
    **********************************/
    .artist {
      position: relative;
      top: -180px;
      margin: 1rem 0;
      width: 170px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      color: var(--black);
      font-weight: 900;
      user-select: none;    
    }
    
    .song {
      position: relative;
      top: -140px;
      margin: 1rem 0;
      width: 170px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 0.9rem;
      color: var(--black);
      user-select: none;    
    }
    
    /**********************************
    *         Progress Bar
    **********************************/
    
    .prog-time {
      position: relative;
      top: -110px;
      padding: 3px 5px;
      color: var(--prog);
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
    
    .prog-time > p {
      font-size: 0.85rem;
      user-select: none;    
    }
    
    .prog-bar {
      position: relative;
      top: -100px;
      width: 100%;
      height: 10px;
      padding: 1px;
      border-radius: 25px;
    
      background: linear-gradient(145deg, #fbfbfb, #d4d4d4);
      box-shadow: 5px 5px 10px #a5a5a5, -5px -5px 10px #ffffff;
    }
    
    .prog-bar-inner {
      height: 8px;
      background: var(--prog);
      border-radius: 25px;
    }
    
    .currentTime {
      user-select: none;    
    }

    .durationTime {
      user-select: none;    
    }
    /**********************************
    *             Boutons
    **********************************/
    button {
      border: 0;
    }
    
    button:active,
    .button-on {
      box-shadow: inset 6px 6px 12px #c8c8c8, inset -6px -6px 12px #ffffff;
      background-color: #ffe1a3;
      background: rgb(255, 247, 231);
      background: radial-gradient(
        circle,
        rgba(255, 247, 231, 1) 0%,
        rgba(255, 225, 163, 1) 100%
      );
    }
    
    button:disabled {
      color: #cccccc;
    }
    
    .buttons {
      position: relative;
      top: -120px;
      margin: 2rem 0;
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .button {
      color: var(--prog);
      border-radius: 50%;
      margin: 0 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 5px 5px 10px #d4d4d4, -5px -5px 10px #ffffff;
    }
    
    .button-small {
      width: 2rem;
      height: 2rem;
      opacity: 0.75;
    }
    
    .button-medium {
      width: 2.5rem;
      height: 2.5rem;
      opacity: 0.85;
    }
    
    .button-large {
      width: 3.25rem;
      height: 3.25rem;
    }
    
    .rec-on {
      background-color: #fc3838;
      box-shadow: 0px 0px 40px #4183c4;
      animation: clignote 0.5s infinite linear;
      box-shadow: inset 6px 6px 12px #c8c8c8, inset -6px -6px 12px #ffffff;
      background-color: red;
    }
    
    .rec i {
      font-size: 20px;
    }
    
    @keyframes clignote {
      0% {
        box-shadow: 0px 0px 10px #4183c4;
        background: #800000;
        color: white;
      }
      50% {
        box-shadow: 0px 0px 0px #4183c4;
        background: #d30303;
        color: wheat;
      }
      100% {
        box-shadow: 0px 0px 10px #4183c4;
        background-color: #fc3838;
        color: whitesmoke;
      }
    }
    
    /**********************************
    *              End Bar
    **********************************/
    .bar {
      width: 50%;
      height: 3px;
      margin: auto;
      background: var(--black);
      border-radius: 25px;
      position: relative;
      top: -125px;
      bottom: 1rem;
    }
    
    /**************************** 
    *            K7 
    *****************************/
    svg {
      position: relative;
      top: -30px;
      width: 280px;
      height: 160px;
    }
    
    rect {
      fill: #f8faed;
    }
    
    .mid-rect {
      fill: #6c6b68;
    }
    
    .shadow {
      filter: url(#shadow);
    }
    
    .shadow-2 {
      filter: url(#shadow-2);
    }
    
    .spin {
      transform-origin: center;
      transform-box: fill-box;
      animation: rotate-wheel 2s infinite linear;
    }
    
    .spinPrevious {
      transform-origin: center;
      transform-box: fill-box;
      animation: rotate-wheel-reverse 0.5s infinite linear;
    }
    
    .spinNext {
      transform-origin: center;
      transform-box: fill-box;
      animation: rotate-wheel 0.5s infinite linear;
    }
    
    @keyframes rotate-wheel {
      from {
        transform: rotate(360deg);
      }
      to {
        transform: rotate(0deg);
      }
    }
    
    @keyframes rotate-wheel-reverse {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    /**************************** 
    *          PlayList
    *****************************/
    .list {
      margin: 0;
      padding: 0;
    
      list-style-type: none;
    }
    
    .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .player__playlist {
      position: relative;
      top: -140px;
      height: 130px;
      overflow: auto;
      padding: 8px;
      border: 2px solid #d8d8d8;
      border-radius: 15px;
    }
    
    .player__playlist::-webkit-scrollbar {
      width: 0;
    }
    
    .player__img {
      width: 3.22em;
      height: 3.22em;
      border-radius: 1.32em;
    }
    
    .player__img--absolute {
      top: 1.4em;
      left: 1.2em;
      position: absolute;
    }
    
    .player__song {
      /*     gap: 0 .65em ; */
      display: flex;
      cursor: pointer;
      margin-bottom: 0.5em;
      padding-bottom: 0.7em;
    
      border-bottom: 0.1em solid #d8d8d8;
    }
    
    .player__song .player__context {
      line-height: 1.5;
      margin-left: 0.5em;
    }
    
    .player__controls.move .slider__context {
      width: 49.48%;
    }
    
    .player__song-name,
    .player__title {
      font-size: 0.88em;
    }
    
    /*
    .player__song-on {
    }
    */
    
    .player__song-off {
      display: none;
    }
    
    /**************************** 
    *           Progress
    *****************************/
    .progres {
      position: relative;
      top: -103px;
      width: 100%;
      height: 1em;
      padding: 2px;
      border-radius: 1em;
      cursor: pointer;
      touch-action: none;
      transition: width var(--cubic-header);
      background: linear-gradient(145deg, #fbfbfb, #d4d4d4);
      box-shadow: 5px 5px 10px #a5a5a5, -5px -5px 10px #ffffff;
    }
    
    .progres__filled {
      width: 0%;
      height: 100%;
      padding: 5px;
      display: flex;
      position: relative;
      align-items: center;
      border-radius: inherit;
      background-color: var(--prog);
    }
    
    .progres__filled::before {
      right: 0;
      width: 0.35em;
      content: " ";
      height: 0.35em;
      border-radius: 50%;
      position: absolute;
      background-color: #5781bd;
    }
    
    /**************************** 
    *           Volume
    *****************************/
    .volume-box {
      display: none;
      position: absolute;
      top: 210px;
      width: 240px;
      height: 40px;
      border: 2px solid #d8d8d8;
      border-radius: 10px;
      background: #ebebeb;
      box-shadow: 5px 5px 10px #a5a5a5, -5px -5px 10px #ffffff;
      /*padding: 0 20px;*/
      z-index: 3;
    }
    
    .volume-down {
      position: relative;
      left: 5px;
      top: 8px;
      transform: translateY(-50%);
      cursor: pointer;
      color: #72646f;
      font-size: medium;
    }
    
    .volume-up {
      position: relative;
      right: -5px;
      top: 8px;
      transform: translateY(-50%);
      cursor: pointer;
      color: #72646f;
      font-size: medium;
    }
    
    .volume-up::selection {
      background-color: unset;
    }
    
    input[type="range"] {
      position: relative;
      top: 7px;
      height: 8px;
      width: 80%;
      left: 5px;
    }
    
    .volume-box.active {
      display: block;
    }
    
    /**************************** 
    *       Rec Visualizer
    *****************************/
    .rec-visualizer {
      display: none;
      position: absolute;
      top: 220px;
      width: 240px;
      height: 40px;
      border: 2px solid #d8d8d8;
      border-radius: 10px;
      background: #ebebeb;
      box-shadow: 5px 5px 10px #a5a5a5, -5px -5px 10px #ffffff;
      /*padding: 0 20px;*/
      z-index: 3;
    }
    /*
    .visualizer {
    }
    */
    
    canvas {
      display: block;
      position: relative;
      width: 230px;
      height: 28px;
      top: 5px;
      left: 3px;
    }
    
    .rec-visualizer.active {
      display: block;
    }
    
      </style>
    
      </head>
  
    <body>
      <main class="player">
        <!-- Header -->
        <div class="header">
          <div class="button">
            <button class="menu" disabled>
              <i class="fas fa-bars" aria-hidden="true"></i>
            </button>
          </div>
          <div class="header_title">Dictaphone</div>
          <div class="button">
            <button class="search" disabled>
              <i class="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <!-- K7 -->
        <svg viewBox="4 18 70 20">
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0" dy="-0.3" stdDeviation="0.2" />
            </filter>
          </defs>
          <defs>
            <filter id="shadow-2">
              <feDropShadow dx="0" dy="0" stdDeviation="0.3" />
            </filter>
          </defs>
  
          <!-- Cadre #BDC0B9 -->
          <path
            d="M5 10, Q5 8, 7 8, L60 8, Q62 8, 62 10, L62 45, Q62 47, 60 47, L7 47, Q5 47, 5 45 L5 10"
            fill-opacity="0.3"
            fill="#BDC0B9"
          />
  
          <!-- Etiquette -->
          <path
            d="M10 15, Q10 13, 12 13, L55 13, Q57 13, 57 15, L57 35, Q57 37, 55 37, L13 37, Q10 37, 10 35, L10 15"
            fill="#ACAAAB"
            class="shadow-2"
          />
  
          <!-- Cache -->
          <path
            d="M15 47, L18 40, L50 40, L53 47, L15 47"
            fill="#B1B4AF"
            class="shadow"
          />
  
          <!-- Line Middle -->
          <path d="M10 20, L57 20, L57 25, L10 25" fill="#F8FAED" />
  
          <!-- vis -->
          <circle cx="8" cy="11" r="1" fill="#D4C9C3" />
          <circle cx="59" cy="11" r="1" fill="#D4C9C3" />
          <circle cx="8" cy="44" r="1" fill="#D4C9C3" />
          <circle cx="59" cy="44" r="1" fill="#D4C9C3" />
  
          <!-- trou bottom -->
          <circle cx="23" cy="44" r="1" fill="#F8FAED" />
          <circle cx="45" cy="44" r="1" fill="#F8FAED" />
  
          <!-- -->
          <rect x="28" y="42" rx="0" ry="0" width="1.5" height="1.5" />
          <rect x="38" y="42" rx="0" ry="0" width="1.5" height="1.5" />
          <rect x="15" y="20" rx="6" width="37" height="12" class="mid-rect" />
          <rect x="27" y="24" width="13" height="6" />
  
          <!-- 	middle circles-->
          <circle cx="21" cy="26" r="4.5" fill="#5F5E5C" />
          <circle cx="46" cy="26" r="4.5" fill="#5F5E5C" />
          <circle cx="21" cy="26" r="3.5" fill="#F8FAED" />
          <circle cx="46" cy="26" r="3.5" fill="#F8FAED" />
  
          <!-- 	animation -->
          <g class="first-g">
            <path d="M19 23, L23 29" stroke="#889173" stroke-width=".4" />
            <path d="M23 23, L19 29" stroke="#889173" stroke-width=".4" />
            <path d="M17 26, L25 26" stroke="#889173" stroke-width=".4" />
  
            <circle cx="21" cy="26" r="2" fill="#F8FAED" />
          </g>
          <g class="second-g">
            <path d="M48 23, L44 29" stroke="#889173" stroke-width=".4" />
            <path d="M44 23, L48 29" stroke="#889173" stroke-width=".4" />
            <path d="M42 26, L50 26" stroke="#889173" stroke-width=".4" />
            <circle cx="46" cy="26" r="2" fill="#F8FAED" />
          </g>
  
          <!-- 	size -->
          <path
            d="M5 45, L4 43, L4 35, L5 33"
            fill="#B6B5B1"
            fill-opacity="0.3"
          />
          <path
            d="M62 45, L63 43, L63 35, L62 33"
            fill="#B6B5B1"
            fill-opacity="0.3"
          />
        </svg>
  
        <!-- Infos -->
        <div class="artist"></div>
        <div class="song"></div>
  
        <div class="player__controls">
          <!--  progressBar  -->
          <div class="pgbbar">
            <div class="prog-time">
              <div class="currentTime"></div>
              <div class="durationTime"></div>
            </div>
          </div>
          <div class="progres">
            <div class="progres__filled"></div>
          </div>
  
          <!-- Volume -->
          <div class="volume-box">
            <span class="volume-down"><i class="fas fa-volume-down"></i></span>
            <input
              type="range"
              class="volume-range"
              step="1"
              min="0"
              max="100"
              oninput="playerAudio.volume = this.value/100"
            />
            <span class="volume-up"><i class="fas fa-volume-up"></i></span>
          </div>
  
          <!-- Visualizer -->
          <div class="rec-visualizer">
            <canvas class="visualizer"></canvas>
          </div>
        </div>
  
        <!-- Boutons -->
        <ul class="buttons">
          <!--
        <button class="random button button-medium">
          <i class="fas fa-random fa-sm" aria-hidden="true"></i>
        </button>
      -->
          <button class="previous button button-medium">
            <i class="fas fa-step-backward" aria-hidden="true"></i>
          </button>
  
          <button class="play button button-large">
            <i class="fas fa-play fa-lg" aria-hidden="true"></i>
          </button>
  
          <button class="rec button button-large">
            <i class="fas fa-microphone" aria-hidden="true"></i>
          </button>
  
          <button class="next button button-medium">
            <i class="fas fa-step-forward"></i>
          </button>
  
          <button class="btnvolume button button-small">
            <i class="fas fa-volume-up"></i>
          </button>
        </ul>
        <!-- playlist -->
        <ul class="player__playlist list"></ul>
        <!-- end bar -->
        <div class="bar"></div>
      </main>
  
      <script
      src="https://kit.fontawesome.com/7d35781f0a.js"
      crossorigin="anonymous"
    ></script>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
      rel="stylesheet"
    />
      
  
      <script>
      let title = "${title}";

let configVolume = ${volume / 100};

let songs = '';
songs = [];

let authors = "${author}".split(",");
let titres = "${songVal}".split(",");
let imgs = "${img}".split(",");
let urls = "${url}".split(",");

let max = Math.max(authors.length, titres.length, imgs.length, urls.length);

for (let i = 0; i < max; i++) {
  let lstAuthor;
  let lstSong;
  let lstImage;
  let lstUrl;

  if (i < authors.length) {
    lstAuthor = authors[i];
  }
  if (i < titres.length) {
    lstSong = titres[i];
  }
  if (i < imgs.length) {
    lstImage = imgs[i];
  }

  if (i < urls.length) {
    lstUrl = urls[i];
  }


  let obj = {
    artistName: lstAuthor,
    songName: lstSong,
    image: lstImage,
    url: lstUrl,
  };

 songs.push(obj);
}


let playerAudio = new Audio();

//Button
let previousButton = document.querySelector(".previous");
let playButton = document.querySelector(".play");
//let pauseButton = document.querySelector(".pause");
let recButton = document.querySelector(".rec");
//let stopButton = document.querySelector(".stop");
let nextButton = document.querySelector(".next");
let volumebutton = document.querySelector(".btnvolume");
// Animation
let firstG = document.querySelector(".first-g");
let secondG = document.querySelector(".second-g");
// Info Artist, Song
let artist = document.querySelector(".artist");
let song = document.querySelector(".song");
// Info CurrentTime, Duration
let currentTime = document.querySelector(".currentTime");
let durationTime = document.querySelector(".durationTime");
// PlayList
let playerPlayList = document.querySelectorAll(".player__song");
let playList = document.querySelector(".player__playlist");
// ProgressBar
let progres = document.querySelector(".progres");
let progresFilled = progres.querySelector(".progres__filled");
// Volume
let volBox = document.querySelector(".volume-box");
let volRange = document.querySelector(".volume-range");
// Visualizer
let recVisualizer = document.querySelector(".rec-visualizer");
let canvas = document.querySelector(".visualizer");
let canvasCtx = canvas.getContext("2d");

let currentSongIndex = 0;
let isPlay = false;
let isRec = false;
let audioCtx;

////////////////////////////////////////////
// Init & Start
////////////////////////////////////////////

recButton.style.display = "none";

start();

////////////////////////////////////////////
// Elements Events
////////////////////////////////////////////
// ProgressBar (scurb)
progres.addEventListener("pointerdown", (e) => {
  scurb(e);
  isMove = true;
});

document.addEventListener("pointermove", (e) => {
  if (isMove) {
    scurb(e);
    song.muted = true;
  }
});

document.addEventListener("pointerup", () => {
  isMove = false;
  song.muted = false;
});

// Buttons Events
recButton.addEventListener("click", function () {
  record();
});
/*
stopButton.addEventListener("click", function () {
  stop();
});
*/
playButton.addEventListener("click", function () {
  play();
});

nextButton.addEventListener("click", function () {
  nextSong();
});

previousButton.addEventListener("click", function () {
  previousSong();
});

volumebutton.addEventListener("click", function () {
  volBox.classList.toggle("active");
});

////////////////////////////////////////////
// Audio Events
////////////////////////////////////////////

//audio.onplay = function () {};

//audio.onpause = function () {};

//audio.onchange = function () {};

//audio.oncanplay = function () {};

//audio.onplaying = function () {};

playerAudio.onended = function () {
  if (isPlay) {
    nextSong();
  } else {
    playerAudio.currentTime = 0;
  }
};

playerAudio.ontimeupdate = function () {
  progresUpdate();
};

playerAudio.onload = function () {
  // !!!?????????
  //progresUpdate();
};

function play() {
  if (!isPlay) {
    isPlay = true;
    //progresUpdate();

    //playerAudio.play();

    // Show loading animation. (https://goo.gl/LdLk22)
    var playPromise = playerAudio.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Automatic playback started!
          progresUpdate();
          btnAllOff();
          playButton.classList.add("button-on");
          spin();
        })
        .catch((error) => {
          // Auto-play was prevented
          // Show paused UI.
        });
    }
  } else {
    pause();
  }
}

function pause() {
  isPlay = false;
  playerAudio.pause();
  btnAllOff();
  spinRemove();
}

function stop() {
  pause();
  playerAudio.currentTime = 0;
  btnAllOff();
  stopButton.classList.add("button-on");
  spinRemove();
}

function currentSong(index) {
  if (index === undefined) {
    artist.innerText = songs[cureentSongIndex].artistName;
    song.innerHTML = songs[currentSongIndex].songName;
    return songs[currentSongIndex];
  } else if (index < songs.length) {
    artist.innerText = songs[index].artistName;
    song.innerHTML = songs[index].songName;
  }
}

function nextSong() {
  //

  newSongIndex = currentSongIndex + 1;

  currentSong(newSongIndex);

  if (newSongIndex < songs.length) {
    btnAllOff();

    nextButton.classList.add("button-on");

    if (!isPlay) {
      firstG.classList.add("spinNext");
      secondG.classList.add("spinNext");
      setTimeout(() => {
        firstG.classList.remove("spinNext");
        secondG.classList.remove("spinNext");
        nextButton.classList.remove("button-on");
      }, 300);
    }

    playerAudio.src = songs[newSongIndex].url;
    playerAudio.currentTime = 0.0001;
    playlist_selectOn(newSongIndex);
    progresUpdate();
    if (isPlay) {
      isPlay = false;
      play();
    } else {
      pause();
    }

    return (currentSongIndex = newSongIndex);
  } else {
    btnAllOff();
    spinRemove();
    return currentSongIndex;
  }
}

function previousSong() {
  newSongIndex = currentSongIndex - 1;

  currentSong(newSongIndex);

  if (newSongIndex < 0) {
    return currentSongIndex;
  } else {
    btnAllOff();
    previousButton.classList.add("button-on");

    if (!isPlay) {
      firstG.classList.add("spinPrevious");
      secondG.classList.add("spinPrevious");
      setTimeout(() => {
        firstG.classList.remove("spinPrevious");
        secondG.classList.remove("spinPrevious");
        previousButton.classList.remove("button-on");
      }, 300);
    }

    playerAudio.src = songs[newSongIndex].url;
    playerAudio.currentTime = 0.0001;
    playlist_selectOn(newSongIndex);
    progresUpdate();
    if (isPlay) {
      isPlay = false;
      play();
    } else {
      pause();
    }
    return (currentSongIndex = newSongIndex);
  }
}

////////////////////////////////////////////
// Record
////////////////////////////////////////////
let mediaRecorder;

function record() {

  console.log ("bp rec");
  if (!isRec) {

    // Start Record
    console.log("isRec is false");
    
    if (isPlay) {
      pause();
    }

    // Test Media Recorder
    
    if (navigator.mediaDevices.getUserMedia) {
      
      // Record is ok
      isRec = true;
      console.log("record ok");
      const constraints = { audio: true };
      let chunks = [];

      let onSuccess = function (stream) {
        mediaRecorder = new MediaRecorder(stream);
        // Disabled all button & playlist
        btnAllOff();
        recButton.classList.add("rec-on");
        previousButton.disabled = true;
        playButton.disabled = true;
        nextButton.disabled = true;
        volumebutton.disabled = true;

        //playList.disabled = true;
        //playerPlayList.disabled = true;

        recVisualizer.classList.add("active");
        spin();

        visualize(stream);

        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");

        mediaRecorder.onstop = function (e) {
          console.log("data available after MediaRecorder.stop() called.");

          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          chunks = [];
          const audioURL = window.URL.createObjectURL(blob);

          console.log("url", audioURL);
          let newsong = {
            artistName: "Dictaphone",
            songName: "Record #1",
            image: "",
            url: audioURL,
          };
          songs.push(newsong);

          currentSong(songs.length - 1);
          currentSongIndex = songs.length - 1;
          playList_update();
          playlist_selectOn(currentSongIndex);

          playerAudio.src = songs[currentSongIndex].url;
          playerAudio.currentTime = 0.0001;
        };

        mediaRecorder.ondataavailable = function (e) {
          console.log("chunks push");
          chunks.push(e.data);
        };
      };

      let onError = function (err) {
        console.log("The following error occured: " + err);
      };

      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
      
    } else {
      // getUserMedia not supported on your browser!
      console.log("getUserMedia not supported on your browser!");
      spinRemove();
      btnAllOff();
      recButton.classList.remove("rec-on");
      recButton.disabled = true;
      previousButton.disabled = false;
      playButton.disabled = false;
      nextButton.disabled = false;
      volumebutton.disabled = false;

      //playList.disabled = false;
      //playerPlayList.disabled = false;
      isRec = false;
      recVisualizer.classList.remove("active");
    }
    
  } else {
    if (mediaRecorder != undefined) {
      console.log("media stop");
      mediaRecorder.stop();
    }
    spinRemove();
    btnAllOff();
    recButton.classList.remove("rec-on");
    previousButton.disabled = false;
    playButton.disabled = false;
    nextButton.disabled = false;
    volumebutton.disabled = false;

    // playList.disabled = false;
    // playerPlayList.disabled = false;
    isRec = false;
    recVisualizer.classList.remove("active");
  }
}

function visualize(stream) {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }

  const source = audioCtx.createMediaStreamSource(stream);

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);
  
  draw();

  function draw() {
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "#ebebeb";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    let sliceWidth = (WIDTH * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = (v * HEIGHT) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }
}

////////////////////////////////////////////
// Animation & Buttons Display
////////////////////////////////////////////
function spin() {
  firstG.classList.add("spin");
  secondG.classList.add("spin");
}

function spinRemove() {
  firstG.classList.remove("spin");
  secondG.classList.remove("spin");
}

function btnAllOff() {
  previousButton.classList.remove("button-on");
  playButton.classList.remove("button-on");
  // pauseButton.classList.remove("button-on");
  nextButton.classList.remove("button-on");
  recButton.classList.remove("button-rec-on");
  //stopButton.classList.remove("button-on");
}

////////////////////////////////////////////
// Progress Bar & info CurrentTime, Duration
////////////////////////////////////////////
let isMove = false;

function progresUpdate() {
  const progresFilledWidth =
    (playerAudio.currentTime / playerAudio.duration) * 100 + "%";
  if (progresFilledWidth == "NaN%") {
    progresFilled.style.width = 0;
    currentTime.textContent = "0:00";
    durationTime.textContent = "0:00";
  } else {
    progresFilled.style.width = progresFilledWidth;
    currentTime.textContent = formatTime(playerAudio.currentTime);
    durationTime.textContent = formatTime(playerAudio.duration);
  }
}

function formatTime(sec) {
  if (sec == Infinity || sec == NaN) return "";
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec - minutes * 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

function scurb(e) {
  // If we use e.offsetX, we have trouble setting the song time, when the mousemove is running
  const currentTime =
    ((e.clientX - progres.getBoundingClientRect().left) / progres.offsetWidth) *
    playerAudio.duration;
  playerAudio.currentTime = currentTime;
}

////////////////////////////////////////////
// Init & Start
////////////////////////////////////////////
function start() {
  // Chargement PlayList
  let y = (document.querySelector(".header_title").textContent = title);
  playList_update();
  playlist_selectOn(0);
  currentSong(0);
  playerAudio.src = songs[currentSongIndex].url;
  playerAudio.currentTime = 0.0001;
  playerAudio.volume = configVolume;
  progresUpdate();

  let x = document.querySelector(".volume-range");
  x.value = configVolume * 100;
}

////////////////////////////////////////////
// PlayList
////////////////////////////////////////////

function playList_update() {
  playList.innerHTML = "";
  for (let i = 0; i < songs.length; i++) {
    let htmlli = "";
    htmlli =
      '<li class="player__song" onclick="playlistsongclick(this.id)" id=' +
      i +
      ">";

    if (songs[i].image) {
      htmlli +=
        '<img class="player__img img" src="' + songs[i].image + '" alt="">';
    } else {
      htmlli += '<div class="player__img img"></div>';
    }

    htmlli +=
      '<p class="player__context"><b class="player__song-name">' +
      songs[i].artistName +
      '</b><span class="flex"><span class="player__title">' +
      songs[i].songName +
      '</span></p><div class="player__song-on"><i class="fas fa-volume-up"></i></div></li>';
    playList.innerHTML += htmlli;
  }
}

function playlistsongclick(index) {
  let i = parseInt(index);
  currentSongIndex = i;
  currentSong(i);

  playerAudio.src = songs[i].url;
  playerAudio.currentTime = 0.01;
  playlist_selectOn(i);
  progresUpdate();
  if (isPlay) {
    isPlay = false;
    play();
  } else {
    pause();
  }
}

function playlist_selectOn(index) {
  for (let i = 0; i < songs.length; i++) {
    let x = document.getElementById(i);
    if (i == index) {
      let y = x
        .querySelector(".player__song-on")
        .classList.remove("player__song-off");
    } else {
      let y = x
        .querySelector(".player__song-on")
        .classList.add("player__song-off");
    }
  }
}

      </script>
    </body>
  </html>
  `;

  let enc = encodeURIComponent(ht);
  let uri = `data:text/html;charset=utf-8,${enc}`;
  return uri;
};
