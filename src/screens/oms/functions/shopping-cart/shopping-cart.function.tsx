/** === IMPORT PACKAGE HERE === */
import { Dispatch, SetStateAction } from 'react';
import { CartInvoiceGroup } from '@models';
/** === FUNCTION === */
/** => get total products from invoice group list */
const getTotalProducts = (invoiceGroups: Array<CartInvoiceGroup>) => {
  let totalProducts = 0;

  invoiceGroups.forEach((invoiceGroup) => {
    invoiceGroup.brands.forEach((brand) => {
      totalProducts += brand.products.length;
    });
  });

  return totalProducts;
};
/** => get total price from selected products */
const getTotalPrice = (invoiceGroups: Array<CartInvoiceGroup>) => {
  let totalPrice = 0;

  invoiceGroups.forEach((invoiceGroup) => {
    invoiceGroup.brands.forEach((brand) => {
      if (brand.selected) {
        brand.products.forEach((product) => {
          if (product.selected) {
            totalPrice += product.displayPrice;
          }
        });
      }
    });
  });

  return totalPrice;
};
/** => handle when product quantity changed */
const handleProductQuantityChange = (
  invoiceGroupIndex: number,
  brandIndex: number,
  productIndex: number,
  action: 'increase' | 'decrease',
  invoiceGroupsState: [
    Array<CartInvoiceGroup>,
    Dispatch<SetStateAction<Array<CartInvoiceGroup>>>,
  ],
) => {
  const [invoiceGroups, setInvoiceGroups] = invoiceGroupsState;
  const invoiceGroupsCopy = [...invoiceGroups];
  const currentInvoiceGroup = invoiceGroupsCopy[invoiceGroupIndex];
  const currentBrand = currentInvoiceGroup.brands[brandIndex];
  const currentProduct = currentBrand.products[productIndex];

  if (action === 'increase') {
    currentProduct.qty += 1;
  } else {
    currentProduct.qty -= 1;
  }

  currentBrand.products[productIndex] = currentProduct;
  currentInvoiceGroup.brands[brandIndex] = currentBrand;
  invoiceGroupsCopy[invoiceGroupIndex] = currentInvoiceGroup;

  setInvoiceGroups(invoiceGroupsCopy);
};
/** => handle when product is selected or unselected */
const handleSelectedProductChange = (
  invoiceGroupIndex: number,
  brandIndex: number,
  productIndex: number,
  selected: boolean,
  invoiceGroupsState: [
    Array<CartInvoiceGroup>,
    Dispatch<SetStateAction<Array<CartInvoiceGroup>>>,
  ],
  productSelectedCountState: [number, Dispatch<SetStateAction<number>>],
  setAllProductsSelected: Dispatch<SetStateAction<boolean>>,
  totalProducts: number,
) => {
  const [invoiceGroups, setInvoiceGroups] = invoiceGroupsState;
  const [productSelectedCount, setProductSelectedCount] =
    productSelectedCountState;
  const invoiceGroupsCopy = [...invoiceGroups];
  const currentInvoiceGroup = invoiceGroupsCopy[invoiceGroupIndex];
  const currentBrand = currentInvoiceGroup.brands[brandIndex];
  const currentProduct = currentBrand.products[productIndex];
  let totalSelectedCount = productSelectedCount;

  let selectedCount = 0;
  currentBrand.products.forEach((product) => {
    if (product.selected) {
      selectedCount++;
    }
  });

  currentProduct.selected = selected;
  if (selected) {
    selectedCount += 1;
    totalSelectedCount += 1;
  } else {
    selectedCount -= 1;
    totalSelectedCount -= 1;
  }

  if (selectedCount === currentBrand.products.length) {
    currentBrand.selected = true;
  } else {
    currentBrand.selected = false;
  }

  currentBrand.products[productIndex] = currentProduct;
  currentInvoiceGroup.brands[brandIndex] = currentBrand;
  invoiceGroupsCopy[invoiceGroupIndex] = currentInvoiceGroup;

  if (totalSelectedCount === 0) {
    setAllProductsSelected(false);
  } else if (totalSelectedCount === totalProducts) {
    setAllProductsSelected(true);
  } else {
    setAllProductsSelected(false);
  }

  setInvoiceGroups(invoiceGroupsCopy);
  setProductSelectedCount(totalSelectedCount);
};
/** => handle when brand is selected or unselected */
const handleSelectedBrandChange = (
  invoiceGroupIndex: number,
  brandIndex: number,
  selected: boolean,
  invoiceGroupsState: [
    Array<CartInvoiceGroup>,
    Dispatch<SetStateAction<Array<CartInvoiceGroup>>>,
  ],
  productSelectedCountState: [number, Dispatch<SetStateAction<number>>],
  setAllProductsSelected: Dispatch<SetStateAction<boolean>>,
  totalProducts: number,
) => {
  const [invoiceGroups, setInvoiceGroups] = invoiceGroupsState;
  const [productSelectedCount, setProductSelectedCount] =
    productSelectedCountState;
  const invoiceGroupsCopy = [...invoiceGroups];
  const currentInvoiceGroup = invoiceGroupsCopy[invoiceGroupIndex];
  const currentBrand = currentInvoiceGroup.brands[brandIndex];
  let totalSelectedCount = productSelectedCount;
  currentBrand.selected = selected;

  let selectedCount = 0;
  currentBrand.products.forEach((product) => {
    if (product.selected) {
      selectedCount++;
    }
  });

  if (selected) {
    if (selectedCount === currentBrand.products.length) {
      totalSelectedCount += currentBrand.products.length;
    } else {
      // Only adds unselected count
      totalSelectedCount += currentBrand.products.length - selectedCount;
    }

    selectedCount = currentBrand.products.length;
    currentBrand.products.forEach((product) => {
      product.selected = true;
    });
  } else {
    if (selectedCount === currentBrand.products.length) {
      totalSelectedCount -= currentBrand.products.length;
    } else {
      // Only substracts selected count
      totalSelectedCount -= selectedCount;
    }

    selectedCount = 0;
    currentBrand.products.forEach((product) => {
      product.selected = false;
    });
  }

  currentInvoiceGroup.brands[brandIndex] = currentBrand;
  invoiceGroupsCopy[invoiceGroupIndex] = currentInvoiceGroup;

  if (totalSelectedCount === 0) {
    setAllProductsSelected(false);
  } else if (totalSelectedCount === totalProducts) {
    setAllProductsSelected(true);
  } else {
    setAllProductsSelected(false);
  }

  setInvoiceGroups(invoiceGroupsCopy);
  setProductSelectedCount(totalSelectedCount);
};
/** => handle when select all flag is selected or unselected */
const handleAllSelectedProductsChange = (
  selected: boolean,
  invoiceGroupsState: [
    Array<CartInvoiceGroup>,
    Dispatch<SetStateAction<Array<CartInvoiceGroup>>>,
  ],
  setProductSelectedCount: Dispatch<SetStateAction<number>>,
  setAllProductsSelected: Dispatch<SetStateAction<boolean>>,
  totalProducts: number,
) => {
  const [invoiceGroups, setInvoiceGroups] = invoiceGroupsState;
  const invoiceGroupsCopy = [...invoiceGroups];
  const totalSelectedCount = selected === true ? totalProducts : 0;

  invoiceGroupsCopy.forEach((invoiceGroup) => {
    invoiceGroup.brands.forEach((brand) => {
      brand.selected = selected;
      brand.selectedCount = selected === true ? brand.products.length : 0;
      brand.products.forEach((product) => {
        product.selected = selected;
      });
    });
  });

  setAllProductsSelected(selected);
  setInvoiceGroups(invoiceGroupsCopy);
  setProductSelectedCount(totalSelectedCount);
};
/** => handle when delete icon is pressed */
const handleProductDelete = (
  invoiceGroupIndex: number,
  brandIndex: number,
  productIndex: number,
  invoiceGroups: Array<CartInvoiceGroup>,
) => {
  const deletedProduct =
    invoiceGroups[invoiceGroupIndex].brands[brandIndex].products[productIndex];
  console.log(`${deletedProduct.productName} deleted`);
};

export {
  getTotalProducts,
  getTotalPrice,
  handleProductQuantityChange,
  handleSelectedProductChange,
  handleSelectedBrandChange,
  handleAllSelectedProductsChange,
  handleProductDelete,
};
