var modal = document.getElementById("index-modal");
var modalBtn = document.getElementById("index-btn");
var modalSpan = document.getElementsByClassName("modal-close")[0];

modalBtn.onclick = function() {
  modal.style.display = "block";
}

modalSpan.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}