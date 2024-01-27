import { cart, deleteItem, updateDeliveryOption } from "../../data/cart.js";
import { products ,getProduct} from "../../data/products.js";
import { formatCur } from "../../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOption,getDeliveyOption} from "../../data/deliveryOption.js";

// console.log(dayjs());
const today = dayjs();
console.log("Today is " + today);
const deleverydate = today.add(7, 'days');
console.log(deleverydate);
// dd (su-sa)   M (1-12)
// ddd(su sat)  MM(01-12)
//dddd (sunday-saterday)  MMM(jan-DES)
// H (0-23)    MMMM(january-December)
//          D(1-31)
console.log(deleverydate.format('dddd, MMMM D'));
deleverydate.format('dddd, MMMM D');
export function displayOrder(){
let cartSumhtml = '';
// fun();
// export function fun(){
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct=getProduct(productId);
  const deliveryOptionId = cartItem.deliveryOptionId;
  let matchingOption=getDeliveyOption(deliveryOptionId);
  const today = dayjs();
  const deliveryDate = today.add(matchingOption.deliveryDays, 'days');
  const dataString = deliveryDate.format('dddd, MMMM, D');

  cartSumhtml += ` <div class="cart-item-container
  js-cart-item-container-${matchingProduct.id}">
       <div class="delivery-date">
         Delivery date: ${dataString}
       </div>

       <div class="cart-item-details-grid">
         <img class="product-image"
           src="${matchingProduct.image}">

         <div class="cart-item-details">
           <div class="product-name">
             ${matchingProduct.name}
           </div>
           <div class="product-price">
             $${formatCur(matchingProduct.priceCents)}
           </div>
           <div class="product-quantity">
             <span>
               Quantity: <span class="quantity-label">${cartItem.quantity}</span>
             </span>
             <span class="update-quantity-link link-primary">
               Update
             </span>
             <span class="delete-quantity-link link-primary
              js-delete-item" data-product-id="${matchingProduct.id}">
               Delete
             </span>
           </div>
         </div>

         <div class="delivery-options">
           <div class="delivery-options-title">
             Choose a delivery option:
           </div>
           ${deliveryOptionHtml(matchingProduct, cartItem)}
         </div>
       </div>
     </div>`;

});



function deliveryOptionHtml(matchingProduct, cartItem) {
  let html = '';
  deliveryOption.forEach((deliveryOp) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOp.deliveryDays, 'days');
    const dataString = deliveryDate.format('dddd, MMMM, D');
    // let deliveryType;
    // if(deliveryOp.deliveryDays===7){
    //   deliveryType='FREE Shipping'
    // }
    // else if(deliveryOp.deliveryDays === 3){
    //   deliveryType=`$${formatCur(deliveryOp.priceCents)}-Shipping`
    // }
    // else if(deliveryOp.deliveryDays === 1){
    //   deliveryType=`$${formatCur(deliveryOp.priceCents)}-Shipping`
    // }
    const isChecked = deliveryOp.id === cartItem.deliveryOptionId;
    let deliveryType = deliveryOp.priceCents === 0 ? 'FREE' : `$${formatCur(deliveryOp.priceCents)}`;

    html +=
      ` <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOp.id}">
    <input type="radio"   
    ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
        ${dataString}
      </div>
      <div class="delivery-option-price">
       ${deliveryType} Shipping
      </div>
    </div>
  </div>
    `
  });
  return html;
}

// }
document.querySelector('.js-order-sum').innerHTML = cartSumhtml;


document.querySelectorAll('.js-delete-item').forEach((delet) => {
  delet.addEventListener('click', () => {
    const productId = delet.dataset.productId;
    console.log(productId);
    deleteItem(productId);
    console.log(cart);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`);
      displayOrder();
      //to remove the element from the dom 
    // container.remove();

  });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const {productId,deliveryOptionId}=element.dataset;
     updateDeliveryOption(productId,deliveryOptionId)
     displayOrder();
  });
});

}