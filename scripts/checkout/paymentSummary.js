import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.JS";
import { formatCur } from "../../utils/money.js";
import { deliveryOption, getDeliveyOption } from "../../data/deliveryOption.js";
export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    // cart.forEach((element) => {
    //     const product=getProduct(element.productId);
    //     productPriceCents+=product.priceCents*element.quantity;

    //     const deliveryOption=getDeliveyOption(cart.deliveryOption);
    //     shippingPriceCents+=deliveryOption.priceCents;
    // });
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveyOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCent = totalBeforeTaxCents * 0.1;
  //  const totalPrice = (productPriceCents + shippingPriceCents) / 100;
    const totalAmount = taxCent + totalBeforeTaxCents;

    //document.getElementById("total-amount").innerText= "$" + totalPrice.toFixed(2);
    // console.log(productPriceCents);
    console.log(shippingPriceCents);
    

const paymentSummaryHTML = 
`<div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (3):</div>
    <div class="payment-summary-money">$${formatCur(productPriceCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCur(shippingPriceCents)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCur(totalBeforeTaxCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCur(taxCent)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCur(totalAmount)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>`

  console.log(paymentSummaryHTML);
  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
  renderPaymentSummary();
}