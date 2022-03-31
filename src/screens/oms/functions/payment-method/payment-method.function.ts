import * as models from '@models';
const findIsSelected = (paymentMethods: models.PaymentMethod[] | any) => {
  let selected: models.PaymentMethod[] = [];
  for (let i = 0; i < paymentMethods?.length; i++) {
    if (paymentMethods[i].isSelected === true) {
      selected.push(paymentMethods[i]);
    }
  }
  return selected;
};

export { findIsSelected };
