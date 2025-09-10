
import { baseUrl } from '/frontend/apibase.js';

const getToken=localStorage.getItem("Token")
const basketContainer = document.getElementById('basket-container');

async function fetchAllProducBasket(){
    try{
    const response=await fetch(`${baseUrl}/baskets/userBasket`,{
    method:'GET',
    headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken}`
    }
    })

    const result=await response.json()
    const items=result.items
    console.log(items);
    
    const containerbasket=document.createElement('div')
    containerbasket.className='cont-basket'
    containerbasket.innerHTML=''

    items.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.className='basket-item';
     itemElement.innerHTML=
    `
      <span class='name-probaskt'> name product:${item.product.name}</span>
      <span> total price :${item.price}</span>
      <label>تعداد: <input class="quntity-inpbasket" type="number" value="${item.quantity}"></label>
      <button class='BtnProduct'>dalet product</button>
    `;
 
    containerbasket.append(itemElement);
    basketContainer.append(containerbasket)
  
   const deletBtnProduct=itemElement.querySelector('.BtnProduct')
   deletBtnProduct.addEventListener('click',()=>{
    fetchDeleatProduct()
     itemElement.remove();
   })
    });

    }catch(err){
   console.log('متاسفیم نمی توانیم لیست محصولات سبد خرید رو نشان دهیم ',err);
   
    }
   
}

fetchAllProducBasket()

//remove product to basket
async function fetchDeleatProduct(productId) {
  try {
    const response = await fetch(`${baseUrl}/baskets/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`,
      }
    });

    const data = await response.json();
    console.log('محصول حذف شد:', data);
    return data;
  } catch (error) {
    console.error('خطا در حذف محصول:', error);
  
  }
}
