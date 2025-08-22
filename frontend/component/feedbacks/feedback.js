
const imageUrl =localStorage.getItem(`getImg`)
const getNameProduct =localStorage.getItem(`getnameproduct`)
const getProductId =localStorage.getItem(`productId`)
const getToken=localStorage.getItem("Token")

const boxImgproduct=document.querySelector(".container-box-imgproduct")
const boxNameproduct=document.querySelector(".container-box-nameproduct")
const boxwritecomment=document.querySelector(".readcomment")
const containerComment=document.querySelector(".box-comment")
const iconClose=document.querySelector(".icon-close")
const numberStar=document.querySelector(".number-star")
const inputComment=document.querySelector(".input-comment")
const boxSend=document.querySelector(".box-send")
const nameText=document.querySelector(".name-text")
const containerfeedback=document.querySelector(".container-feedback")

// show photo of product
if(imageUrl){
boxImgproduct.src=imageUrl
}
// show Name of product
if(getNameProduct){
boxNameproduct.innerHTML=getNameProduct
}
//show comment box
boxwritecomment.addEventListener("click",(event)=>{
  event.preventDefault()
containerComment.style.display='block'


})
//hidden comment box
iconClose.addEventListener("click",()=>{
  containerComment.style.display='none'
})
 
window.addEventListener('load', getfetchfeedback);


//event click for send product feedback
boxSend.addEventListener("click", async(event)=>{
 event.preventDefault()
await fetchfeedback();
await getfetchfeedback()
})

//Send product feedback to  server
  async function fetchfeedback(){
      let rateValue = parseInt(numberStar.value);
      if (isNaN(rateValue) || rateValue < 1) rateValue = 1;
      if (rateValue > 5) rateValue = 5;
  try{
  const response=await fetch(`http://localhost:3000/api/feedbacks`,{
  method: 'POST',
  headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
      },
  body:JSON.stringify(
      {
            rate:rateValue,
            message:inputComment.value,
            productId:getProductId
      }
    )
  })
   const data = await response.json();
   console.log("فیدبک شما با موفقیت ثبت شد:)",data);
    inputComment.value = '';
    numberStar.value = '';

  }catch(err){
   console.log("فیدبک شما با موفقیت ارسال نشد متاسفیم:(",err);
   
  }

 }

//get product feedback to  server
async function getfetchfeedback(){
    try {
        const response = await fetch(`http://localhost:3000/api/feedbacks?filter.productId=${getProductId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken}`
            },
        });

        const json = await response.json();
        const feedbacks = json.data;

        if (Array.isArray(feedbacks)) {
            containerfeedback.innerHTML = '';

            feedbacks.forEach(feedback => {
                const feedbackComponent = createFeedbackComponent(feedback);
                containerfeedback.appendChild(feedbackComponent);
            });
        } 
          
     

    } catch (error) {
        console.error("خطا در دریافت فیدبک‌ها:", error);
    }
}



 //creat component star
function createStars(rateValue, containerfeedback) {
    for(let i = 1; i <= rateValue; i++) {
        const divStar = document.createElement('div');
        divStar.className = "starcomment";
           divStar.innerHTML=` <div class="box-collection-star">
                <img src="/frontend/images/icon-star.png" alt="">
            </div>`
          containerfeedback.append(divStar)
    }
}

//creat component fo feedback
function createFeedbackComponent(feedback) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-item';

    feedbackDiv.innerHTML = `
        <div class="user-name">${feedback.user.firstname} ${feedback.user.lastname}</div>
        <div class="starcomment">
            <img src="/frontend/images/icon-star.png" alt="star" />
            <span>${feedback.rate}</span>
        </div>
        <div class="text-comment">${feedback.message}</div>
    `;

    return feedbackDiv;

}
