let directoriesData=[
    {   "id":"nav_home",   
        "page":"home",
        "logo":"./Images/D-IMG-.jpg",
        "home":"./index.html",
        "products":"./Products/product_pg.html",
        "about":"#h",
        "contact":"#",
        "cart":"./Cart/cart.html",
        "login":"#"

    },
    {   "id":"nav_products",
        "page":"products",
        "logo":"../Images/D-IMG-.jpg",
        "home":"../index.html",
        "products":"./product_pg.html",
        "about":"#p",
        "contact":"#",
        "cart":"../Cart/cart.html",
        "login":"#"

    },
    {   "id":"nav_about",
        "page":"about",
        "logo":"./Images/D-IMG-.jpg",
        "home":"../index.html",
        "products":"./Products/product_pg.html",
        "about":"#",
        "contact":"#",
        "cart":"./Cart/cart.html",
        "login":"#"

    },
    {   "id":"nav_contact",
        "page":"contact",
        "logo":"./Images/D-IMG-.jpg",
        "home":"./index.html",
        "products":"./Products/product_pg.html",
        "about":"#c",
        "contact":"#",
        "cart":"./Cart/cart.html",
        "login":"#"

    },
    {   "id":"nav_cart",
        "page":"cart",
        "logo":"../Images/D-IMG-.jpg",
        "home":"../index.html",
        "products":"../Products/product_pg.html",
        "about":"#cart",
        "contact":"../contactcontact.html",
        "cart":"./cart.html",
        "login":"#"

    },
    {   "id":"nav_login",
        "page":"login",
        "logo":"./Images/D-IMG-.jpg",
        "home":"./index.html",
        "products":"./Products/product_pg.html",
        "about":"#login",
        "contact":"#",
        "cart":"../Cart/cart.html",
        "login":"#"

    }
]
let nav=document.getElementById('nav_product');
console.log(directoriesData)
let generate_nav=()=>{
    directoriesData.map((x)=>{
        // let {page,logo,home,products,about,contact,cart,login}=x;
        let {page,logo,home,products,about,contact,cart}=x;
        if(page=="products"){
            
            console.log(x)
            return nav.innerHTML=`
            <img class="logo" src=${logo} alt="" />
            
            <ul class="content">
              <li class="input">
                <i class="fa fa-search" aria-hidden="true"></i>
                <input class="search" type="text" placeholder="Search" />
              </li>
              <a href=${home}><li class="">Home</li></a>
              <a href=${products}><li class="">Products</li></a>
              <a href=${about}><li class="">About</li></a>
              <a href=${contact}><li class="">Contact</li></a>
            </ul>
            <a href="${cart}" class="btn_cart cart btn-cart" id="cart">
              <i class="fa-solid fa-cart-shopping"></i>
              <span id="cart_number"></span>
            </a>
            <button class="btn login_btn " onclick="login()">Login</button>
            `
        }
    })
}
generate_nav();
