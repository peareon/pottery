
let root = document.documentElement;

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
      //let him know there aren't many products in stock
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
  const buttons = document.getElementsByClassName("button-animated")
  const buttonsArr = [...buttons]
  setTimeout(() => {
    buttonsArr.forEach(element => {
      element.classList.add('notransition')
    })   
  }, 3000)    
}

const galeria = document.getElementById("galeria");
galeria.addEventListener("click", e =>{
  const body = document.body;
  const menuButtons = document.getElementsByClassName("button-animated");

  
  const isDropDownButton = e.target.matches("[data-dropdown-button]");
  if(!isDropDownButton && e.target.closest("[data-dropdown]") != null) return;

  
  let currentDropdown;
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

const payButton = document.getElementById("paymentButton");
payButton.addEventListener('click', ()=> {
    fetch("/payment",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart
    }),
    })
    .then(res => {
      console.log(res)
      if (res.ok) return res.json();
      return res.json().then(json => Promise.reject(json))
    }).then(({url}) => {
      window.location = url
    }).then(({session}) =>{
      console.log(session)
    }).catch(e =>{
      console.error(e.error);
    })
  })

window.addEventListener("DOMContentLoaded", function(){
  fitContent();
});

