const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const menuLinks = document.querySelectorAll(".nav-menu a[href^=\"#\"]")

const myCart = [];

const makeupURL = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'
const productsContainer =  document.querySelector('.products-container');
const totalAmount = document.getElementById('totalAmount');
const cartList = document.getElementById('cart-list');
const searchInput = document.getElementById('inputSearch');
const btnSearch = document.getElementById('searchProducts');
const btnClean = document.getElementById('btn-clean');

const getMakeUp = async () => {

    try {
        const response = await fetch (makeupURL, {
            method:'GET'
        });
        const json = await response.json();
        const allProducts = json;        
        renderAllItems(allProducts) 
        searchProduct(allProducts)      
        console.log(allProducts);
                
    } catch (error) {
        alert(error);
    }
   
};

const searchProduct = (item) => {


    btnSearch.addEventListener('click', ()=>{

        const valueInput = searchInput.value
        
        const typeProduct = item.filter( type => type.product_type === valueInput)       

            typeProduct.forEach( searchItem => {
                const p2 = document.createElement('p');
                const divTitle2  = document.createElement('div');
                const img2 =  document.createElement('img');
                const precio2 =  document.createElement('p');
                const btn2 = document.createElement('button');     
                
                const id = searchItem.id
                const productType = searchItem.product_type
        
                img2.alt = searchItem.name;
                img2.src = `${searchItem.image_link}`;
                divTitle2.appendChild(img2);
                p2.innerText = searchItem.name;
                precio2.innerText = `Precio: ${ searchItem.price}$`;
                btn2.innerText = 'Comprar';
        
                divTitle2.appendChild(p2);
                divTitle2.appendChild(precio2);
                divTitle2.appendChild(btn2);
        
                productsContainer.appendChild(divTitle2);
                
                
        
                btn2.addEventListener('click', () => 
                {  
                    const product = myCart.find(product => product.id === id);
                    
                                
                    if(product){
                        const index = myCart.indexOf(product);
                        product.quantity ++;
                        myCart[index] = product;
                    }else{
        
                        const productToCart = {
                            img: img2.src,
                            name: searchItem.name,
                            price: Number(searchItem.price),
                            id: searchItem.id,
                            quantity: 1,
                            productType: searchItem.product_type
                        }
                        myCart.push(productToCart);
                    }
                               
                      /* const productId = myCart.map( ({id}) => id);    
                      console.log(productId); */
                    renderCartProducts();
                    showTotalAmount();
                    console.log(myCart) ;
                });       
           
            
        });
        
        
        
    });
    
};



const renderAllItems = (item) => {
    item.forEach( item => {            
        const p = document.createElement('p');
        const divTitle  = document.createElement('div');
        const img =  document.createElement('img');
        const precio =  document.createElement('p');
        const btn = document.createElement('button');     
        
        const id = item.id
        const productType = item.product_type

        img.alt = item.name;
        img.src = `${item.image_link}`;
        divTitle.appendChild(img);
        p.innerText = item.name;
        precio.innerText = `Precio: ${ item.price}$`;
        btn.innerText = 'Comprar';

        divTitle.appendChild(p);
        divTitle.appendChild(precio);
        divTitle.appendChild(btn);
      
        productsContainer.appendChild(divTitle);     

        btn.addEventListener('click', () => 
        {  
            const product = myCart.find(product => product.id === id);
            
                        
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
                    quantity: 1,
                    productType: item.product_type
                }
                myCart.push(productToCart);
            }
                       
              /* const productId = myCart.map( ({id}) => id);    
              console.log(productId); */
            renderCartProducts();
            showTotalAmount();
            console.log(myCart) ;
        });

        btnSearch.addEventListener('click',()=> {
            divTitle.style.display= 'none'    
            
        })
      
        });                   
}


const renderCartProducts = () => {
    cartList.innerHTML = null;
    myCart.forEach(product => {

        const container =  document.createElement('div');
        container.className = 'cart-item';
        container.style.display= 'flex';
        container.style.flexDirection= 'column';
        container.style.width= '60%';

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
searchProduct();