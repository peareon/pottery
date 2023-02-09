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
      const adjustmentCurve = (ratio - 1.50308515)/0.03738281
      root.style.setProperty('--bg-translate', adjustmentCurve+"em");
    }
}

function reveal() {
  
  const reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementBottom = reveals[0].getBoundingClientRect().bottom;
    const elementVisible = 40;
    const SVG = document.querySelectorAll(".SVG")[0];
    console.log("Bottom: ", elementBottom, "Diff: ", windowHeight-elementVisible)
    console.log("Top: ", elementTop, "Diff: ", windowHeight-elementVisible)
    if (elementTop < windowHeight - elementVisible) {
      if (reveals[i].className.includes("transition") && !SVG.getAttribute("data")){
        SVG.setAttribute("data", "./images/bg_animated.svg")
      }
      reveals[i].classList.add("active");
    } else {
      if (reveals[i].className.includes("transition") && SVG.getAttribute("data")){
        SVG.setAttribute("data", "")
      }
      reveals[i].classList.remove("active");
    }
    if (elementBottom < 0 && SVG.getAttribute("data")){
      SVG.setAttribute("data", "")
    }
    else if(elementBottom > 0 && !SVG.getAttribute("data")){
      SVG.setAttribute("data", "./images/bg_animated.svg")
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
    const adjustmentCurve = (ratio - 1.50308515)/0.03738281
    // alert(ratio)
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