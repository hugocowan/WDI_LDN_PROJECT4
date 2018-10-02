class Decimals {
  static calculate(price) {

    if(price % 1 === 0){
      return `£${price}.00`;

    }else if(price.toString().split('.')[1].length === 1){
      return `£${price}0`;

    } else if(price.toString().split('.')[1].length > 2) {
      const roundedNumber = `£${Math.round(price * 100)/100}`;
      if(roundedNumber.toString().split('.')[1].length === 1) return `${roundedNumber}0`;
      return roundedNumber;
    }else return `£${price}`;
  }
}
export default Decimals;
