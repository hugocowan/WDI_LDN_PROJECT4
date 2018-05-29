class Decimals {
  static calculate(price) {
    if(price % 1 === 0){
      return `£${price}.00`;
    }else if(price.toString().split('.')[1].length === 1){
      return `£${price}0`;
    } else return `£${price}`;
  }
}
export default Decimals;
