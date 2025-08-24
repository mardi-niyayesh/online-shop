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

//Chang background color on mouseover
containerli.forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.backgroundColor = '#f0f0f0'; 
  });

  element.addEventListener('mouseleave', () => {
    element.style.backgroundColor = ''; 
  });
});

addProductForm.addEventListener("submit",(event)=>{
event.preventDefault()

 const formData = new FormData();

 if(!nameProduct.value || !priceProduct.value || !category.value){
    alert("لطفا همه فیلدهای ضروری را پر کنید");
    return;
}

if(Number(priceProduct.value) <= 0){
    alert("قیمت باید عددی صحیح و بزرگتر از صفر باشد");
    return;
}
 formData.append('name',nameProduct.value)
 formData.append('price',Number(priceProduct.value))
 formData.append('description',description.value)
 formData.append('categoryId ',category.value)
 formData.append('image',imageProduct.files[0])

fetchaddProduct(formData)
})

//add product from panel to products
async function fetchaddProduct(formData){

try{
   const response=await fetch(`http://localhost:3000/api/products`,{
    method: 'POST',
    body: formData,
    headers:{
       'Authorization': `Bearer ${getToken}`
    }
  })

 const data = await response.json();

  if(!data.ok){
    console.log("نمی توانیم محصول رو اضافه کنیم متاسفیم:(");
    
  }
  console.log(data);
  return data
  }
  catch(err){
    console.log("خطا در ساختن محصولات:",err);
    
  }
}


