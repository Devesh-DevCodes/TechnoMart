// ---------------------cart icon element count -----------------


let basket =  [];
let cart_items_count = () => {
    let cart_icon_items = document.getElementById('cart_number')
    let count = Number(0);
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
}


cart_items_count();





// validate 
function validate(){
    // debugger;
    let name=document.getElementById('name').value;
    console.log(name);
    console.log("name")
    // alert(name);
    if(name==""){
        alert("enter details");
    }
}


