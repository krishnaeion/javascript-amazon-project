export function formatCur(priceCents){
    return (((Math.round(priceCents))/100).toFixed(2));
}