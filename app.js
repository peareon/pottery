// window.onwheel = e => {
//     if(e.deltaY >= 0){
//       // Scrolling Down with mouse
//       console.log('Scroll Down');
//     } else {
//       // Scrolling Up with mouse
//       console.log('Scroll Up');
//     }
//   }


// var bg = document.getElementsByClassName("background-1")[0];
//   bg.style.backgroundSize = "60px 120px"


// const width = window.innerWidth;
// const height = window.innerHeight;
// var bg_1 = document.getElementsByClassName("background-1")[0];
// var bg_2 = document.getElementsByClassName("background-2")[0];
// if (width/height <= 1.5){
//   bg_1.classList.add("small-ratio")
//   bg_2.classList.add("small-ratio")
// }

let root = document.documentElement;

function fitContent(){
  const ratio = window.innerWidth/window.innerHeight;
var bg_1 = document.getElementsByClassName("background-1")[0];
var bg_2 = document.getElementsByClassName("background-2")[0];
  if (ratio < 1.5){
    bg_1.classList.add("small-ratio")
    bg_2.classList.add("small-ratio")
    const adjustmentCurve = 1.448+0.131*ratio+0.008*(ratio**2)+0.00016*(ratio**3)
    root.style.setProperty('--bg-translate', adjustmentCurve+"em");
  }
}

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

function responsive(event){
  const ratio = window.innerWidth/window.innerHeight;
  var bg_1 = document.getElementsByClassName("background-1")[0];
  var bg_2 = document.getElementsByClassName("background-2")[0];
  
  if (ratio <= 1.5){
    bg_1.classList.add("small-ratio")
    bg_2.classList.add("small-ratio")
    const adjustmentCurve = (ratio-3.1)**5*(0.1)**ratio
    alert(ratio)
    alert(adjustmentCurve)
    root.style.setProperty('--bg-translate', adjustmentCurve+"em");
  }
  else{
    root.style.setProperty('--bg-translate', 0+"em")
    bg_1.classList.remove("small-ratio")
    bg_2.classList.remove("small-ratio")
  }
}
window.addEventListener("DOMContentLoaded", fitContent);
window.addEventListener("scroll", reveal);
window.addEventListener("resize", responsive);

// var bg = document.getElementsByClassName("background-1")[0];
//   bg.style.backgroundSize = "60px 120px"