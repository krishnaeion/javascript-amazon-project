export const deliveryOption=[{
    id:'1',
    deliveryDays:7,
    priceCents:0,

},
{
    id:'2',
    deliveryDays:3,
    priceCents:499
},
{
    id:'3',
    deliveryDays:1,
    priceCents:999
}];

export function getDeliveyOption(deliveryOptionId){
    let matchingOption;
  deliveryOption.forEach((deliveryItem) => {
    if (deliveryItem.id === deliveryOptionId) {
      matchingOption = deliveryItem;
    }
  });
  return matchingOption;
}
``