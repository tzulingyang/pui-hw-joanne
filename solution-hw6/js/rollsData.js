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

/* --------------------------------------------------------------------- */

/* First get the query string from the URL. 
    Then use the query string to create a URLSearchParams object. 
    Finally access the parameter I want using the 'get' method.
*/
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');


// Update the header
const headerElement = document.querySelector('#detail-header-title');
headerElement.innerText = rollType + ' Cinnamon Roll';

// Update the image
const itemImage = document.querySelector('#item-img');
itemImage.src = '../assets/products/' + rolls[rollType]['imageFile'];

// Update the base price
const baseprice = document.querySelector('#cart-price');
baseprice.innerText = '$ ' + rolls[rollType]['basePrice'];

/* --------------------------------------------------------------------- */

let totalPrice = rolls[rollType]['basePrice'];

let total_glazing = 0;
let glazing_choice = 'keep-original';
let total_pack = 1;
let pack = '1';
let total = 0;

// create an object for each glazing option and its price adaption
const glazing_price = {
    'keep-original': 0,
    'sugar-milk': 0,
    'vanilla-milk': 0.5,
    'double-chocolate': 1.5
};

// function happens when something change for the dropdown list. Default: Keep original ($ 0.00)
function glazingChange(element) {
    const glazing_change = element.value;
    total_glazing = glazing_price[glazing_change];
    total = ((totalPrice + total_glazing) * total_pack).toFixed(2);
    document.getElementById('cart-price').innerHTML = '$ ' + total;
    glazing_choice = glazing_change;
}


// create an object for pack sizes and its price adaption
const packsize_price = {
    '1': 1,
    '3': 3,
    '6': 5,
    '12': 10
};

// function happens when something change for the dropdown list. Default: 1 pack (*1)
function packChange(element) {
    const pack_size = element.value;
    total_pack = packsize_price[pack_size]

    total = ((totalPrice + total_glazing) * total_pack).toFixed(2);
    document.getElementById('cart-price').innerHTML = '$ ' + total;
    pack = pack_size;
}


/* --------------------------------------------------------------------- */


class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    };
}



/* ----------solution hw6----------------------------------------------------------- */

const cartString = localStorage.getItem('storedProducts');
const current_cart = JSON.parse(cartString) || [];

function AddtoCart(rollType, glazing_choice, pack, basePrice){
    const New_cartitems = new Roll(rollType, glazing_choice, pack, basePrice);
    current_cart.push(New_cartitems);
}


function submit(){
    AddtoCart(rollType, glazing_choice, pack, rolls[rollType]['basePrice']);
    saveToLocalStorage();
}

function saveToLocalStorage(){
    const cartString = JSON.stringify(current_cart);
    localStorage.setItem('storedProducts', cartString);
    console.log(current_cart);
}












