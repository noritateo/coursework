const audio = document.getElementById('audio-player');
const showInfo = document.getElementById('show-info');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');

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
      showOptions(correctArtist);
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

function showOptions(correctArtist) {
  var correctAnswer = correctArtist;
  var wrongAnswer1 = artists[(currentTrack + 1) % 10];
  var wrongAnswer2 = artists[(currentTrack + 2) % 10];
  var wrongAnswer3 = artists[(currentTrack + 3) % 10];

  var allOptions = [correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3];

  allOptions.sort(function() {
    return Math.random() - 0.5;
  });

  option1.textContent = allOptions[0];
  option2.textContent = allOptions[1];
  option3.textContent = allOptions[2];
  option4.textContent = allOptions[3];
}

playSong();

