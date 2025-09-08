import {fetchCreatBasket} from '/frontend/component/product/product.js';

async function fetchAllProducBasket(){
    try{
    const response=await fetch(`http://localhost:3000/api/baskets/userBasket`,{
    method:'GET',
    headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken}`
    }
    })

    const data=await response.json()

    const containerbasket=document.querySelector('cont-basket')
    containerbasket.innerHTML=''

    data.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.className='basket-item';
    itemElement.innerHTML = `
      <span>${item.productName}</span>
      <span>${item.totalPrice}</span>
      <button class="btn-minus">-</button>
      <input type="number" value="${item.quantity}" />
      <button class="btn-plus">+</button>
    `;

    containerbasket.appendChild(itemElement);

    const btnPlus = itemElement.querySelector('.btn-plus');
    const btnMinu = itemElement.querySelector('.btn-minus');
    const inpQuantity = itemElement.querySelector('input');

    //btn plus icon
    btnPlus.addEventListener('click', async () => {
    let quantity = parseInt(inpQuantity.value) || 0;
    quantity++;
    inpQuantity.value = quantity;
    updateTotal();
    await fetchCreatBasket(prod.id, quantity, Number(discountedPrice), getToken);
    });

    //btn mint icon
    btnMinu.addEventListener('click', async () => {
    let quantity = parseInt(inpQuantity.value) || 1;
    if (quantity <= 1) {
      inpQuantity.value = 1;
      return;
    }
    quantity--;
    quantityInp.value = quantity;
    updateTotal();
    await fetchCreatBasket(prod.id, quantity, Number(discountedPrice), getToken);
  });

    });

    }catch(err){

    }
   
}

