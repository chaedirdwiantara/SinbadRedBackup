const findIsSelected = (data: any) => {
  let selected = [];
  for (let i = 0; i < data?.length; i++) {
    for (let a = 0; a < data[i]?.paymentMethods.length; a++) {
      if (data[i].paymentMethods[a].isSelected === true) {
        selected.push(data[i].paymentMethods[a]);
      }
    }
  }
  return selected;
};

const findIdSeller = (data: any) => {
  let selected = '';
  for (let i = 0; i < data?.length; i++) {
    selected += `&sellerIds[]=${data[i].sellerId}`;
  }
  return selected;
};

export { findIsSelected, findIdSeller };
