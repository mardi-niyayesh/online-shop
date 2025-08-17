const productsContainer=document.querySelector(".product")
const productBox=document.querySelector(".main-box-product")
const nextbtn=document.querySelector(".next")
const prebtn=document.querySelector(".pre")
const signbtn=document.querySelector(".sign")
const containerCategory=document.querySelector(".container-btn-product")
const getToken=localStorage.getItem("Token")


//get categori for fetch
  fetch(`http://localhost:3000/api/product-category?page=${1}&limit=${10}`, {
    method: 'GET',
    
  })
 .then(res=>res.json())
  .then(responsCategory => {
    const cattegoris=responsCategory.data
    if (Array.isArray(cattegoris)) {
      cattegoris.forEach(category => {
        const btnCategory = document.createElement("button");
        btnCategory.className = 'sign';
        btnCategory.textContent = category.title;
        btnCategory.setAttribute('data-id',category.id)

        //get products in category in click button
        btnCategory.addEventListener('click',()=>{
          //get id category
          const categoryId = category.id;
          console.log(categoryId);
          
          
           fetch(`http://localhost:3000/api/products`,{
            method: 'GET',
            headers:{
               'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken}`
            }
           })
          .then(res=>res.json())
          .then(responsProducts=>{
           
            console.log(responsProducts);
            const getpro=responsProducts.data
           
            if(getpro.categoryId==categoryId){
               getpro.forEach(prod => {
              console.log(prod);
              const componentProduct=document.createElement("div")
              componentProduct.classList="main-box-product"
              componentProduct.innerHTML=` <div class="box-img">
                        <img src="/frontend/images/box-img1.png" alt="">
                </div>
                <div class="box-star">
                    <div class="box-star-title">Full Sweater</div>
                        <div class="box-collection-star">
                            <img src="/frontend/images/icon-star.png" alt="">
                            <img src="/frontend/images/icon-star.png" alt="">
                            <img src="/frontend/images/icon-star.png" alt="">
                        </div>
                </div>
                <div class="box-product-brand">
                <p>Al Karam</p>
                </div>
                <div class="box-producr-comment">
                                <p>(4.1k) Customer Reviews</p>
                </div>
                <div class="box-product-price">
                                <div class="product-price">$95.50</div>
                                <div class="box-Almost">
                                 <p><a href="#">Almost Sold Out</a></p>
                                </div>
                </div>`

              productsContainer.appendChild(componentProduct)
            });
            }
            
          })
        })
        containerCategory.appendChild(btnCategory);
      });
    } else {
      // console.error('داده برگشتی آرایه نیست:', data);
    }
  })
  .catch(err => console.log("خطا دریافت شد:", err));




