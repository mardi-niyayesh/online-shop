 import { baseUrl } from '/frontend/apibase.js';
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

 // Creat button for category ID
function createCategoryButtons(categories) {
  categories.forEach(category => {
    const btnCategory = document.createElement("button");
    btnCategory.className = 'sign';
    btnCategory.textContent = category.title;
    btnCategory.setAttribute('data-id', category.id);
    containerCategory.appendChild(btnCategory);

    btnCategory.addEventListener('click', () => showProductsByCategory(category.id));
  });
}

//Creat  component for  product category ID
//categoryId =category.id
async function showProductsByCategory(categoryId) {
  const products = await fetchProductsByCategory(categoryId);

  if (!Array.isArray(products)) {
    products = [];
    console.error("پروداکت های شما ارایه نیست", products);
  }
  
productsContainer.innerHTML = '';  

for (const prod of products){

const imageUrl = prod.image? `${mybaseUrl}${prod.image}`: 'default-image.png';

const discountPercent = (Array.isArray(prod.discounts))&&prod.discounts.length > 0 ? prod.discounts[0].percent : 0;
const hasDiscount = discountPercent > 0;
const price = Number(prod.price) || 0;
const discountedPrice = hasDiscount ? (price * (1 - discountPercent / 100)).toFixed(2) : price.toFixed(2);


    const componentProduct = document.createElement('div');
    componentProduct.className = 'main-box-product';

    componentProduct.innerHTML = `
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
    const commentParagraf=componentProduct.querySelector('p.comment')
    commentParagraf.addEventListener("click",(event)=>{
    
   event.preventDefault()
   localStorage.setItem(`getImg`,imageUrl);
  
    localStorage.setItem(`getnameproduct`,prod.name);
    localStorage.setItem(`productId`,prod.id);
 

   window.location.href='/frontend/component/feedbacks/feedback.html'

});

productsContainer.appendChild(componentProduct);
 
const btnAddtocarts= componentProduct.querySelector(".box-Almost")


btnAddtocarts.addEventListener('click', async() => {
  
  const isLogin=checkLogin()
  if(!isLogin){
    alert('ابتدا وارد حساب کاربری خود شوید')
    window.location.href="http://127.0.0.1:5500/frontend/component/Login/sign-in.html"
    return;
  }
   await fetchCreatBasket(prod.id,1,Number(discountedPrice),getToken)

  const messageComponent = document.createElement('div');
  messageComponent.className = 'add-message';
  messageComponent.style.display = 'block'
  messageComponent.innerHTML = `
   <img src="/frontend/images/icons8-close-30.png" alt="" class="icon-close">
<div class="basket-produc">
    <div class="basket-img">
        <img src="${imageUrl}" alt="" style=' width: 200px;'>
    </div>

    <div class="description-product">
        <div class="basket-name">${prod.name}</div>
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

      <div class="container-ico">
          <img src="https://icongr.am/entypo/circle-with-minus.svg?size=29&color=918d8d" alt=""  class='ico-mine'>
         <input type="number" value="1" style="width: 25px;" class='quantity-inp'>
        <img src="https://icongr.am/entypo/circle-with-plus.svg?size=29&color=918d8d" alt="" class='ico-plus'>
      </div>
    </div>
  
   </div>
   </div>
    <button class="btngobasket">go to basket</button>
  `;
document.body.append(messageComponent);
const closeIcon = messageComponent.querySelector('.icon-close');
const plusIcon=messageComponent.querySelector('.ico-plus')
const minIcon=messageComponent.querySelector('.ico-mine')
const quantityinp=messageComponent.querySelector('.quantity-inp')

plusIcon.addEventListener('click',async()=>{
  await fetchCreatBasket(prod.id,1,Number(discountedPrice),getToken)
    let quantity = parseInt(quantityinp.value);
      if (isNaN(quantity)) {
    quantity = 0;
  }
    quantity++
      quantityinp.value = quantity;

})
minIcon.addEventListener('click',async()=>{
 fetchremoveBasket(prod.id)
    let quantity = parseInt(quantityinp.value);

    if (isNaN(quantity) || quantity <= 1) {
    quantity = 1; 
     } 

    quantity--
      quantityinp.value = quantity;

})

closeIcon.addEventListener('click', () => {
    messageComponent.remove(); 
});


});
}
 }

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
   method:'GET',
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
