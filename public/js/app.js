let root = document.documentElement;


const azure = document.getElementById("azure");
const suncream = document.getElementById("suncream");
const colection_image = document.getElementById("coleccion-image");


azure.addEventListener("mouseover", function(event){
  colection_image.style.backgroundImage = 'url("./images/azureBreeze.jpg")'
  colection_image.style.backgroundPosition = '0px 0px' 
})

suncream.addEventListener("mouseover", function(event){
  colection_image.style.backgroundImage = 'url("./images/suncream.jpg")'
})




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
  const buttons = document.getElementsByClassName("button-animated")
  const buttonsArr = [...buttons]
  setTimeout(() => {
    buttonsArr.forEach(element => {
      element.classList.add('notransition')
    });
  }, 8000)
  
    
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
  console.log(ratio)
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

document.addEventListener("click", e =>{
  const body = document.body;


  const isDropDownButton = e.target.matches("[data-dropdown-button]")
  if(!isDropDownButton && e.target.closest("[data-dropdown]") != null) return

  let currentDropdown
  
  if(isDropDownButton){
    currentDropdown = e.target.closest("[data-dropdown]")
    currentDropdown.classList.toggle('isactive')
  }

  const menuResopnsive = document.getElementsByClassName("div-menu-options")[0]
  console.log(menuResopnsive.classList)
  if (!menuResopnsive.classList.contains("responsive")){
    body.style.overflow = 'visible';
    if (!currentDropdown.classList.contains('isactive')){
      body.style.overflow = 'visible';
    }
    else{
      body.style.overflow = 'hidden';
    }
  }
  else{
    body.style.overflow = 'hidden';
  }

})



window.addEventListener("DOMContentLoaded", fitContent);
window.addEventListener("scroll", reveal);
window.addEventListener("resize", responsive);