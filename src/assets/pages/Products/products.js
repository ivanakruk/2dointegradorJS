const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const menuLinks = document.querySelectorAll(".nav-menu a[href^=\"#\"]")

const myCart = [];

const makeupURL = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'
const productsContainer =  document.querySelector('.products-container');
const totalAmount = document.getElementById('totalAmount');
const cartList = document.getElementById('cart-list');
const searchInput = document.getElementById('inputSearch');
const btnSearch = document.getElementById('searchProducts')

const getMakeUp = async () => {

    try {
        const response = await fetch (makeupURL, {
            method:'GET'
        });
        const json = await response.json();
        renderAllItems(json)       
        console.log(json);
    } catch (error) {
        alert(error);
    }
   
};

const renderAllItems = (item) => {
    item.forEach( item => {            
        const p = document.createElement('p');
        const divTitle  = document.createElement('div');
        const img =  document.createElement('img');
        const precio =  document.createElement('p');
        const btn = document.createElement('button');        

        img.alt = item.name;
        img.src = `${item.image_link}`;
        divTitle.appendChild(img);
        p.innerText = item.name;
        precio.innerText = `Precio: ${ item.price}$`;
        btn.innerText = 'Comprar';

        divTitle.appendChild(p);
        divTitle.appendChild(precio);
        divTitle.appendChild(btn);



        btn.addEventListener('click', () => 
        {  
            const product = myCart.find(product => product.id === id);
            console.log(product)
                        
            if(product){
                const index = myCart.indexOf(product);
                product.quantity ++;
                myCart[index] = product;
            }else{

                const productToCart = {
                    img: img.src,
                    name: item.name,
                    price: Number(item.price),
                    id: item.id,
                    quantity: 1
                }
                myCart.push(productToCart);
            }
            
            

            
               

           
              const productId = myCart.map( ({id}) => id);
            
              console.log(productId);
            renderCartProducts();
            showTotalAmount();
            console.log(myCart) ;
        });

        productsContainer.appendChild(divTitle); 
                  
    });
}






const renderCartProducts = () => {
    cartList.innerHTML = null;
    myCart.forEach(product => {

        const container =  document.createElement('div');
        container.className = 'cart-item';
        container.style.display= 'flex';
        container.style.flexDirection= 'column'    ;

        const cartItemContent =  document.createElement('div');
        cartItemContent.className= 'cart-item-content';
        cartItemContent.style.width= '100%';
        cartItemContent.style.display= 'flex';
        cartItemContent.style.flexWrap=' wrap'; 
        /* cartItemContent.style.flexDirection= 'row'; */

        const itemImg =  document.createElement('div');
        itemImg.className = 'item-img';
        itemImg.style.margin = '10px';
        itemImg.style.width= '10%';

        const img =  document.createElement('img');
        img.src = product.img;
        img.alt = product.name;
        img.style.width = '50px';

        itemImg.appendChild(img);
        
        cartItemContent.appendChild(itemImg);

        const itemName = document.createElement('h4');
        itemName.innerText = ` - ${product.name}`;
        itemName.style.width= '100%';
        
        cartItemContent.appendChild(itemName);

        const itemQuantity = document.createElement('b');
        itemQuantity.innerText = `X ${product.quantity}`;

        cartItemContent.appendChild(itemQuantity)

        const itemPrice = document.createElement('span');
        itemPrice.innerText = `$ ${product.price}`;

        container.appendChild(cartItemContent);

        container.appendChild(itemPrice);

        cartList.appendChild(container);

    });
}


const showTotalAmount = () => {

    let total = 0;
    myCart.forEach( cart => {
        total += (cart.price * cart.quantity);
    });
    totalAmount.innerText = `$ ${total}` ;
}


menuLinks.forEach(menuLinks => {
    menuLinks.addEventListener("click", function(){
        navMenu.classList.remove("nav-menu_visible");
    })
})

navToggle.addEventListener("click", ()=> {
    navMenu.classList.toggle("nav-menu_visible")

    if(navMenu.classList.contains("nav-menu_visible")){
        navToggle.setAttribute("aria-label","Cerrar menú");
        }
    else{
            navToggle.setAttribute("aria-label","Abrir menú");
        }
     

});

getMakeUp();