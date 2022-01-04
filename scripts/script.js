'use strict'
//////////// Selections //////////
//Nav Selections
const navBtn = document.querySelector('#navBtn');
const menu = document.querySelector('.navWrapper-Mobile');
const Nav =  document.querySelector('.navContainer-Mobile');

//Shop Selections
const cartBtn = document.querySelectorAll('[data-set="Add"]');
const cartModal = document.querySelector('.cartModal')
const productCont = document.querySelector('.productCont');

//Customers cart modal selections
const openCart = document.querySelector('.customerCart-Button');
const shoppingCart = document.querySelector('.shoppingCart');
const closeCartBtn = document.querySelector('.closeCart');
const checkOutBtn = document.querySelector('.checkoutBtn');
const Overlay = document.querySelector('.scOverlay');
const cartTitle = document.querySelector('.cartTitle');
const emptyCart__Dom = document.querySelector('.emptyCart');


/////////Navigation///////////

const navToggle = function() {
    navBtn.classList.toggle('open');
    menu.classList.toggle('open');
    Nav.classList.toggle('open');
};

//nav Slider
navBtn.addEventListener('click', () => navToggle());

//Checkout btn opens modal & closes navigation
checkOutBtn.addEventListener('click', () => {
    openCartBtn();
    navToggle();
});

//////////// //Customers cart modal //////////
const openCartBtn = function(){
    shoppingCart.classList.add('Show');
    Overlay.classList.add('Show');
    cartTitle.classList.add('Show');
    emptyCart();
};

const closeCart = function(){
    shoppingCart.classList.remove('Show');
    Overlay.classList.remove('Show');
    cartTitle.classList.remove('Show');
};

openCart.addEventListener('click', ()=> openCartBtn());
closeCartBtn.addEventListener('click', ()=> closeCart());


/////////Shop functions & features //////////////
let cart = JSON.parse(localStorage.getItem('cart')) || [];
localStorage.setItem('cart', JSON.stringify(cart));

if(cart.length > 0){
     cart.forEach(item => {
        const product = item;

        ItemDom(product);
        cartTotal();

        cartBtn.forEach(cartBtn => {
            const productAction = cartBtn.parentNode;

            if (productAction.querySelector('.p__name').innerText === product.name){
                cartActions(cartBtn, product);
                cartBtn.innerText = 'In Cart';
                cartBtn.disabled = true;
            };
        });
    });
}

cartBtn.forEach((a) => {
    a.addEventListener('click', () =>{
        const shop__Cont =  a.parentNode;
        //product object
        const product = {
            image: shop__Cont.querySelector('.pImage').getAttribute('src'),
            name:shop__Cont.querySelector('.p__name').innerText,
            price:shop__Cont.querySelector('.p__Price').innerText,
            quantity: 1,
        };

        //duplication Guard
       const cartActive =  (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);

       if(!cartActive){
        ItemDom(product);
        cart.push(product);
        saveCart()
        cartActions(cartBtn, product);
       };
    });
});

//////// Functions /////////

function ItemDom(product){
    shoppingCart.insertAdjacentHTML('beforeend', `
    <div class="cartItem_active">
    <section class="cartItem_Info">
        <div class="cartItem_header">
            <h3 class="cartItem__name cartItem_head">${product.name}</h3>
            <h3 class="cartItem__price cartItem_head">${product.price}</h3>
        </div>
        <div class="cartItem_counter">
            <div class="countBtn increment" data-set="INC_VAL" title="Add">&plus;</div>
            <h3 class="cartItem_quantity">${product.quantity}</h3>
            <div class="countBtn decrement" data-set="DEC_VAL" title="Remove">&minus;</div>
            <div class="countBtn itemRemove" data-set="DELETE_ITEM" title="Delete item">&times;</div>
        </div>
    </section>  
    </div>
    `);
    addFooter();
};


//Cart Actions
function cartActions(cartBtn, product){
    cartBtn.innerText = 'In Cart';
    cartBtn.disabled = true;

    const cartProduct = shoppingCart.querySelectorAll('.cartItem_active');
        cartProduct.forEach(item => {
            if(item.querySelector('.cartItem__name').innerText === product.name){
                item.querySelector('[data-set="INC_VAL"]').addEventListener('click', () => increment(product, item));
                item.querySelector('[data-set="DEC_VAL"]').addEventListener('click', () =>decrement(product, item))
                item.querySelector('[data-set="DELETE_ITEM"]').addEventListener('click', () => del__Item(product, item))
        };
    });    
};

function increment(product, item){
    cart.forEach(cartItem => {
        if (cartItem.name === product.name) {
            item.querySelector('.cartItem_quantity').innerText = ++cartItem.quantity;
            saveCart()
            cartFilled()
        };
    });
};

function decrement(product, item){
    cart.forEach(cartItem => {
        if (cartItem.name === product.name) {
            if(cartItem.quantity > 1){
            item.querySelector('.cartItem_quantity').innerText = --cartItem.quantity;
            saveCart()
        }
            else {
                //item.classList.add('productRemove');
                del__Item(product, item)
                emptyCart();
            }
        };
    });
};

function del__Item(product, item){
            //item.classList.add('productRemove');
            setTimeout(()=> item.remove(), 300)
            cart = cart.filter(cartItem => cartItem.name !== product.name);
            saveCart();
            emptyCart();
            cartBtn.innerText = 'Add To Cart';
            cartBtn.disabled = false;
};

function addFooter(){
    if(document.querySelector('.cart__footer') === null){
        shoppingCart.insertAdjacentHTML('beforeend', `
        <div class="cart__footer">
        <div class="btn clear" data-action="clearCart">Clear Cart</div>
        <div class="btn clear" data-action="checkOut">Pay</div>
        </div>
    `);

    document.querySelector('[data-action="clearCart"]').addEventListener('click', () => clearCart())
    document.querySelector('[data-action="checkOut"]').addEventListener('click', () => checkOut())
    };
};

function clearCart(){
    shoppingCart.querySelectorAll('.cartItem_active').forEach(item => {
        setTimeout(()=> item.remove(), 300)
    });

    cart =[];
    localStorage.removeItem('cart');
    document.querySelector('.cart__footer').remove();
    closeCart();
    cartBtn.forEach(cartBtn => {
        cartBtn.innerText = 'Add To Cart';
        cartBtn.disabled = false;
      });
      emptyCart();
};

function checkOut(){
    let payPalForm = `
        <form id="paypalForm"action="https://www.paypal.com/cgi-bin/webscr" method="post">
    <input type="hidden" name="cmd" value="_cart">
    <input type="hidden" name="upload" value="1">
    <input type="hidden" name="business" value="im-roberto@roberto-bayona.com">
    `;

    cart.forEach((item, index) => {
        index++;
        payPalForm += `
         <input type="hidden" name="item_name_${index}" value="${item.name}">
        <input type="hidden" name="amount_${index}" value="${item.price}">
        <input type="hidden" name="quantity_${index}" value="${item.quantity}">`
    });

    
    payPalForm += `
    <input type="submit" value="PayPal">
    </form>
    <div class="overlay></div>
    `;

    document.querySelector('body').insertAdjacentHTML('beforeend', payPalForm);
    document.getElementById('paypalForm').submit();
};


function cartTotal(){
    let total = 0;
    cart.forEach(item => total +=  item.quantity * item.price);
    document.querySelector('[data-action="checkOut"]').innerText = `Check-out Total: ${parseFloat(total).toFixed(2)}`;
};

function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
    cartTotal();
};

function emptyCart() {
    if(cart.length === 0){
        emptyCart__Dom.classList.add('Show');
    }
    else{
        emptyCart__Dom.classList.remove('Show');
    }

}

