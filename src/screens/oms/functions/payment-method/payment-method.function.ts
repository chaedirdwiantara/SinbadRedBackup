const findIsSelected = (paymentMethods: []) => {
  console.log(paymentMethods, 'paymentMethods');

  let selected: [] = [];
  for (let i = 0; i < paymentMethods?.length; i++) {
    if (paymentMethods[i].isSelected === true) {
      selected.push(paymentMethods[i]);
    }
  }
  return selected;
};

export { findIsSelected };
