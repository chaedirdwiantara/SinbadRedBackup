const findIsSelected = (paymentMethods: [] | any) => {
  let selected: [] = [];
  for (let i = 0; i < paymentMethods?.length; i++) {
    if (paymentMethods[i].isSelected === true) {
      selected.push(paymentMethods[i]);
    }
  }
  return selected;
};

export { findIsSelected };
