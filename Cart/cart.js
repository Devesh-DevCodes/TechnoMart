let shoppingCart = document.getElementById("shopping_cart");
let cartHeading = document.getElementById("cart_heading");
let cartContent = document.getElementById("cart_content");
let top_label = document.getElementById("top_label");
let print_amount = document.getElementById("end_display");

let basket = [];

// ---------------------cart icon element count -----------------
let cart_items_count = () => {
  let cart_icon_items = document.getElementById("cart_number");
  let count = 0;

  for (let x of basket) {
    count +=  Number(x.Quantity);
  }
  cart_icon_items.innerHTML = count;
  console.log( 'total cart count',count);
  
};

// Fetch cart items from backend
const fetchCart = async () => {
  try {
    const response = await fetch('http://localhost:5500/cart/');
    basket = await response.json();
    console.log('Fetched Basket:', basket); // Log fetched data

    // Call dependent functions here
      cart_items_count();
      display_cartItems();
      total_amount();
      display_cartItems();

  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};


fetchCart();
console.log(basket);



// --------------------- Display Cart-items -----------------
let display_cartItems = () => {
  console.log('Display called with basket:', basket);
  if (basket.length !== 0 ) {
    cartHeading.innerHTML=`
        <div class="fix_width">Produt</div> 
        <div class="fix_width">Product Name</div> 
        <div class="fix_width">Price</div>
        <div class="fix_width">Quantity</div>
        <div class="fix_width">Amount</div>
        <div class="fix_width">Remove</div>
    `
    // console.log(basket.length);
    
    top_label.style.display = "none";
    
    
      cartContent.innerHTML = basket
      .map((element) => {
        
        let { Prod_ID = 0, Name = 'Unknown', Quantity = 1, Price = 0, Image_URL = '' } = element;
        let search = basket.find((x) => x.Prod_ID == Prod_ID) || [];
        
        return `
          <div class="cart_item" id="item_id${Prod_ID}">
            <div class="img fix_width " id="img_id">
              <img src="${Image_URL}" title="${Name}" />
            </div>
            <h3 class="name fix_width" title="${Name}">${Name.length > 25 ? Name.slice(0, 25) + " ...." : Name}</h3>
            <p class="price fix_width"><span>₹</span>${Price} / Quantity</p>
            <div class="btn-inc-dec fix_width">
              <span class="btn-dec" id="btn-dec" onclick="dec_qty(${Prod_ID})">
                <i class="bi bi-dash-lg"></i>
              </span>
              <span id="${Prod_ID}" class="item-qty">${search.Quantity == undefined ? 0 : search.Quantity}</span>
              <span class="btn-inc" id="btn-inc" onclick="inc_qty(${Prod_ID})">
                <i class="bi bi-plus-lg"></i>
              </span>
            </div>
            <p class="t_amount fix_width"><span>₹</span>${Price * (search.Quantity == undefined ? 0 : search.Quantity)}</p>
            <button class="btn-remove fix_width" id="btn-remove" onclick="remove_from_cart(${Prod_ID})">Remove</button>
          </div>
        `;
      })
      .join(" <br>");
      // console.log("Rendered HTML:", cartContent.innerHTML); // Add this
  } 
  else if (basket.length === 0 ) {
    console.log("Basket is empty");
    shoppingCart.innerHTML = ``;
    top_label.style.display = "block";
    top_label.style.zIndex = 1;
    shoppingCart.style.background = "transparent";

    // cartContent.innerHTML = ``;
    // print_amount.innerHTML = ``;
    
    return (top_label.innerHTML = `
      <h3>Cart is Empty !!</h3>
      <a href="../index.html"><button class="btn-home">Go to Home Page</button></a>
    `);
  }
};


// cart_items_count();
// display_cartItems();

// ------------------ Decrease item -------------------
let dec_qty = async (Prod_ID) => {
  let selectedItem_id = Prod_ID;
  let search = basket.find((ele) => ele.Prod_ID == selectedItem_id);
  if (search.Quantity == 0) {
    return;
  } else {
    search.Quantity--;
  }

  await update(Prod_ID);
  basket = basket.filter((x) => x.Quantity !== 0);
  display_cartItems();
  cart_items_count();
  total_amount();
};

// ------------------ Increase item -------------------
let inc_qty = async (Prod_ID) => {
  let selectedItem_id = Prod_ID;
  let search = basket.find((ele) => ele.Prod_ID == selectedItem_id);
  search.Quantity++;
  
  await update(Prod_ID);
  display_cartItems();
  cart_items_count();
  total_amount();
};

// ------------------ Update Quantity -------------------
let update = async (Prod_ID) => {
  let search = basket.find((ele) => ele.Prod_ID == Prod_ID);
  let qty = search.Quantity;
  
  // Send updated cart item to backend
  try {
    await fetch('http://localhost:5500/update-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Prod_ID: Prod_ID,
        quantity: qty
      })
    });
    document.getElementById(Prod_ID).innerHTML = `${qty}`;
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
  cart_items_count();
  total_amount();
};

// -------------- Remove Cart Elements ----------------
let remove_from_cart = async (Prod_ID) => {
  basket = basket.filter((x) => x.Prod_ID != Prod_ID);
  localStorage.setItem("data", JSON.stringify(basket));
  console.log(`${Prod_ID} removed`);

  try {
    await fetch('http://localhost:5500/remove-from-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Prod_ID })
    });
  } catch (error) {
    console.error('Error removing item:', error);
  }

  display_cartItems();
  cart_items_count();
  total_amount();
};

// ----------- clear cart ---------------
let clear_cart = async () => {
  basket = [];
  localStorage.setItem("data", JSON.stringify(basket));
  try {
    await fetch('http://localhost:5500/clear-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clear: true })
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
  }

  display_cartItems();
  cart_items_count();
  total_amount();
};

// ----------  Total Amount ----------
let total_amount = () => {
  let total_price = 0;
  for (ele of basket) {

    total_price += Number(ele.Price) * Number(ele.Quantity);
  }

  print_amount.innerHTML = `
    <h2 class="amount" id="amount"> Total Price : ₹ ${total_price} </h2>
    <button class="btn-crt-page btn-clear-cart" id="btn-clear-cart" onclick="clear_cart()">Clear Cart</button>
    <a href="../Checkout/checkout.html" target="_blank">
      <button type="button" class="btn-crt-page checkout" id="checkout" onclick="checkout_Page()">Place Order</button> 
    </a>
  `;
  console.log("Total Price : ", total_price);
  display_cartItems();
};

// total_amount();


// // ------ Go to Checkout Page -----------

// let checkout_Page = () => {};

// -------- export fetchCart function -----------
// export { fetchCart}; // Export the fetchCart function