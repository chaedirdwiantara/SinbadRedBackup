/** === IMPORT PACKAGE HERE === */
import { Dispatch, SetStateAction } from 'react';
import {
  CartInvoiceGroup,
  IProductItemUpdateCart,
  ICartMasterProductNotAvailable,
  IProductRemoveSelected,
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
            totalPrice += Number(product.finalPrice ?? 0) * Number(product.qty);
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
  setItemProductMasterCart: (item: IProductItemUpdateCart) => void,
) => {
  const [invoiceGroups, setInvoiceGroups] = invoiceGroupsState;
  const invoiceGroupsCopy = [...invoiceGroups];
  const currentInvoiceGroup = invoiceGroupsCopy[invoiceGroupIndex];
  const currentBrand = currentInvoiceGroup.brands[brandIndex];
  const currentProduct = currentBrand.products[productIndex];
  const qtyString = currentQty.toString();
  if (action === 'increase' && currentProduct.qty < currentProduct.stock) {
    currentProduct.qty = currentQty + currentProduct.multipleQty;
  } else if (action === 'decrease' && currentProduct.qty > 0) {
    currentProduct.qty = currentQty - currentProduct.multipleQty;
  } else if (
    action === 'onChange' &&
    Number.isInteger(currentQty) &&
    qtyString.length <= 6
  ) {
    currentProduct.qty = currentQty;
  }

  currentBrand.products[productIndex] = currentProduct;
  currentInvoiceGroup.brands[brandIndex] = currentBrand;
  invoiceGroupsCopy[invoiceGroupIndex] = currentInvoiceGroup;

  setItemProductMasterCart({
    productId: currentProduct.productId,
    qty: currentProduct.qty,
    stock: currentProduct.stock,
    selected: currentProduct.selected,
  });
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
  setAllProductsSelected: Dispatch<SetStateAction<boolean | 'indeterminate'>>,
  totalProducts: number,
  setSassionQty: Dispatch<SetStateAction<number>>,
  setItemProductMasterCart: (item: IProductItemUpdateCart) => void,
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
  const totalProductBrand = currentBrand.products.length;
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
  } else if (selectedCount !== totalProductBrand) {
    currentBrand.selected = 'indeterminate';
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
  } else if (totalSelectedCount !== totalProducts) {
    setAllProductsSelected('indeterminate');
  } else {
    setAllProductsSelected(false);
  }

  setItemProductMasterCart({
    productId: currentProduct.productId,
    qty: currentProduct.qty,
    stock: currentProduct.stock,
    selected: selected,
  });
  setInvoiceGroups(invoiceGroupsCopy);
  setProductSelectedCount(totalSelectedCount);
  setSassionQty(Math.random() * 10000000);
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
  setAllProductsSelected: Dispatch<SetStateAction<boolean | 'indeterminate'>>,
  totalProducts: number,
  setItemProductMasterCart: (item: IProductItemUpdateCart) => void,
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
      setItemProductMasterCart({
        productId: product.productId,
        qty: product.qty,
        stock: product.stock,
        selected: true,
      });
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
      setItemProductMasterCart({
        productId: product.productId,
        qty: product.qty,
        stock: product.stock,
        selected: false,
      });
    });
  }

  currentInvoiceGroup.brands[brandIndex] = currentBrand;
  invoiceGroupsCopy[invoiceGroupIndex] = currentInvoiceGroup;

  if (totalSelectedCount === 0) {
    setAllProductsSelected(false);
  } else if (totalSelectedCount === totalProducts) {
    setAllProductsSelected(true);
  } else {
    setAllProductsSelected('indeterminate');
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
  setAllProductsSelected: Dispatch<SetStateAction<boolean | 'indeterminate'>>,
  totalProducts: number,
  setItemProductMasterCart: (item: IProductItemUpdateCart) => void,
) => {
  const [invoiceGroups, setInvoiceGroups] = invoiceGroupsState;
  const invoiceGroupsCopy = [...invoiceGroups];
  const totalSelectedCount = selected === true ? totalProducts : 0;

  invoiceGroupsCopy.forEach((invoiceGroup) => {
    invoiceGroup.brands.forEach((brand) => {
      brand.selected = selected;
      brand.selectedCount = selected === true ? brand.products.length : 0;
      brand.products.forEach((product) => {
        setItemProductMasterCart({
          productId: product.productId,
          qty: product.qty,
          stock: product.stock,
          selected: selected,
        });
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
  onRemoveProduct: (any: IProductRemoveSelected) => void,
) => {
  const deletedProduct =
    invoiceGroups[invoiceGroupIndex].brands[brandIndex].products[productIndex];
  onRemoveProduct({
    productId: deletedProduct.productId,
    qty: 0,
    selected: deletedProduct.selected,
    stock: deletedProduct.stock,
    type: 'data',
  });
};

const handleProductNotAvailableDelete = (
  product: ICartMasterProductNotAvailable,
  onRemoveProduct: (any: IProductRemoveSelected) => void,
  type: 'dataEmptyStock' | 'dataNotFound',
) => {
  onRemoveProduct({
    productId: product.productId,
    qty: 0,
    selected: false,
    stock: 0,
    type,
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
