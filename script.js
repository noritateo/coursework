const audio = document.getElementById('audio-player');
const showInfo = document.getElementById('show-info');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');

var artists = [
  
  "Kaoma", "Scatman John", "Shaggy", "Modern Talking", "Survivor",
  "TLC", "Chaka Khan", "All-4-One", "Ray Parker Jr.", "Kenny Loggins",
  "Pitbull", "Britney Spears", "Elvis Presley", "Savage Garden", "Air Supply",
  "Collin Raye", "M2M", "Gloria Gaynor", "Richard Marx", "Ricky Martin",
  "Europe", "Billy Ocean", "Bonnie Tyler", "Earth, Wind & Fire", "John Lennon",
  "The Police", "Take That", "Magic", "One Republic", "Alan Walker",
  "Clean Bandit", "Alphaville", "Sia", "Lorde", "Maroon 5",
  "Coolio", "Bastille", "Katy Perry", "Michael Bolton", "The Pussycat Dolls",
  "P!nk", "Kelly Clarkson", "Hinder", "Usher", "Cyndi Lauper",
  "Toni Braxton", "Amy Winehouse", "Extreme", "Nelly Furtado", "Linkin Park",
  "Scorpions", "Alicia Keys", "A-ha", "Keane", "The Calling",
  "Hoobastank", "Aerosmith", "The Cranberries", "Radiohead", "The Verve",
  "R.E.M", "4 Non Blondes", "Maneskin", "Eagles", "Santana",
  "Dr Dre", "Blur", "Nirvana", "No Doubt", "Gun N' Roses",
  "Wham!", "The Beatles",  "Avril Lavigne", "Louis Armstrong", "Phil Collins", 
  "The Jackson 5", "Aqua", "Coldplay",  "Bruno Mars",  "Michael Bublé", 
  "Simple Plan", "Eminem", "Billie Eilish", "Evanescence", "Post Malone",
  "Backstreet Boys", "NSYNC", "Bee Gees", "AC/DC", "Fleetwood Mac",
  "Arctic Monkeys", "Mariah Carey", "Green Day", "Oasis", "Goo Goo Dolls", 
  "Paramore", "Spice Girls", "Abba", "Bon Jovi", "Madonna"
]
  
let currentTrack = 0;
let countdownTimer;

function playSong() {
  resetOptions();
  var correctArtist = artists[currentTrack % artists.length];
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

      startCountdown(correctArtist);
      showOptions(correctArtist);
    });
}

function startCountdown(correctArtist) {
  let counter = 15; 
  showInfo.textContent = counter;

  countdownTimer = setInterval(function() {
    counter--;
    if (counter > 0) {
      showInfo.textContent = counter;
    } 
    else {
      clearInterval(countdownTimer);
      showAnswer(correctArtist);
    }
  }, 1000);
}

function showOptions(correctArtist) {
  var correctAnswer = correctArtist;
  var wrongAnswer1 = artists[(currentTrack + 1) % artists.length];
  var wrongAnswer2 = artists[(currentTrack + 5) % artists.length];
  var wrongAnswer3 = artists[(currentTrack + 10) % artists.length];

  var allOptions = [correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3];

  allOptions.sort(function() {
    return Math.random() - 0.5;
  });

  option1.textContent = allOptions[0];
  option2.textContent = allOptions[1];
  option3.textContent = allOptions[2];
  option4.textContent = allOptions[3];

  option1.onclick = function() { checkAnswer(option1, correctArtist); };
  option2.onclick = function() { checkAnswer(option2, correctArtist); };
  option3.onclick = function() { checkAnswer(option3, correctArtist); };
  option4.onclick = function() { checkAnswer(option4, correctArtist); };
}

function checkAnswer(selectedOption, correctArtist) {
  clearInterval(countdownTimer); 

  const allOptions = [option1, option2, option3, option4];

  allOptions.forEach(function(option) {
    option.disabled = true;

    if (option.textContent === correctArtist) {
      option.style.backgroundColor = 'green';
    }
  });

  if (selectedOption.textContent === correctArtist) {
    showInfo.textContent = "Correct!";
  } else {
    selectedOption.style.backgroundColor = 'red';
    showInfo.textContent = "Wrong!";
  }

  setTimeout(function() {
    playSong();
  }, 3000);
}

function showAnswer(correctArtist) {
  clearInterval(countdownTimer); 

  const allOptions = [option1, option2, option3, option4];

  allOptions.forEach(function(option) {
    option.disabled = true;

    if (option.textContent === correctArtist) {
      option.style.backgroundColor = 'green';
    }
  });

  showInfo.textContent = "Time's up!";

  setTimeout(function() {
    playSong();
  }, 3000);
}

function resetOptions() {
  const allOptions = [option1, option2, option3, option4];

  allOptions.forEach(function(singleOption) {
    singleOption.disabled = false;
    singleOption.style.backgroundColor = '';
  });
}


playSong();