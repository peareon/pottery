let shoppingButtonsHTML = document.getElementsByClassName("shoppingButton");
let itemsInCart = JSON.parse(localStorage.getItem('cart'));
let shoppingButtons = Array.from(shoppingButtonsHTML);

function updateButtons(){
    itemsInCart.forEach(item => {
        shoppingButtons.forEach(button =>{
            if(item.name === button.dataset.nombre){
                button.disabled = true;
                button.innerHTML = `In cart`;
            }
        })
    });
}



window.addEventListener("DOMContentLoaded", function(){
    updateButtons();
  });