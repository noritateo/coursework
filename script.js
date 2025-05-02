const audio = document.getElementById('audio-player');
const showInfo = document.getElementById('show-info');
const total = document.getElementById('total');
const scoreModal = document.getElementById("score-modal");
const goHome = document.getElementById("go-home");
const startModal = document.getElementById("start-modal");
const startQuiz= document.getElementById("start-quiz");
const allOptions = [
  document.getElementById('option1'), 
  document.getElementById('option2'), 
  document.getElementById('option3'), 
  document.getElementById('option4')
];

const artists = [
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
let points = 0;
let counter = 15;

function playSong() {
  resetOptions();

  const correctArtist = artists[currentTrack % artists.length];
  const url = "https://itunes.apple.com/search?term=" + encodeURIComponent(correctArtist) + "&media=music&entity=song&attribute=artistTerm&limit=10";

  function skipToNext() {
    currentTrack++;
    playSong();
  }

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const song = data.results.find(result => result.previewUrl);
      if (!song) {
        skipToNext();
        return;
      }

      audio.src = song.previewUrl;
      audio.load();
      audio.play();

      startCountdown(correctArtist);
      showOptions(correctArtist);

      currentTrack++;  
    });
}

function startCountdown(correctArtist) {
  counter = 15; 
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

  var trueOptions = [correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3];

  trueOptions.sort(function() {
    return Math.random() - 0.5;
  });

  allOptions.forEach(function(singleOption, index) {
    singleOption.textContent = trueOptions[index];

    singleOption.onclick = function() {
      checkAnswer(singleOption, correctArtist);
    };
  });
}

function checkAnswer(selectedOption, correctArtist) {
  clearInterval(countdownTimer); 

  allOptions.forEach(function(singleOption) {
    singleOption.disabled = true;

    if (singleOption.textContent === correctArtist) {
      singleOption.style.backgroundColor = 'green';
    }
  });

  if (selectedOption.textContent === correctArtist) {
    showInfo.textContent = "Correct!";
    points += 10 * counter; 
    total.textContent = "Your Score: " + points;
  } else {
    selectedOption.style.backgroundColor = 'red';
    showInfo.textContent = "Wrong!";
  }

  if (currentTrack === artists.length) {
    showFinalModal();
  } else {
    setTimeout(function() {
      playSong();
    }, 3000);
  }
}

function showAnswer(correctArtist) {
  clearInterval(countdownTimer); 

  allOptions.forEach(function(singleOption) {
    singleOption.disabled = true;

    if (singleOption.textContent === correctArtist) {
      singleOption.style.backgroundColor = 'green';
    }
  });

  showInfo.textContent = "Time's up!";

  if (currentTrack === artists.length) {
    showFinalModal();
  } else {
    setTimeout(function() {
      playSong();
    }, 3000);
  }
}

function resetOptions() {

  allOptions.forEach(function(singleOption) {
    singleOption.disabled = false;
    singleOption.style.backgroundColor = '';
  });
}

function showFinalModal() {
  clearInterval(countdownTimer);
  audio.pause();
  document.getElementById('modal-points').textContent = "Your Final Score: " + points;
  scoreModal.style.display = "block";
}

function showStartModal() {

  allOptions.forEach(function(singleOption) {
    singleOption.style.display = "none";
  });

  startModal.style.display = "block";
  startQuiz.style.display = "block";

  startQuiz.onclick = function() {
    startModal.style.display = "none";
    
    allOptions.forEach(function(singleOption) {
      singleOption.style.display = "block";
    });

    setTimeout(function() {
      playSong();
    }, 400); 
  };
}

  showStartModal();