/** === IMPORT PACKAGE HERE === */
import { isEqual, cloneDeep } from 'lodash';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as models from '@models';
/** === FUNCTION === */

/** => check if reserve fail on warehouse */
const validationWarehouse = (checkStockData: models.CheckStockResponse[]) => {
  let result = false;
  for (let i = 0; i < checkStockData.length; i++) {
    if (!checkStockData[i].isReserved) {
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
  let result = false;
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

      // remove unused property for comparation
      delete thisCartCheckProduct.isLastPriceUsedRules;
      delete thisCartCheckProduct.lastUsedPrice;
      delete thisCartCheckProduct.qty;
      delete thisCartCheckProduct.selected;
      delete thisCartCheckProduct.stock;
      delete thisCartCheckProduct.multipleQty;
      delete thisCartCheckProduct.status;
      delete thisCartCheckProduct.stockStatus;
      delete thisCartCheckProduct.warehouseName;
      delete thisCheckProduct.status;

      if (!isEqual(thisCartCheckProduct, thisCheckProduct)) {
        console.log('check product data not match');
        result = true;
        break;
      }
    }

    /**
     * CHECK SELLER VALIDATION
     */
    const checkSellerIndex = checkSellerData.findIndex((item) => {
      return item.sellerId === cartData.sellers[i].sellerId;
    });

    const thisCartSeller: any = cloneDeep(cartData.sellers[i]);
    const thisCheckSeller: any = cloneDeep(checkSellerData[checkSellerIndex]);

    // remove unused property for comparation
    delete thisCartSeller.products;

    if (!isEqual(thisCartSeller, thisCheckSeller)) {
      console.log('check seller data not match');
      result = true;
      break;
    }
  }

  if (validationWarehouse(checkStockData)) {
    console.log('check stock data not match');
    result = true;
  }

  return result;
};

export { matchCartWithCheckData };
