// let currentProduct = document.querySelector('.detail-title').id
// let products = [['item-1', 2.49], ['item-2', 3.49], ['item-3', 2.99], ['item-4', 3.49], ['item-5', 3.99], ['item-6', 3.99]]

// // to identify which product it is and its price
// let totalPrice = 0;
// for (let k in products) {
//     if (currentProduct === products[k][0]){
//         totalPrice = products[k][1];
//     }
// }






let total_glazing = 0;
let total_pack = 1;
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

}




