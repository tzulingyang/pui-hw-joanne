const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};


class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.totalPrice = 0;
    };
}

const shopping_cart = [];

const New_items_1 = new Roll('Original', 'sugar-milk', 1, 2.49)
const New_items_2 = new Roll('Walnut', 'vanilla-milk', 12, 3.49)
const New_items_3 = new Roll('Raisin', 'sugar-milk', 3, 2.99)
const New_items_4 = new Roll('Apple', 'keep-original', 3, 3.49)
shopping_cart.push(New_items_1, New_items_2, New_items_3, New_items_4);


const glazing_option = {
    'keep-original': 'Keep Original',
    'sugar-milk': 'Sugar Milk',
    'vanilla-milk': 'Vanilla Milk',
    'double-chocolate': 'Double Chocolate'
};

const glazing_price = {
    'keep-original': 0,
    'sugar-milk': 0,
    'vanilla-milk': 0.5,
    'double-chocolate': 1.5
};

const packsize_price = {
    '1': 1,
    '3': 3,
    '6': 5,
    '12': 10
};

function CalculatePrice(glazing, size, baseprice) {
    let glazing_p = glazing_price[glazing];
    let pack_p = packsize_price[size];
    let total = ((baseprice + glazing_p) * pack_p).toFixed(2);
    return total;
}

for (let i = 0; i < shopping_cart.length; i++){
    const total = CalculatePrice(shopping_cart[i]['glazing'], shopping_cart[i]['size'], shopping_cart[i]['basePrice']);
    shopping_cart[i]['totalPrice'] = total;
}


/* --------------------------------------------------------------------- */

let total_cart_price = 0;

function createCart(Roll){
    // make a clone of the cart template
    const template = document.querySelector('#cart-template');
    const clone = template.content.cloneNode(true);
    Roll.element = clone.querySelector('#cart-product');


    const btnremove = Roll.element.querySelector('.remove');
    btnremove.addEventListener('click', () => {
        deleteCart(Roll);
      });

    document.querySelector('.cart-product-gallery').prepend(Roll.element);
    // populate the cart clone with the actual notecard content
    updateElement(Roll);
    
}


function updateElement(Roll) {

    // get the HTML elements that need updating
    const itemImgElement = Roll.element.querySelector('.cart-img');
    const itemNameElement = Roll.element.querySelector('.cart-item-name');
    const itemGlazingElement = Roll.element.querySelector('.cart-item-glazing');
    const itemPriceElement = Roll.element.querySelector('.cart-item-price');
    const itemPackElement = Roll.element.querySelector('.cart-item-pack');

    // copy our notecard content over to the corresponding HTML elements
    itemImgElement.src = '../assets/products/' + rolls[Roll['type']]['imageFile'];
    itemNameElement.innerText = Roll['type'] + ' Cinnamon Roll';
    itemGlazingElement.innerText = 'Glazing: ' + glazing_option[Roll['glazing']];
    itemPackElement.innerText = 'Pack size: ' + Roll['size'];
    itemPriceElement.innerText = '$ ' + Roll['totalPrice'];

    total_cart_price = total_cart_price + parseFloat(Roll['totalPrice']);

    const totalPrice = document.querySelector('.total-price');
    totalPrice.innerText = '$ ' + total_cart_price.toFixed(2);
}


function deleteCart(Roll){
    Roll.element.remove();
    total_cart_price = total_cart_price - parseFloat(Roll['totalPrice']);
    shopping_cart.splice(shopping_cart.indexOf(Roll), 1);
    
    const totalPrice = document.querySelector('.total-price');
    totalPrice.innerText = '$ ' + total_cart_price.toFixed(2);
}

for (let i=shopping_cart.length-1; i >= 0; i --){
    createCart(shopping_cart[i]);
}

