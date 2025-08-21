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
    console.log(data);
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


  productsContainer.innerHTML = '';
  for (const prod of products){
    const imageUrl = prod.image? `${mybaseUrl}${prod.image}`: 'default-image.png';

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
        <p> name:${prod.name}</p>
      </div>
      <div class="box-product-price">
        <div class="product-price">$${prod.price}</div>
          <p class="comment"><a href="#">View all comment</a></p>
         <button class="box-Almost">Add to cart</button>
      </div>
    `;
    
    productsContainer.appendChild(componentProduct);
  };
}

//function=> fetchCategories +createCategoryButtons
async function fetchCategoriesPluscreateCategoryButtons(page, limit) {
  const categories = await fetchCategories(page, limit);
  createCategoryButtons(categories);
}

 //Call category function
fetchCategoriesPluscreateCategoryButtons(1,10);
