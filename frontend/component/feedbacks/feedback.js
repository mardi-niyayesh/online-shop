 import { baseUrl } from '/frontend/apibase.js';
const $=document

const imageUrl =localStorage.getItem(`getImg`)
const getNameProduct =localStorage.getItem(`getnameproduct`)
const getProductId =localStorage.getItem(`productId`)
const getToken=localStorage.getItem("Token")

const boxImgproduct=$.querySelector(".container-box-imgproduct")
const boxNameproduct=$.querySelector(".container-box-nameproduct")
const boxwritecomment=$.querySelector(".readcomment")
const containerComment=$.querySelector(".box-comment")
const iconClose=$.querySelector(".icon-close")
const numberStar=$.querySelector(".number-star")
const inputComment=$.querySelector(".input-comment")
const boxSend=$.querySelector(".box-send")
const nameText=$.querySelector(".name-text")
const containerfeedback=$.querySelector(".container-feedback")

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

//
window.addEventListener('load', getfetchfeedback);

//hidden comment box
iconClose.addEventListener("click",()=>{
  containerComment.style.display='none'
})
 
//event click for send product feedback
boxSend.addEventListener("click", async(event)=>{
containerComment.style.display='none'
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
  const response=await fetch(`${baseUrl}/feedbacks`,{
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
        const response = await fetch(`${baseUrl}/feedbacks?filter.productId=${getProductId}`, {
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

//creat component fo feedback
function createFeedbackComponent(feedback) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-item';

    let starsHtml = '';
    for (let i = 1; i <= feedback.rate; i++) {
        starsHtml += `<img src="/frontend/images/icon-star.png" alt="star" />`;
    }

    feedbackDiv.innerHTML = `
        <div class="user-name">${feedback.user.firstname} ${feedback.user.lastname}</div>
        <div class="starcomment">
            ${starsHtml}
            <span class='span-rate'> rate: ${feedback.rate}</span>
        </div>
        <div class="text-comment">${feedback.message}</div>
        <hr>
    `;
    return feedbackDiv;
}

