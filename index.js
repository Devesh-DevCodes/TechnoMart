// API_BASE_URL
const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5500" 
    : "https://technomart.onrender.com";


// ---------------------cart icon element count -----------------
let basket =[];
let cart_items_count = () => {
  let cart_icon_items = document.getElementById("cart_number");
  let count = 0;

  fetch(`${API_BASE_URL}/cart`)
  .then(response => response.json())
  .then(data => {
    basket = data;
    // console.log( 'cart data',data);
    // console.log( 'cart basket',basket);
    for(let x of basket){
      count += Number(x.Quantity);
    }
    cart_icon_items.innerHTML = count;
    console.log( 'total cart count',count);
  })
  .catch(error => {
    console.error('Error fetching cart:', error);
  });
  
};
cart_items_count();

