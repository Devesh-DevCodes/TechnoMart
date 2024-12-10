let allProducts = [];

// Fetch and display products
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product_pg');
  
    fetch('http://localhost:5500/api/products') // Ensure this URL matches your backend
      .then(response => response.json())
      .then(data => {
        allProducts = data; // Store fetched products
        displayProducts(allProducts); // Display all products initially
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        productContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
      });
  });
  
function displayProducts(products) {
  const productContainer = document.getElementById('product_pg');
  if(products.length > 0) {
    let productsHTML = '';
  
    products.forEach(product => {
      productsHTML += `
        <div class="shop_item" id="item_id${product.Prod_ID}">
          <div class="img" id="img_id">
            <img src=${product.Image_URL} />
          </div>
          <div class="product_info"> 
            <p class="name">${product.Name}</p>
            <p class="details">${product.Category}</p>
          </div>
          <p class="price"><span>₹</span>${product.Price}</p>
          <button class="btn-add" onclick="add_to_cart('${product.Prod_ID}','${product.Name.replace(/"/g, '&quot;')}','${product.Price}','${product.Image_URL}')">Add to Cart</button>
        </div>
      `;
    });
  
    productContainer.innerHTML = productsHTML;
  }
  else{
    productContainer.innerHTML = '<h2 style="text-align: center; margin-top: 20px; color: #db0909; background-color: yellow;">&nbsp; &#9888; No products match your search. &nbsp;</h2>';
  }
}

// Search function for products search box
function searchProducts() {
  const query = document.getElementById('productSearchBox').value.toLowerCase().trim();
  const filteredProducts = allProducts.filter(product => 
    product.Category.toLowerCase().includes(query) || 
    product.Name.toLowerCase().includes(query)
  );
  displayProducts(filteredProducts); // Display filtered products
}

  function add_to_cart(Prod_ID, Name, Price, Image_URL) {
    fetch('http://localhost:5500/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Prod_ID,
        Name,
        Price,
        Image_URL,
      }),
    })
      .then(response => response.text())
      .then(message => {
        swal("Product Added", `${message} !!`, "success");
        // alert(message); // Notify user about the cart update
        cart_items_count();    // Update cart icon count
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
  }
 
// ---------------------cart icon element count -----------------
let basket =[];
let cart_items_count = () => {
  let cart_icon_items = document.getElementById("cart_number");
  let count = 0;

  fetch('http://localhost:5500/cart')
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
cart_items_count(); // Call the function initially


