
const $=document

const usernameElem=$.querySelector(".username")
const lastnameElem=$.querySelector(".last-name")
const phoneNumberElem=$.querySelector(".phone-number")
const buttonElem=$.querySelector(".form-sign")


buttonElem.addEventListener("click",(e)=>{
 e.preventDefault()

   fetch(`http://localhost:3000/api/auth/get-otp?phone=${encodeURIComponent(phoneNumberElem.value)}&firstname=${encodeURIComponent(usernameElem.value)}&lastname=${encodeURIComponent(lastnameElem.value)}`,{
    method:"GET",
    headers:{
        'Content-Type': 'application/json'
    }
    
})
.then(res=>res.json())
.then((data)=>{
    if(data.code){
        setTimeout(() => {
             window.location.href="http://127.0.0.1:5500/frontend/component/Login/send-code.html"
        }, 3000);
       
        alert("کد تایید:"+data.code)
    }
})
.catch(err=>console.error(err));
localStorage.setItem("phone",phoneNumberElem.value)

usernameElem.value=''
lastnameElem.value=''
phoneNumberElem.value=''

})


 


