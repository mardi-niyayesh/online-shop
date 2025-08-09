
// import Header from "./component-product/header/header.js";
function loadHTML(elementId, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML += data;
    })
    .catch(error => {
      console.error('Error loading ' + url + ':', error);
    });
}


loadHTML('header', './component-product/header/header.html');
loadHTML('main', './component-product/main/off/off.html');
loadHTML('main', './component-product/main/product/product.html');
loadHTML('main', './component-product/main/inestagram/insta.html');
loadHTML('main', './component-product/main/comment/comment.html');
loadHTML('footer', './component-product/footer/footer.html');

