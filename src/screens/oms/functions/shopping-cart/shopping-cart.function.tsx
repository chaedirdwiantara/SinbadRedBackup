/** === IMPORT PACKAGE HERE === */
import { Dispatch, SetStateAction } from 'react';
import {
  CartInvoiceGroup,
  IProductItemUpdateCart,
  ICartMasterProductNotAvailable,
} from '@models';
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
            totalPrice += Number(product.displayPrice) * Number(product.qty);
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
  action: 'increase' | 'decrease' | 'onChange',
  invoiceGroupsState: [
    Array<CartInvoiceGroup>,
    (any: CartInvoiceGroup[]) => void,
  ],
  currentQty: number,
  setSassionQty: Dispatch<SetStateAction<number>>,
) => {
  const [invoiceGroups, setInvoiceGroups] = invoiceGroupsState;
  const invoiceGroupsCopy = [...invoiceGroups];
  const currentInvoiceGroup = invoiceGroupsCopy[invoiceGroupIndex];
  const currentBrand = currentInvoiceGroup.brands[brandIndex];
  const currentProduct = currentBrand.products[productIndex];

  if (action === 'increase' && currentProduct.qty < currentProduct.stock) {
    currentProduct.qty = currentQty + 1;
  } else if (action === 'decrease' && currentProduct.qty > 0) {
    currentProduct.qty = currentQty - 1;
  } else if (action === 'onChange') {
    if (currentQty >= currentProduct.stock) {
      currentProduct.qty = currentProduct.stock;
    } else if (currentQty <= currentProduct.minQty) {
      currentProduct.qty = currentProduct.minQty;
    } else {
      currentProduct.qty = currentQty;
    }
  }

  currentBrand.products[productIndex] = currentProduct;
  currentInvoiceGroup.brands[brandIndex] = currentBrand;
  invoiceGroupsCopy[invoiceGroupIndex] = currentInvoiceGroup;

  setInvoiceGroups(invoiceGroupsCopy);
  setSassionQty(Math.random() * 10000000);
};
/** => handle when product is selected or unselected */
const handleSelectedProductChange = (
  invoiceGroupIndex: number,
  brandIndex: number,
  productIndex: number,
  selected: boolean,
  invoiceGroupsState: [
    Array<CartInvoiceGroup>,
    (any: CartInvoiceGroup[]) => void,
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

  if (selectedCount === 0) {
    currentBrand.selected = false;
  } else {
    currentBrand.selected = true;
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
    (any: CartInvoiceGroup[]) => void,
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
  onRemoveProduct: (any: IProductItemUpdateCart) => void,
) => {
  const deletedProduct =
    invoiceGroups[invoiceGroupIndex].brands[brandIndex].products[productIndex];
  onRemoveProduct({
    productId: deletedProduct.productId,
    qty: 0,
    selected: deletedProduct.selected,
    stock: deletedProduct.stock,
  });
};

const handleProductNotAvailableDelete = (
  product: ICartMasterProductNotAvailable,
  onRemoveProduct: (any: IProductItemUpdateCart) => void,
) => {
  onRemoveProduct({
    productId: product.productId,
    qty: 0,
    selected: false,
    stock: 0,
  });
};

export {
  getTotalProducts,
  getTotalPrice,
  handleProductQuantityChange,
  handleSelectedProductChange,
  handleSelectedBrandChange,
  handleAllSelectedProductsChange,
  handleProductDelete,
  handleProductNotAvailableDelete,
};
