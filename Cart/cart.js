let shoppingCart = document.getElementById('cart_content');
let top_label = document.getElementById('top_label');
let print_amount = document.getElementById('end_display')

let basket = JSON.parse(localStorage.getItem('data')) || [];

console.log(basket)

// ---------------------cart icon element count -----------------
let cart_items_count = () => {
    let cart_icon_items = document.getElementById('cart_number')
    let count = 0;

    for (let x of basket) {
        count += x.item
    }
    cart_icon_items.innerHTML = count;
}


// let cartItems_display=()=>{
// if(basket.length !== 0){
//     shoppingCart.innerHTML=basket.map((x)=>{
//     let {id,name,price,img}=x;
//     return `${id}`
//    })

//     let ele=""
//    for (let i = 0; i < basket.length; i++) {
//     let {id,name,details,price,img}= basket[i];
//     ele +=` 
//     <div class="shop_item" id="item_id${id}">
//             <div class="img" id="img_id">
//                 <img src=${img} />
//             </div>
//             <div class="product_info">
//                 <h2 class="name">${name}</h2>
//                 <p class="details">${details}</p>
//                 <p class="price"><span>₹</span>${price}</p>
//                 <button class="btn-add" onclick="add_to_cart('${id}','${name}','${price}','${img}')">Add to Cart</button>
//             </div>
//     </div>`
//      shoppingCart.innerHTML= ele 
//    }
// }
// 



// --------------------- Display Cart-items -----------------
let display_cartItems = () => {

    if (basket.length !== 0) {
        top_label.style.display="none";
        return shoppingCart.innerHTML = basket.map((element) => {
            let { id, name, item, price, img } = element;
            let search = basket.find((x) => x.id == id) || [];
            return `
                <div class="cart_item" id="item_id${id}">
                    <div class="img" id="img_id">
                        <img src=${img} />
                    </div>
                    <div class="product_info">
                        <h2 class="name">${name}</h2>
                        <div class="btn-inc-dec">
                            <span class="btn-dec" id="btn-dec" onclick="dec_qty(${id})" >
                                <i class="bi bi-dash-lg"></i>
                            </span>
                            <span id=${id} class="item-qty"  >${search.item == undefined ? 0 : search.item}</span>
                            <span class="btn-inc" id="btn-inc" onclick="inc_qty(${id})" >
                                <i class="bi bi-plus-lg"></i>
                            </span>
                        </div>
                        <p class="price"><span>₹</span>${price} / Quantity</p>

                        <button class="btn-remove" id="btn-remove" onclick="remove_from_cart(${id})">Remove</button> 
                    </div>
                </div>
            `
        }).join(" <br>");
    }
    else{
        shoppingCart.innerHTML=``
        print_amount.innerHTML=``
        top_label.style.display="block";
        return top_label.innerHTML= `
            <h3>Cart is Empty !!</h3>
            <a href="../Products/product_pg.html"><button class="btn-home">Go to Home Page</button></a>
        `
        
    }
}

cart_items_count()
display_cartItems()



// ------------------ Decrease item -------------------
let dec_qty = (id) => {
    let selectedItem_id = id;
    let search = basket.find((ele) => ele.id == selectedItem_id);
    if (search.item == 0) {
        return 0;
    }
    else {
        search.item--;
    }

    // console.log(basket)
    // console.log(search.item)
    update(id);
    basket = basket.filter((x) => x.item !== 0);

    // ---------to remove cart products if its qnty=0
    display_cartItems();

    localStorage.setItem("data", JSON.stringify(basket));
    return search.item;
}


// ------------------ Increase item -------------------
let inc_qty = (id) => {
    let selectedItem_id = id;
    let search = basket.find((ele) => ele.id == selectedItem_id);
    search.item++;
    // console.log(basket)
    // console.log(search.item)
    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
    return search.item;

}
// ------------------ Update Quantity-----------------
let update = (id) => {
    let search = basket.find((ele) => ele.id == id);
    let qty = search.item;
    // console.log(id)
    // console.log(search.item)
    document.getElementById(id).innerHTML = `${qty}`
    cart_items_count()

    total_amount()
}



// -------------- Remove Cart Elements ----------------

let remove_from_cart = (id) => {
    let selectedItem_id=id;
    basket = basket.filter((x) => x.id != selectedItem_id);
    localStorage.setItem('data', JSON.stringify(basket));
    display_cartItems()
    cart_items_count()

    total_amount()
}



// ----------- clear cart ---------------
let clear_cart=()=>{
    basket=[];
    localStorage.setItem('data', JSON.stringify(basket));
    display_cartItems()
    cart_items_count()
    total_amount()
}

// ----------  Total Amount ----------

let total_amount = () => {
    // let n=basket.length
    let total_price = 0;
    for (ele of basket) {
        total_price += Number(ele.price * ele.item)
        // total_price += (ele.price * ele.item)
        // console.log(ele.price)
    }

    // cart buttons  -- clear cart and place order

    print_amount.innerHTML = ` 
        
        <h2 class="amount" id="amount"> Total Price : ₹ ${total_price} </h2>
        <button class="btn-crt-page btn-clear-cart" id="btn-clear-cart" onclick="clear_cart()">Clear Cart</button>

        <a href="../Checkout/checkout.html" target="_blank">
            <button type="button" class="btn-crt-page checkout" id="checkout" onclick="checkout_Page()" >Place Order</button> 
        </a> 
        
    `
    console.log("Total Price : ", total_price)
    display_cartItems();
}
total_amount()


// ------ Go to Checkout Page -----------

let checkout_Page=()=>{
    
}

// let total_price=()=>{
//     if(basket.length !=0){
//         let total_amt=0;
//         let each_amount = basket.map((x)=>{
//             let {id,item,price}=x;
//             // console.log(item * price);       //return array
//             total_amt += item * price
//             return (item * price);    
//         })
//         console.log(each_amount);       //return array
//         console.log(total_amt);
//     }
//     else return;
// }
// total_price()


    // remove_from_cart()
    // document.onclick=alert('h1')
    // document.onchange=alert('h1')
    // window.onclick=alert('h1')
    // window.onchange=alert('h1')
    // window.onload=alert('h1')