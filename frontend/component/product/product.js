 import { baseUrl } from '/frontend/apibase.js';
 export{fetchCreatBasket}
const  $=document

const productsContainer= $.querySelector(".product ")
const productBox= $.querySelector(".main-box-product")
const nextbtn= $.querySelector(".next")
const prebtn= $.querySelector(".pre")
const signbtn= $.querySelector(".sign")
const containerCategory= $.querySelector(".container-btn-product")

const getToken=localStorage.getItem("Token")
const mybaseUrl = "https://exciting-liskov-zvkoer8rh.storage.c2.liara.space/";


//Get categories from the server
async function fetchCategories(page,limit) {
  try {
    const response = await fetch(`${baseUrl}/product-category?page=${page}&limit=${limit}`, {
      method: 'GET'
    });
    const data = await response.json();
    if (Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error('داده برگشتی آرایه نیست:', data);
      return [];
    }
    
    
  } catch (err) {
    console.log("نمی تونیم کتگوری های پروداکت ها رو نشون بدیم متاسفیم:(", err);
    return [];
  }
}

//Get products from  server by category ID
//categoryId =category.id
async function fetchProductsByCategory(categoryId) {
  try {
    const response = await fetch(`${baseUrl}/products?filter.categoryId=${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
      }
    });
    const dataProduct = await response.json();
    return dataProduct.data;
  } catch (err) {
    console.log("نمی تونیم محصولات رو نشون بدیم متاسفیم :(", err);
    return [];
  }
}

 //Creat button for category ID
function createCategoryButtons(categories) {
  categories.forEach(category => {
    const btnCategory = document.createElement("button");
    btnCategory.className = 'sign';
    btnCategory.textContent = category.title;
    btnCategory.setAttribute('data-id', category.id);
    containerCategory.append(btnCategory);

    btnCategory.addEventListener('click', () => showProductsByCategory(category.id));
  });
}


//Creat  component for  product category ID
//categoryId =category.id
// async function showProductsByCategory(categoryId) {
//   const products = await fetchProductsByCategory(categoryId);

//   if (!Array.isArray(products)) {
//     products = [];
//     console.error("پروداکت های شما ارایه نیست", products);
//   }
  
// productsContainer.innerHTML = '';  

// for (const prod of products){

// const imageUrl = prod.image? `${mybaseUrl}${prod.image}`: 'default-image.png';

// const discountPercent = (Array.isArray(prod.discounts))&&prod.discounts.length > 0 ? prod.discounts[0].percent : 0;
// const hasDiscount = discountPercent > 0;
// const price = Number(prod.price) || 0;
// const discountedPrice = hasDiscount ? (price * (1 - discountPercent / 100)).toFixed(2) : price.toFixed(2);


//     const componentProduct = document.createElement('div');
//     componentProduct.className = 'main-box-product';

//     componentProduct.innerHTML = `
//           <div class="box-img">
//         <img src="${imageUrl}" alt="">
//       </div>
//       <div class="box-star">
//         <div class="box-star-title">Full Sweater</div>
//         <div class="box-collection-star">
//           <img src="/frontend/images/icon-star.png" alt="">
//           <img src="/frontend/images/icon-star.png" alt="">
//           <img src="/frontend/images/icon-star.png" alt="">
//         </div>
//       </div>
//       <div class="box-product-name">
//         <p> name: ${prod.name}</p>
//       </div>
//       <div class="box-product-price">
//         ${
//           hasDiscount 
//           ? `<div class="product-price">
//                <span style="text-decoration: line-through;">$${prod.price}</span>
//                <span style="font-weight: bold; margin-left: 8px;">$${discountedPrice}</span>
//              </div>
//              <button class="discount-btn">${discountPercent}%</button>`
//           : `<div class="product-price">$${prod.price}</div>`
//         }
//         <p class="comment"><a href="#">View all comment</a></p>
//         <button class="box-Almost">Add to cart</button>
//       </div>
//     `;
//     const commentParagraf=componentProduct.querySelector('p.comment')
//     commentParagraf.addEventListener("click",(event)=>{
    
//    event.preventDefault()
//  window.location.href='/frontend/component/feedbacks/feedback.html'

// });

// productsContainer.appendChild(componentProduct);
 
// const btnAddtocarts= componentProduct.querySelector(".box-Almost")


// btnAddtocarts.addEventListener('click', async(event) => {
//    event.preventDefault()
   
//   const isLogin=checkLogin()
//   if(!isLogin){
//     alert('ابتدا وارد حساب کاربری خود شوید')
//     window.location.href="http://127.0.0.1:5500/frontend/component/Login/sign-in.html"
//     return;
//   }
   
//     await fetchCreatBasket(prod.id,1,Number(discountedPrice),getToken)


//   const messageComponent = document.createElement('div');
//   messageComponent.className = 'add-message';
//   messageComponent.style.display = 'block'
//   messageComponent.innerHTML = `
//    <img src="/frontend/images/icons8-close-30.png" alt="" class="icon-close">
// <div class="basket-produc">
//     <div class="basket-img">
//         <img src="${imageUrl}" alt="" style=' width: 200px;'>
//     </div>

//     <div class="description-product">
//         <div class="basket-name">${prod.name}</div>
//           <div class="box-product-price">
//         ${
//           hasDiscount 
//           ? `<div class="product-price">
//                <span style="text-decoration: line-through;" class='pric-productt'>$${prod.price}</span>
//                <span style="font-weight: bold; margin-left: 8px;">$${discountedPrice}</span>
//              </div>
//              <button class="discount-btn">${discountPercent}%</button>`
//           : `<div class="product-price">$${prod.price}</div>`
//         }

//       <div class="container-ico">
//           <img src="https://icongr.am/entypo/circle-with-minus.svg?size=29&color=918d8d" alt=""  class='ico-mine'>
//          <input type="number" value="1" style="width: 25px;" class='quantity-inp'>
//         <img src="https://icongr.am/entypo/circle-with-plus.svg?size=29&color=918d8d" alt="" class='ico-plus'>
//       </div>
//       <div> total price :<span class='total-price'>${discountedPrice}</span></div>
//     </div>
  
//    </div>
//    </div>
//     <button class="btngobasket">go to basket</button>
//   `;

   
// // update total price
// function updateTotal() {
//     const quantity = parseInt(quantityinp.value);
//     totalprice.innerText = discountedPrice * quantity;
// }


// document.body.append(messageComponent);
// const closeIcon = messageComponent.querySelector('.icon-close');
// const plusIcon=messageComponent.querySelector('.ico-plus')
// const minIcon=messageComponent.querySelector('.ico-mine')
// const quantityinp=messageComponent.querySelector('.quantity-inp')
// const totalprice=messageComponent.querySelector('.total-price')

// plusIcon.addEventListener('click',async()=>{
//     let quantity = parseInt(quantityinp.value);
//       if (isNaN(quantity)) {
//     quantity = 0;
//   }
//     quantity++
//     quantityinp.value = quantity;
//     updateTotal()
//      await fetchCreatBasket(prod.id,quantity,Number(discountedPrice),getToken)

// })
// minIcon.addEventListener('click',async()=>{
//     let quantity = parseInt(quantityinp.value);

//     if (isNaN(quantity) || quantity <= 1) {
//     quantity = 1; 
//      quantityinp.value = quantity;
//      return;
//      } 

//     quantity--
//     quantityinp.value = quantity;
//     updateTotal()
//     await fetchCreatBasket(prod.id,quantity,Number(discountedPrice),getToken)

// })

// closeIcon.addEventListener('click', () => {
//     messageComponent.remove(); 
// });


// });
// }
//  }


// ckeck to login
function checkLogin(){
const getToken=localStorage.getItem("Token")
return getToken !== null && getToken !== '';
}

//add to cart product
async function fetchCreatBasket(productId,quantity,price,getToken){
  try{
   const response=await fetch(`http://localhost:3000/api/baskets`,{

   method:'POST',

   body:JSON.stringify({
      items: [
      {
    productId:productId,
    quantity:quantity,
    price:Number(price),
    }
  ]
   }),
   headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken}`
   }
  });
  const data=await response.json();
  console.log('یک محصول به سبد خرید اضافه شد',data);
  
  }catch(err){
    console.log('متاسیم پروداکت شما به سبد خرید اضافه نشد ',err);
    
  }
 };

//remove product to car
async function fetchremoveBasket(productId){
  try{
   const response=await fetch(`http://localhost:3000/api/baskets/${productId}`,{
   method:'DELETE',
   headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken}`
   }
  });
  const data=await response.json();
  console.log('یک محصول از سبدخرید حذف  شد',data);
  
  }catch(err){
    console.log('متاسیم پروداکت شما از سبد خرید حذف نشد ',err);
    
  }
 };

 //function=> fetchCategories +createCategoryButtons
async function fetchCategoriesPluscreateCategoryButtons(page, limit) {
  const categories = await fetchCategories(page, limit);
  createCategoryButtons(categories);
}

 //Call category function
fetchCategoriesPluscreateCategoryButtons(1,10);


//////////////////////////////////////////////////

//Creat  component for  product category ID
async function showProductsByCategory(categoryId) {
  let products = await fetchProductsByCategory(categoryId);

  if (!Array.isArray(products)) {
    console.error("پروداکت های شما ارایه نیست", products);
    products = [];
  }

  productsContainer.innerHTML = '';

  for (const prod of products) {
    const productCard = createProductCard(prod);
    productsContainer.appendChild(productCard);
    attachProductEvents(productCard, prod);
  }
}
//creat component product
function createProductCard(prod) {
  const imageUrl = prod.image ? `${mybaseUrl}${prod.image}` : 'default-image.png';

  const discountPercent =
    Array.isArray(prod.discounts) && prod.discounts.length > 0 ? prod.discounts[0].percent: 0;
   
     
  const hasDiscount = discountPercent > 0;
  const price = Number(prod.price) || 0;
  const discountedPrice = hasDiscount ? (price * (1 - discountPercent / 100)).toFixed(2): price.toFixed(2);

  const card = document.createElement('div');
  card.className = 'main-box-product';

  card.innerHTML = `
    <div class="box-img">
      <img src="${imageUrl}" alt="">
    </div>
    <div class="box-star">
      <div class="box-star-title">Full Sweater</div>
      <div class="box-collection-star">
        <img src="/frontend/images/icon-star.png" alt="">
        <img src="/frontend/images/icon-star.png" alt="">
        <img src="/frontend/images/icon-star.png" alt="">
      </div>
    </div>
    <div class="box-product-name">
      <p> name: ${prod.name}</p>
    </div>
    <div class="box-product-price">
      ${
        hasDiscount
          ? `<div class="product-price">
               <span style="text-decoration: line-through;">$${prod.price}</span>
               <span style="font-weight: bold; margin-left: 8px;">$${discountedPrice}</span>
             </div>
             <button class="discount-btn">${discountPercent}%</button>`
          : `<div class="product-price">$${prod.price}</div>`
      }
      <p class="comment"><a href="#">View all comment</a></p>
      <button class="box-Almost">Add to cart</button>
    </div>
  `;

 //save elemans to another function
  card.dataset.discountedPrice = discountedPrice;
  card.dataset.discountPercent = discountPercent;

  return card;
}

function attachProductEvents(productCard, prod) {
  const imageUrl = prod.image ? `${mybaseUrl}${prod.image}` : 'default-image.png';
  const discountedPrice = productCard.dataset.discountedPrice;
  const discountPercent = productCard.dataset.discountPercent;
  const hasDiscount = Number(discountPercent) > 0;

  // comments
  const commentParagraph = productCard.querySelector('p.comment');
  commentParagraph.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/frontend/component/feedbacks/feedback.html';
  });

  // btn add to cart
  const btnAddToCart = productCard.querySelector(".box-Almost");
  btnAddToCart.addEventListener('click', async (event) => {
    event.preventDefault();

    if (!checkLogin()) {
      alert('ابتدا وارد حساب کاربری خود شوید');
      window.location.href = "http://127.0.0.1:5500/frontend/component/Login/sign-in.html";
      return;
    }

    await fetchCreatBasket(prod.id, 1, Number(discountedPrice), getToken);

    showAddedToBasketMessage(prod, imageUrl, discountedPrice, hasDiscount, discountPercent);
  });
}
//creat component message basket
function showAddedToBasketMessage(prod, imageUrl, discountedPrice, hasDiscount, discountPercent) {
  const messageComponent = document.createElement('div');
  messageComponent.className = 'add-message';
  messageComponent.style.display = 'block';

  messageComponent.innerHTML = `
    <img src="/frontend/images/icons8-close-30.png" alt="" class="icon-close">
    <div class="basket-produc">
      <div class="basket-img">
        <img src="${imageUrl}" alt="" style="width: 200px;">
      </div>
      <div class="description-product">
        <div class="basket-name">${prod.name}</div>
        <div class="box-product-price">
          ${
            hasDiscount
              ? `<div class="product-price">
                   <span style="text-decoration: line-through;" class='pric-productt'>$${prod.price}</span>
                   <span style="font-weight: bold; margin-left: 8px;">$${discountedPrice}</span>
                 </div>
                 <button class="discount-btn">${discountPercent}%</button>`
              : `<div class="product-price">$${prod.price}</div>`
          }
          <div class="container-ico">
            <img src="https://icongr.am/entypo/circle-with-minus.svg?size=29&color=918d8d" alt="" class="ico-mine">
            <input type="number" value="1" style="width: 25px;" class="quantity-inp">
            <img src="https://icongr.am/entypo/circle-with-plus.svg?size=29&color=918d8d" alt="" class="ico-plus">
          </div>
          <div> total price :<span class="total-price">${discountedPrice}</span></div>
        </div>
      </div>
    </div>
    <button class="btngobasket">go to basket</button>
  `;
  // go to basket
  const goToBasketBtn = messageComponent.querySelector('.btngobasket');
  goToBasketBtn.addEventListener('click', () => {
  window.location.href = '/frontend/component/basket/basket.html';
  });

  document.body.appendChild(messageComponent);

  const quantityInp = messageComponent.querySelector('.quantity-inp');
  const totalPriceEl = messageComponent.querySelector('.total-price');
  const closeIcon = messageComponent.querySelector('.icon-close');
  const plusIcon = messageComponent.querySelector('.ico-plus');
  const minIcon = messageComponent.querySelector('.ico-mine');

  function updateTotal() {
    const quantity = parseInt(quantityInp.value) || 1;
    totalPriceEl.innerText = (discountedPrice * quantity).toFixed(2);
  }
  //btn plus icon
  plusIcon.addEventListener('click', async () => {
    let quantity = parseInt(quantityInp.value) || 0;
    quantity++;
    quantityInp.value = quantity;
    updateTotal();
    await fetchCreatBasket(prod.id, quantity, Number(discountedPrice), getToken);
  });
//btn mint icon
  minIcon.addEventListener('click', async () => {
    let quantity = parseInt(quantityInp.value) || 1;
    if (quantity <= 1) {
      quantityInp.value = 1;
      return;
    }
    quantity--;
    quantityInp.value = quantity;
    updateTotal();
    await fetchCreatBasket(prod.id, quantity, Number(discountedPrice), getToken);
  });
 //close component message basket
  closeIcon.addEventListener('click', () => {
    messageComponent.remove();
  });
}
