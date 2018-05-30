class Decimals {
  static calculate(price) {

    if(price % 1 === 0){
      return `£${price}.00`;

    }else if(price.toString().split('.')[1].length === 1){
      return `£${price}0`;

    } else if(price.toString().split('.')[1].length > 2) {
      return `£${Math.round(price * 100)/100}`;
      
    }else return `£${price}`;
  }
}
export default Decimals;
