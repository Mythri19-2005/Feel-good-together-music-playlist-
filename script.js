// Get elements
const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progress");
const volumeControl = document.getElementById("volume");

const songTitle = document.querySelector(".song-title");
const songArtist = document.querySelector(".song-artist");

const songs = [
  { title: "Song 1", artist: "Artist 1", file: "music1.mp3" },
  { title: "Song 2", artist: "Artist 2", file: "song2.mp3" },
  { title: "Song 3", artist: "Artist 3", file: "song3.mp3" }
];

let currentSongIndex = 0;

// Function to load a song
function loadSong(song) {
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  audio.src = song.file;
  audio.load();
}

// Function to play/pause the song
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playButton.textContent = "Pause";
  } else {
    audio.pause();
    playButton.textContent = "Play";
  }
}

// Function to go to the next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  playButton.textContent = "Pause";
}

// Function to go to the previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  playButton.textContent = "Pause";
}

// Update progress bar as the song plays
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
});

// Update song progress when the progress bar is clicked
progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Adjust the volume
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value / 100;
});

// Initialize the first song
loadSong(songs[currentSongIndex]);

// Event listeners for buttons
playButton.addEventListener("click", togglePlayPause);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);
