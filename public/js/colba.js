const azure1 = document.getElementById("azure1");
const azure2= document.getElementById("azure2");
const azure3 = document.getElementById("azure3");
const azure4 = document.getElementById("azure4");
const azure5 = document.getElementById("azure5");
const colDisplay = document.getElementById("colDisplay");

azure1.addEventListener("mouseover", function(){
    colDisplay.style.backgroundImage = 'url("/images/azbr/_DSC0150.jpg")'
  })
  
  azure2.addEventListener("mouseover", function(){
    colDisplay.style.backgroundImage = 'url("/images/azbr/_DSC0128.jpg")'
  })
  
  azure3.addEventListener("mouseover", function(){
    colDisplay.style.backgroundImage = 'url("/images/azbr/cup_tree.jpg")'
  })
  
  azure4.addEventListener("mouseover", function(){
    colDisplay.style.backgroundImage = 'url("/images/azbr/cup.jpg")'
  })
  
  azure5.addEventListener("mouseover", function(){
    colDisplay.style.backgroundImage = 'url("/images/azbr/icy.jpg")'
  })
  
  azure1.addEventListener("click", function(){
      colDisplay.style.backgroundImage = 'url("/images/azbr/_DSC0150.jpg")'
  
  })
    
  azure2.addEventListener("click", function(){
      colDisplay.style.backgroundImage = 'url("/images/azbr/_DSC0128.jpg")'
  })
    
  azure3.addEventListener("click", function(){
      colDisplay.style.backgroundImage = 'url("/images/azbr/cup_tree.jpg")'
  
  })
    
  azure4.addEventListener("click", function(){
      colDisplay.style.backgroundImage = 'url("/images/azbr/cup.jpg")'
  })
    
  azure5.addEventListener("click", function(){
      colDisplay.style.backgroundImage = 'url("/images/azbr/icy.jpg")'
  })