 import { baseUrl } from '/frontend/apibase.js';
const $=document

const sendCodeBtn=$.querySelector(".form-sign")
const inpGetCode=$.querySelector(".username")
const getLocalPhone=localStorage.getItem("phone")

sendCodeBtn.addEventListener("click",(e)=>{
    e.preventDefault()
     fetch(`http://localhost:3000/api/auth/verify-token`,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(
        {
            code:inpGetCode.value,
            phone:getLocalPhone

        }
    )
    
     })
    .then(res=>res.json())
    
    .then((data)=>{
        if(data.accessToken){
            localStorage.setItem("Token",data.accessToken)
            console.log("توکن یافت شد");
        }else{
           console.log("توکن یافت نشد");
        }
        console.log(data)
        
    })
    .catch(err=>console.error("کد وارد شده صحیح نمیباشد:"+err))

    localStorage.removeItem("phone")
    inpGetCode.value=""
})


