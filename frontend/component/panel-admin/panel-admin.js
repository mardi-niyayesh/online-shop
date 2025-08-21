const $=document
const containerli=$.querySelectorAll(".container-li")
const iconSidbar=$.querySelectorAll(".icon-sidbar")
const admin=$.querySelectorAll(".admin")

//Chang background color on mouseover

containerli.forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.backgroundColor = '#f0f0f0'; 
  });

  element.addEventListener('mouseleave', () => {
    element.style.backgroundColor = ''; 
  });
});
