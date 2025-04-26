const audio = document.getElementById('audio-player');

var artists = [
    "Adele", "Coldplay", "Bruno Mars", "Taylor Swift", 
    "Lady Gaga", "The Weeknd", "Billie Eilish", "Imagine Dragons", 
    "Rihanna", "Post Malone"
  ];
  
let currentTrack = 0;

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
    });
}


playSong();