let root = document.documentElement;


const azure = document.getElementById("azure");
const suncream = document.getElementById("suncream");
const colection_image = document.getElementById("coleccion-image");


azure.addEventListener("mouseover", function(event){
  colection_image.style.backgroundImage = 'url("./images/azureBreeze.jpg")'
  colection_image.style.backgroundPosition = '0px 0px' 
})

suncream.addEventListener("mouseover", function(event){
  colection_image.style.backgroundPosition = '-160px 0'  
  colection_image.style.backgroundImage = 'url("./images/suncream.JPG")'
  
})


function buttonAnimation(event) {
  event.preventDefault()
  const wrapper = document.getElementsByClassName( "button-wrapper" )[0];
    if(!wrapper.className.includes( ".checked" )) {
          wrapper.classList.add( "checked" );
          setTimeout(function(){
              wrapper.classList.remove( "checked" );
          }, 8000);
      }
};



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

function responsive(){
  const ratio = window.innerWidth/window.innerHeight;
  var bg_1 = document.getElementsByClassName("background-1")[0];
  var bg_2 = document.getElementsByClassName("background-2")[0];
  
  if (ratio <= 1.5){
    bg_1.classList.add("small-ratio")
    bg_2.classList.add("small-ratio")
    const adjustmentCurve = (ratio - 1.50308515)/0.03738281
    root.style.setProperty('--bg-translate', adjustmentCurve+"em");
  }
  else{
    bg_1.classList.remove("small-ratio")
    bg_2.classList.remove("small-ratio")
    root.style.setProperty('--bg-translate', 0+"em")
  }
}

function responsiveMenu(){
  const menu = document.getElementById("topnav");
  if (menu.className === "div-menu-options") {
    menu.className += " responsive";
  } else {
    menu.className = "div-menu-options";
  }
}


window.addEventListener("DOMContentLoaded", fitContent);
window.addEventListener("scroll", reveal);
window.addEventListener("resize", responsive);



// var bg = document.getElementsByClassName("background-1")[0];
//   bg.style.backgroundSize = "60px 120px"