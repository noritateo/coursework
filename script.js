const audio = document.getElementById('audio-player');
const showInfo = document.getElementById('show-info');

var artists = [
    "Adele", "Coldplay", "Bruno Mars", "Taylor Swift", 
    "Lady Gaga", "The Weeknd", "Billie Eilish", "Imagine Dragons", 
    "Rihanna", "Post Malone"
];
  
let currentTrack = 0;
let countdownTimer;

function playSong() {
  var correctArtist = artists[currentTrack % 10];
  var url = "https://itunes.apple.com/search?term=" + encodeURIComponent(correctArtist) + "&media=music&entity=song&limit=10";
  
  fetch(url)
  .then(function(response) {
    return response.json();
    })
    .then(function(data) {
      var song = data.results[0];
  
      audio.src = song.previewUrl; 
      audio.load();
      audio.play();

      currentTrack++;  

      startCountdown();

    });
}

function startCountdown() {

  let counter = 5; 
  showInfo.textContent = counter;

  countdownTimer = setInterval(function() {
    counter--;
    if (counter > 0) {
      showInfo.textContent = counter;
    } else {
      clearInterval(countdownTimer);
      showInfo.textContent = "Game over!";

      setTimeout(function() {
        playSong(); 
      }, 5000);
    }
  }, 1000);
}

playSong();
