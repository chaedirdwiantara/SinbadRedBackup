/** === IMPORT PACKAGE HERE === */
import { isEqual, cloneDeep } from 'lodash';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as models from '@models';
/** === FUNCTION === */

/** => check if reserve fail on warehouse */
const validationWarehouse = (checkStockData: models.CheckStockResponse[]) => {
  let result = false;
  for (let i = 0; i < checkStockData.length; i++) {
    if (!checkStockData[i].isReserved || !checkStockData[i].isAvailable) {
      result = true;
    }
  }
  return result;
};

/** => validation process to match cart with check product, seller and stock data */
const matchCartWithCheckData = ({
  checkProductData,
  checkSellerData,
  checkStockData,
  cartData,
}: models.CartValidation) => {
  let result = true;
  for (let i = 0; i < cartData.sellers.length; i++) {
    for (
      let cartProductIndex = 0;
      cartProductIndex < cartData.sellers[i].products.length;
      cartProductIndex++
    ) {
      /**
       * CHECK PRODUCT VALIDATION
       */
      const checkProductIndex = checkProductData.findIndex((innerItem) => {
        return (
          cartData.sellers[i].products[cartProductIndex].productId ===
            innerItem.productId &&
          cartData.sellers[i].products[cartProductIndex].warehouseId ===
            innerItem.warehouseId
        );
      });

      const thisCartCheckProduct: any = cloneDeep(
        cartData.sellers[i].products[cartProductIndex],
      );
      const thisCheckProduct: any = cloneDeep({
        ...checkProductData[checkProductIndex],
        productStatus: checkProductData[checkProductIndex]?.status,
      });

      if (thisCartCheckProduct.selected) {
        // remove unused property for comparation
        delete thisCartCheckProduct.isLastPriceUsedRules;
        delete thisCartCheckProduct.lastUsedPrice;
        delete thisCartCheckProduct.qty;
        delete thisCartCheckProduct.selected;
        delete thisCartCheckProduct.stock;
        delete thisCartCheckProduct.status;
        delete thisCartCheckProduct.isStockAvailable;
        delete thisCartCheckProduct.warehouseName;
        delete thisCartCheckProduct.leadTime;
        delete thisCartCheckProduct.unavailableMessage;
        delete thisCartCheckProduct.externalWarehouseCode;
        delete thisCartCheckProduct.externalProductCode;
        delete thisCheckProduct.status;
        delete thisCheckProduct.externalProductCode;

        if (!isEqual(thisCartCheckProduct, thisCheckProduct)) {
          result = false;
          break;
        }
      }
    }

    /**
     * CHECK SELLER VALIDATION
     */
    const checkSellerIndex = checkSellerData.findIndex((item) => {
      return item.sellerId === cartData.sellers[i].sellerId;
    });

    let isAnyItemSelectedInThisSeller = false;
    cartData.sellers[i].products.map((productItem) => {
      if (productItem.selected) {
        isAnyItemSelectedInThisSeller = true;
      }
    });

    if (isAnyItemSelectedInThisSeller) {
      const thisCartSeller: any = cloneDeep(cartData.sellers[i]);
      const thisCheckSeller: any = cloneDeep(checkSellerData[checkSellerIndex]);

      // remove unused property for comparation
      delete thisCartSeller.products;
      delete thisCartSeller.sellerAdminId;
      delete thisCartSeller.sellerAdminName;
      delete thisCartSeller.sellerAdminEmail;
      delete thisCheckSeller.sellerAdminId;
      delete thisCheckSeller.sellerAdminName;
      delete thisCheckSeller.sellerAdminEmail;

      if (!isEqual(thisCartSeller, thisCheckSeller)) {
        result = false;
        break;
      }
    }
  }

  if (validationWarehouse(checkStockData)) {
    result = false;
  }

  return result;
};

const manageRemoveProduct = ({
  source,
  removedProducts,
  stateData,
}: models.ManageRemoveProduct) => {
  const sellers: models.CartMasterSellers[] = [];
  const unavailable: models.CartMasterUnavailable[] = [];
  if (source === 'available') {
    stateData.sellers.map((sellerItem) => {
      const products: models.CartMasterSellersProducts[] = [];
      sellerItem.products.map((productItem) => {
        const isFound =
          removedProducts.findIndex((innerItem) => {
            return (
              innerItem.productId === productItem.productId &&
              innerItem.warehouseId === productItem.warehouseId
            );
          }) > -1;
        if (!isFound) {
          products.push(productItem);
        }
      });

      sellers.push({
        ...sellerItem,
        products,
      });
    });
    // save data to local state
    return {
      ...stateData,
      sellers: sellers,
    };
  } else {
    stateData.unavailable.map((item) => {
      const isFound =
        removedProducts.findIndex(
          (innerItem) =>
            innerItem.productId === item.productId &&
            innerItem.warehouseId === item.warehouseId,
        ) > -1;
      if (!isFound) {
        unavailable.push(item);
      }
    });
    // save data to local state
    return {
      ...stateData,
      unavailable: unavailable,
    };
  }
};

export { matchCartWithCheckData, manageRemoveProduct };
