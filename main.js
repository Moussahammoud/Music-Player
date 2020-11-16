const musicContainer = document.getElementById('music-container');
const title = document.getElementById('title');
const porgressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const timestamp = document.getElementById('timestamp');

const songs = [
    'Martin Garrix & Third Party - Lions in the wild', 
    'Lucas & Steve - Cant get enough', 
    'Otto Knows & Avicii - Back where I belong',
    'Superman',
    'Titanic Song',
    'Rihanna_Umbrella',
    'Rihanna_Dont-Stop-The-Music',
    'teriyaki boyz - toky',
    'james blunt-good bye my lover',
    'I Will Survive',
    'I Believe I Can Fly',
    'Give Your Heart a Break',
    'evanescence - my immortal',
    'Evanescence - My Last Breath',
    'Everytime Britney Spears',
    'diamonds',
    'David Guetta - When Love Takes Over (Ft. Kelly Rowland)',
    'David Guetta & Akon - Party Animal',
    'David Guetta---Tomorrow Can Wait',
    'Cascada - Evacuate The Dancefloor'
];

console.log(songs.length);

let songIndex = 19;

loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Play Event
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
porgressContainer.addEventListener('click', setAudioProgress);

// Song ends
audio.addEventListener('ended', nextSong);

function updateProgress() {
    progress.value = (audio.currentTime / audio.duration) * 100;
    // console.log(progress.value);

    progress.style.width = `${progress.value}%`;

    let mins = Math.floor(audio.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(audio.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}

function setAudioProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}







// function updateProgress() {}
// const { duration, currentTime } = e.srcElement;
// const progressPercent = (currentTime / duration) * 100;
// console.log(progressPercent);