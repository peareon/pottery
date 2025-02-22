function fitContent(){
    const ratio = window.innerWidth/window.innerHeight;
    var bg_1 = document.getElementsByClassName("background-1")[0];
    var bg_2 = document.getElementsByClassName("background-2")[0];
    var bg = document.getElementsByClassName("bg-single")[0];
    var container = document.getElementsByClassName("bg-container")[0];

    const bg1 = document.getElementsByClassName("background-1")
    const bg2 = document.getElementsByClassName("background-2")
    const bgs = [...bg1, ...bg2]

    if (ratio <= 1.5){
        bg_1.classList.add("small-ratio-double");
        bg_2.classList.add("small-ratio-double");
        bg.classList.remove("small-ratio-single");
        container.style.height = "0";
    }

    else{
        bg.classList.add("small-ratio-single");
        bg_1.classList.remove("small-ratio-double");
        bg_2.classList.remove("small-ratio-double");
        container.style.height = "100vh";
    }

    setTimeout(() => {
        bgs[0].style.opacity = '0.7'
        bgs[1].style.opacity = '0.8'
        bgs.forEach(element => {
        element.classList.add('notransition')
        });
    }, 3000)

}

function responsive(){
    const ratio = window.innerWidth/window.innerHeight;
    var bg_1 = document.getElementsByClassName("background-1")[0];
    var bg_2 = document.getElementsByClassName("background-2")[0];
    var bg = document.getElementsByClassName("bg-single")[0];
    var container = document.getElementsByClassName("bg-container")[0];
  
    if (ratio <= 1.5){
      bg_1.classList.add("small-ratio-double")
      bg_2.classList.add("small-ratio-double")
      bg.classList.remove("small-ratio-single")
      container.style.height = "0";
  
    }
    else{
  
      bg.classList.add("small-ratio-single")
      bg_1.classList.remove("small-ratio-double")
      bg_2.classList.remove("small-ratio-double")
      container.style.height = "100vh";
      
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


window.addEventListener("DOMContentLoaded", function(){
    fitContent();
  });

window.addEventListener("resize", responsive);
window.addEventListener("scroll", reveal);