

const sidbar=document.querySelector(".side-bar ul")
const showmenue=document.querySelector(".showmenue")

function hidSidbar(){
          sidbar.style.display="none"
}

 showmenue.addEventListener("click",()=>{
    sidbar.style.display="flex"
    console.log("niyayesj");
    
 })
