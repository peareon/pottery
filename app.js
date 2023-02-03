// window.onwheel = e => {
//     if(e.deltaY >= 0){
//       // Scrolling Down with mouse
//       console.log('Scroll Down');
//     } else {
//       // Scrolling Up with mouse
//       console.log('Scroll Up');
//     }
//   }


function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);