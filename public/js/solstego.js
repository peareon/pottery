const suncream1 = document.getElementById("suncream1");
const suncream2= document.getElementById("suncream2");
const suncream3 = document.getElementById("suncream3");
const suncream4 = document.getElementById("suncream4");
const suncream5 = document.getElementById("suncream5");
const suncream6 = document.getElementById("suncream6");
const suncreamDisplay = document.getElementById("suncreamDisplay");


suncream1.addEventListener("mouseover", function(){
    console.log("epa")
  suncreamDisplay.style.backgroundImage = 'url("./images/sucr/full_top.jpg")'
})
suncream2.addEventListener("mouseover", function(){
  suncreamDisplay.style.backgroundImage = 'url("./images/sucr/white_close.jpg")'
})
suncream3.addEventListener("mouseover", function(){
    suncreamDisplay.style.backgroundImage = 'url("./images/sucr/full.jpg")'
})
suncream5.addEventListener("mouseover", function(){
    suncreamDisplay.style.backgroundImage = 'url("./images/sucr/blue_top.jpg")'
})
suncream6.addEventListener("mouseover", function(){
  suncreamDisplay.style.backgroundImage = 'url("./images/sucr/full_side.jpg")'
})

suncream1.addEventListener("click", function(){
    suncreamDisplay.style.backgroundImage = 'url("./images/sucr/full_top.jpg")'
})
suncream2.addEventListener("click", function(){
    suncreamDisplay.style.backgroundImage = 'url("./images/sucr/white_close.jpg")'
})
suncream3.addEventListener("click", function(){
    suncreamDisplay.style.backgroundImage = 'url("./images/sucr/full.jpg")'
})
suncream5.addEventListener("click", function(){
    suncreamDisplay.style.backgroundImage = 'url("./images/sucr/blue_top.jpg")'
})
suncream6.addEventListener("click", function(){
    suncreamDisplay.style.backgroundImage = 'url("./images/sucr/full_side.jpg")'
})