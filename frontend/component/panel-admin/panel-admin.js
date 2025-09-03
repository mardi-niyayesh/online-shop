//import{fetchProductsByCategory}from "/frontend/component/product/product.js"
const $=document
const getToken=localStorage.getItem("Token")
const containerli=$.querySelectorAll(".container-li")
const iconSidbar=$.querySelectorAll(".icon-sidbar")
const admin=$.querySelectorAll(".admin")
const addProductForm=$.querySelector(".addProductForm")
const nameProduct=$.querySelector("#name-product")
const priceProduct=$.querySelector("#price-product")
const description=$.querySelector("#description")
const category=$.querySelector("#category")
const imageProduct=$.querySelector("#image-product")
const addCategory=$.querySelector('.add-category')
const addCat=$.querySelector('.add-cat-panel')
const btnRegisterCategory=$.querySelector('.btn-re-cat')
const namecategory=$.querySelector('.name-category')

//Chang background color on mouseover
containerli.forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.backgroundColor = '#f0f0f0'; 
  });

  element.addEventListener('mouseleave', () => {
    element.style.backgroundColor = ''; 
  });
});

// click submit btn for add product to panel admin
addProductForm.addEventListener("submit",(event)=>{
event.preventDefault()

 if(!nameProduct.value || !priceProduct.value || !category.value){
    alert("لطفا همه فیلدهای ضروری را پر کنید");
    return;
}

if(Number(priceProduct.value) <= 0){
    alert("قیمت باید عددی صحیح و بزرگتر از صفر باشد");
    return;
}
 const formData = new FormData(addProductForm);
 formData.forEach((key,val)=>{
  console.log(key,val);
 })
 const o=Object.fromEntries(formData.entries());
 console.log(o);
 
// formData.append('name', nameProduct.value.toString());
// formData.append('price', priceProduct.value.toString()); 
// formData.append('description', description.value);
// formData.append('categoryId', category.value.toString()); 
// if (imageProduct.files.length > 0) {
//   formData.append('image', imageProduct.files[0]);
// }
console.log(formData);
fetchaddProduct(formData)
})

//add product from panel to products
async function fetchaddProduct(formData){
try{
   const response=await fetch(`http://localhost:3000/api/products`,{
    method: 'POST',
    headers:{
       'Authorization': `Bearer ${getToken}`
    },
      body: formData,
  })

 const data = await response.json();
  if(!data.ok){
    console.log("نمی توانیم محصول رو اضافه کنیم متاسفیم:(",data.message);
    
  }
  console.log('محصول با موفقیت اضافه شد:',data);
  
  }
  catch(err){
    console.log("خطا در ساختن محصولات:",err);
    
  }
  fetchgetproduct()
}

//get all product to server
async function fetchgetproduct(){
  try{
  const response=await fetch(`http://localhost:3000/api/products`,{
  method: 'GET',
  headers: {
        'Authorization': `Bearer ${getToken}`,
        'Content-Type': 'application/json'
      } 
  })
  const data=await response.json()
   console.log('همه محصولات با موفقیت از سرور دریافت شد',data);
  }catch(err){
    console.log('خطا در دریافت محصولات از سرور',err);
    
  } 
}

//get ALL categores by server
async function fetchGetCategory(){
  try{
 const response=await fetch(`http://localhost:3000/api/product-category`,{
  method: 'GET',
  headers: {
        'Authorization': `Bearer ${getToken}`,
        'Content-Type': 'application/json'
      }  
  })

  const data=await response.json()
  if(Array.isArray(data.data)){
    category.innerHTML ='<option value="">select category</option>'
    data.data.forEach(cat=>{
    const optionElem=document.createElement('option')
     optionElem.textContent = cat.title;
     optionElem.value=cat.id;
     category.append(optionElem)
    })
  }
  }
  catch(err){
   console.log('متاسفیم کتگوری ها لود نشد :(',err);
   
  }
}

//show form new category by click add category
addCategory.addEventListener("click",(event)=>{
  event.preventDefault()
  addCat.style.display ='block'
  namecategory.focus();
})

//send request for creat new category by click btnregister
btnRegisterCategory.addEventListener('click',(event)=>{
  event.preventDefault()
  if( namecategory.value === ""){
    alert("لطفا یک کتگوری انتخاب کنید این فیلد نمی تواند خالی باشد")
    return false
  }
   addCat.style.display ='none'
  fetchCreatCategory()
})

//creat category by panelAdmin
 async function fetchCreatCategory(){
    try{
      const response= await fetch(`http://localhost:3000/api/product-category`,{
    method:'POST',
     headers: {
        'Authorization': `Bearer ${getToken}`,
         'Content-Type': 'application/json' 
      },
      body:JSON.stringify({
        title:namecategory.value
      })
    })
    const data=await response.json()
    console.log("شما با موفقیت کتگوری جدید رو ایجاد کردید",data);
    namecategory.value = ''
    fetchGetCategory()
   
    }
    catch(err){
    console.log('متاسفیم کتگوری شما ساخته نشد',err);
    }
}


//call functions
window.addEventListener('DOMContentLoaded',()=>{
  fetchGetCategory()
})
