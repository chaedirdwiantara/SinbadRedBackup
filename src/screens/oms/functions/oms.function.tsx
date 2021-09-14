/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
import { Dispatch, SetStateAction } from 'react';
import {
  DeterminateCheckboxStatus,
  CheckboxStatus,
  InvoiceGroup,
} from '../views/oms-shopping-cart.view';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => back to cart */
const backToCart = () => {
  NavigationAction.backToPage('OmsShoppingCartView');
  // NavigationAction.reset('OmsShoppingCartView');
};
/** => go to cart 2 */
const goToCart2 = () => {
  NavigationAction.navigate('OmsVerificationView');
  // NavigationAction.navigate('OmsShoppingCart2View', {
  //   id: '1',
  //   name: 'test from oms cart 2',
  // });
};
/** => go to cart 3 */
const goToCart3 = () => {
  NavigationAction.navigate('OmsShoppingCart3View');
};
/** => go to cart 4 */
const goToCart4 = () => {
  NavigationAction.navigate('OmsShoppingCart4View');
};
/** => go to checkout */
const goToCheckout = () => {
  NavigationAction.navigate('OmsCheckoutView');
};
/** => convert number to currency */
const toCurrency = (nominal: number) =>
  `Rp ${nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
/** => get total products from invoice group list */
const getTotalProducts = (invoiceGroups: Array<InvoiceGroup>) => {
  let totalProducts = 0;

  invoiceGroups.forEach((invoiceGroup) => {
    invoiceGroup.brands.forEach((brand) => {
      totalProducts += brand.products.length;
    });
  });

  return totalProducts;
};
/** => get total price from selected products */
const getTotalPrice = (invoiceGroups: Array<InvoiceGroup>) => {
  let totalPrice = 0;

  invoiceGroups.forEach((invoiceGroup) => {
    invoiceGroup.brands.forEach((brand) => {
      if (brand.selected !== 'unselect') {
        brand.products.forEach((product) => {
          if (product.selected === 'selected') {
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
    Array<InvoiceGroup>,
    Dispatch<SetStateAction<Array<InvoiceGroup>>>,
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
  selected: DeterminateCheckboxStatus,
  invoiceGroupsState: [
    Array<InvoiceGroup>,
    Dispatch<SetStateAction<Array<InvoiceGroup>>>,
  ],
  productSelectedCountState: [number, Dispatch<SetStateAction<number>>],
  setAllProductsSelected: Dispatch<SetStateAction<CheckboxStatus>>,
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
  currentProduct.selected = selected;

  if (selected === 'selected') {
    currentBrand.selectedCount += 1;
    totalSelectedCount += 1;
  } else {
    currentBrand.selectedCount -= 1;
    totalSelectedCount -= 1;
  }

  if (currentBrand.selectedCount === 0) {
    currentBrand.selected = 'unselect';
  }

  if (
    currentBrand.selectedCount > 0 &&
    currentBrand.selectedCount < currentBrand.products.length
  ) {
    currentBrand.selected = 'indeterminate';
  }

  if (currentBrand.selectedCount === currentBrand.products.length) {
    currentBrand.selected = 'selected';
  }

  currentBrand.products[productIndex] = currentProduct;
  currentInvoiceGroup.brands[brandIndex] = currentBrand;
  invoiceGroupsCopy[invoiceGroupIndex] = currentInvoiceGroup;

  if (totalSelectedCount === 0) {
    setAllProductsSelected('unselect');
  } else if (totalSelectedCount === totalProducts) {
    setAllProductsSelected('selected');
  } else {
    setAllProductsSelected('indeterminate');
  }

  setInvoiceGroups(invoiceGroupsCopy);
  setProductSelectedCount(totalSelectedCount);
};
/** => handle when brand is selected or unselected */
const handleSelectedBrandChange = (
  invoiceGroupIndex: number,
  brandIndex: number,
  selected: DeterminateCheckboxStatus,
  invoiceGroupsState: [
    Array<InvoiceGroup>,
    Dispatch<SetStateAction<Array<InvoiceGroup>>>,
  ],
  productSelectedCountState: [number, Dispatch<SetStateAction<number>>],
  setAllProductsSelected: Dispatch<SetStateAction<CheckboxStatus>>,
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

  if (selected === 'selected') {
    if (currentBrand.selectedCount === currentBrand.products.length) {
      totalSelectedCount += currentBrand.products.length;
    } else {
      // Only adds unselected count
      totalSelectedCount +=
        currentBrand.products.length - currentBrand.selectedCount;
    }

    currentBrand.selectedCount = currentBrand.products.length;
    currentBrand.products.forEach((product) => {
      product.selected = 'selected';
    });
  } else {
    if (currentBrand.selectedCount === currentBrand.products.length) {
      totalSelectedCount -= currentBrand.products.length;
    } else {
      // Only substracts selected count
      totalSelectedCount -= currentBrand.selectedCount;
    }

    currentBrand.selectedCount = 0;
    currentBrand.products.forEach((product) => {
      product.selected = 'unselect';
    });
  }

  currentInvoiceGroup.brands[brandIndex] = currentBrand;
  invoiceGroupsCopy[invoiceGroupIndex] = currentInvoiceGroup;

  if (totalSelectedCount === 0) {
    setAllProductsSelected('unselect');
  } else if (totalSelectedCount === totalProducts) {
    setAllProductsSelected('selected');
  } else {
    setAllProductsSelected('indeterminate');
  }

  setInvoiceGroups(invoiceGroupsCopy);
  setProductSelectedCount(totalSelectedCount);
};
/** => handle when select all flag is selected or unselected */
const handleAllSelectedProductsChange = (
  selected: DeterminateCheckboxStatus,
  invoiceGroupsState: [
    Array<InvoiceGroup>,
    Dispatch<SetStateAction<Array<InvoiceGroup>>>,
  ],
  setProductSelectedCount: Dispatch<SetStateAction<number>>,
  setAllProductsSelected: Dispatch<SetStateAction<CheckboxStatus>>,
  totalProducts: number,
) => {
  const [invoiceGroups, setInvoiceGroups] = invoiceGroupsState;
  const invoiceGroupsCopy = [...invoiceGroups];
  const totalSelectedCount = selected === 'selected' ? totalProducts : 0;

  invoiceGroupsCopy.forEach((invoiceGroup) => {
    invoiceGroup.brands.forEach((brand) => {
      brand.selected = selected;
      brand.selectedCount = selected === 'selected' ? brand.products.length : 0;
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
  invoiceGroups: Array<InvoiceGroup>,
) => {
  const deletedProduct =
    invoiceGroups[invoiceGroupIndex].brands[brandIndex].products[productIndex];
  console.log(`${deletedProduct.name} deleted`);
};

export const OmsFunc = {
  goBack,
  backToCart,
  goToCart2,
  goToCart3,
  goToCart4,
  goToCheckout,
  toCurrency,
  getTotalProducts,
  getTotalPrice,
  handleProductQuantityChange,
  handleSelectedProductChange,
  handleSelectedBrandChange,
  handleAllSelectedProductsChange,
  handleProductDelete,
};
