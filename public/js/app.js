
let root = document.documentElement;


const azure = document.getElementById("azure");
const suncream = document.getElementById("suncream");
const colection_image = document.getElementById("coleccion-image");

//variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
// const productsDOM = document.querySelector(".products-center");

let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

function showCart(){
  cartOverlay.classList.add("transparentBcg");
  cartDOM.classList.add("showCart");
}

function hideCart(){
  cartOverlay.classList.remove("transparentBcg");
  cartDOM.classList.remove("showCart");
}

function clearCart(){
  cartTotal.innerText = 0;
  cartItems.innerText = 0;
  cartContent.replaceChildren();
  localStorage.removeItem('cart');
  const itemsButtonsHTML = document.getElementsByClassName("buttonItemDisabled");
  const itemsButtons = Array.from(itemsButtonsHTML);
  itemsButtons.forEach(button => {
    button.innerHTML = `<img src="/images/tienda/shopping-cart.png" alt="" height="15px"></img>`;
    button.disabled = false;
  });
  cart = []
}

cartBtn.addEventListener("click", showCart);
closeCartBtn.addEventListener("click", hideCart);
clearCartBtn.addEventListener("click", clearCart);

//cart
let itemsTotal = 0;
let tempTotal = 0;
cart.map(item =>{
    tempTotal += item.precio * item.amount;
    itemsTotal += 1;
})
cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
cartItems.innerText = itemsTotal;
// display products
cart.forEach(item =>{
    if (!document.getElementById(item.name)){
      const div = document.createElement('div');
      div.setAttribute("id", item.name); //checar si ya existe en el carrito y no volverlo a crear
      div.classList.add('cart-item');
      div.innerHTML = `
      <img src= ${item.image} alt="product">
      <div>
          <h4>${item.name}</h4>
          <h5>$${item.precio}</h5>
          <span class="remove-item" data-id = ${item.name}>remove</span>
      </div>
      <div>
          <i class="fa fa-chevron-up" data-id = ${item.name} data-cantidad = ${item.stock}></i>
          <p class="item-amount">${item.amount}</p>
          <i class="fa fa-chevron-down" data-id = ${item.name}></i>
      </div>`
      cartContent.appendChild(div);
    }
    
} )

cartContent.addEventListener("click", event => {
  
  if (event.target.classList.contains("remove-item")){
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    let removeItem = event.target;
    let product = event.target.getAttribute("data-id");
    cartContent.removeChild(removeItem.parentElement.parentElement);
    cart = cart.filter(item => item.name !== product);
    let itemsTotal = 0;
    let tempTotal = 0;
    cart.map(item =>{
        tempTotal += item.precio * item.amount;
        itemsTotal += 1;
    })
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
    localStorage.setItem('cart', JSON.stringify(cart));
    //enable buttons
    let enableButton = document.getElementById(product+"1");
    enableButton.innerHTML = `<img src="/images/tienda/shopping-cart.png" alt="" height="15px"></img>`;
    enableButton.disabled = false;
  }

  else if (event.target.classList.contains("fa-chevron-up")){
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    let cantidad = event.target.getAttribute("data-cantidad");
    let addAmount = event.target;
    let product = addAmount.dataset.id;

    let tempItem = cart.find(item => item.name === product);

    if (tempItem.amount < cantidad){
      tempItem.amount = tempItem.amount + 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      let itemsTotal = 0;
      let tempTotal = 0;
      cart.map(item =>{
        tempTotal += item.precio * item.amount;
        itemsTotal += item.amount;
      })
      cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
      cartItems.innerText = itemsTotal;
      addAmount.nextElementSibling.innerText = tempItem.amount;
    }
    else{
      //let him know
    }
  }
  else if(event.target.classList.contains("fa-chevron-down")){
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    let susbtractAmount = event.target;
    let product = susbtractAmount.dataset.id;

    let tempItem = cart.find(item => item.name === product);

    if (tempItem.amount > 1){
      tempItem.amount = tempItem.amount - 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      let itemsTotal = 0;
      let tempTotal = 0;
      cart.map(item =>{
        tempTotal += item.precio * item.amount;
        itemsTotal += 1;
      })
      cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
      cartItems.innerText = itemsTotal;
      susbtractAmount.previousElementSibling.innerText = tempItem.amount;
    }
  } 
})

azure.addEventListener("mouseover", function(event){
  colection_image.style.backgroundImage = 'url("./images/azureBreeze.jpg")'
  colection_image.style.backgroundPosition = '0px 0px' 
})

suncream.addEventListener("mouseover", function(event){
  colection_image.style.backgroundImage = 'url("./images/suncream.jpg")'
})

function fitContent(){
  console.log("listo")
  const ratio = window.innerWidth/window.innerHeight;
  var bg_1 = document.getElementsByClassName("background-1")[0];
  var bg_2 = document.getElementsByClassName("background-2")[0];
  var bg = document.getElementsByClassName("bg-single")[0];
  var container = document.getElementsByClassName("bg-container")[0];
  
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
  const buttons = document.getElementsByClassName("button-animated")
  const bg1 = document.getElementsByClassName("background-1")
  const bg2 = document.getElementsByClassName("background-2")
  const buttonsArr = [...buttons]
  const bgs = [...bg1, ...bg2]
  setTimeout(() => {
    
    buttonsArr.forEach(element => {
      element.classList.add('notransition')
      console.log(element)
    })

    bgs[0].style.opacity = '0.7'
    bgs[1].style.opacity = '0.8'
    bgs.forEach(element => {
      element.classList.add('notransition')
    });
    
  }, 3000)
  
    
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

document.addEventListener("click", e =>{
  const body = document.body;
  const menuButtons = document.getElementsByClassName("button-animated")

  
  const isDropDownButton = e.target.matches("[data-dropdown-button]")
  if(!isDropDownButton && e.target.closest("[data-dropdown]") != null) return

  let currentDropdown
  
  if(isDropDownButton){

    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle('isactive');
    menuButtons[0].classList.add('menu-mobile');
    menuButtons[1].classList.add('menu-mobile');
    menuButtons[2].classList.add('menu-mobile');
    menuButtons[3].classList.add('menu-mobile');
  }

  const menuResopnsive = document.getElementsByClassName("div-menu-options")[0]
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

window.addEventListener("DOMContentLoaded", function(){
  fitContent();
});
window.addEventListener("scroll", reveal);
window.addEventListener("resize", responsive);