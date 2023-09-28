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

console.log(rollType);

// Update the header
const headerElement = document.querySelector('#detail-header-title');
headerElement.innerText = rollType + ' Cinnamon Roll';

// Update the image
const itemImage = document.querySelector('#item-img');
itemImage.src = '../assets/products/' + rollType + '-cinnamon-roll.jpg';

// Update the base price
const baseprice = document.querySelector('#cart-price');
baseprice.innerText = '$ ' + rolls[rollType]['basePrice'];

/* --------------------------------------------------------------------- */

let totalPrice = rolls[rollType]['basePrice'];
console.log('base price:' + totalPrice);

let total_glazing = 0;
let glazing_choice = '';
let total_pack = 1;
let pack = 0;
let total = 0;

// create an array for each glazing option and its price adaption
let glazing_price = [['keep-original', 0], ['sugar-milk', 0], ['vanilla-milk', 0.5], ['double-chocolate', 1.5]];

// function happens when something change for the dropdown list. Default: Keep original ($ 0.00)
function glazingChange(element) {
    const glazing_change = element.value;
    for (let i of Object.keys(glazing_price)){
        if (glazing_change === glazing_price[i][0]){
            total_glazing = glazing_price[i][1];
            // console.log('glazing = ' + total_glazing);
        }
    }
    total = ((totalPrice + total_glazing) * total_pack).toFixed(2);
    document.getElementById('cart-price').innerHTML = '$ ' + total;
    glazing = glazing_change;
}


// create an array for pack sizes and its price adaption
let packsize_price = [['1', 1], ['3', 3], ['6', 5], ['12', 10]];

// function happens when something change for the dropdown list. Default: 1 pack (*1)
function packChange(element) {
    const pack_size = element.value;
    for (let j of Object.keys(packsize_price)){
        if (pack_size === packsize_price[j][0]){
            total_pack = packsize_price[j][1];
            // console.log('pack size = ' + total_pack);
        }
    }
    total = ((totalPrice + total_glazing) * total_pack).toFixed(2);
    document.getElementById('cart-price').innerHTML = '$ ' + total;
    pack = pack_size;
}


/* --------------------------------------------------------------------- */
const cart = [];

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    };
}



function AddtoCart(){
    const New_cartitems = new Roll(rollType, glazing, pack, rolls[rollType]['basePrice'])
    cart.push(New_cartitems);
    console.log(cart);
}
