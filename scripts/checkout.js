import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

cart.forEach((cartItem)=>{
       const productId=cartItem.productId;
    let productItem=products.forEach((item)=>{
             if(productId===item.productId){
                return item;
             }
    });
    console.log(productItem);
  
    
});
