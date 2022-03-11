/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
import { useContext } from 'react';
/** === FUNCTION === */
/** => checkout action */
const useCheckoutAction = () => {
  const { stateCart } = useContext(contexts.CartContext);
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      cartMaster: models.CartMaster,
    ) => {
      if (
        stateCart.postCheckProduct.data !== null &&
        stateCart.postCheckSeller.data !== null &&
        stateCart.postCheckStock.data !== null &&
        stateCart.buyerAddress.data !== null
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const buyerAddress = (({ buyerId, buyerName, ...rest }) => rest)(
          stateCart.buyerAddress.data,
        );

        const cartsTemp: models.CheckoutCartPayload[] = cartMaster.sellers.map(
          (seller) => {
            const products: models.CheckoutProductData[] = seller.products
              .filter((product) => product.selected)
              .map((product) => {
                let priceRules: models.ProductPriceRules | {} = {};
                /** ==> To be continued on bulk pricing sprint */
                if (product.priceRules.length > 0) {
                  const priceRulesLastItem =
                    product.priceRules[product.priceRules.length - 1];
                  if (priceRulesLastItem.maxQty <= product.qty) {
                    priceRules = priceRulesLastItem;
                  } else {
                    product.priceRules.map((priceRulesItem) => {
                      if (
                        product.qty >= priceRulesItem.minQty &&
                        product.qty <= priceRulesItem.maxQty
                      ) {
                        priceRules = priceRulesItem;
                      }
                    });
                  }
                }
                return {
                  ...product,
                  priceRules,
                } as models.CheckoutProductData;
              });
            return {
              ...seller,
              products,
            };
          },
        );

        const carts = cartsTemp.map((cart) => {
          return {
            sellerId: cart.sellerId,
            sellerName: cart.sellerName,
            products: cart.products,
          };
        });

        dispatch(
          Actions.checkoutProcess(contextDispatch, {
            data: {
              buyerName: stateCart.buyerAddress.data.buyerName,
              buyerAddress: {
                ...buyerAddress,
                longitude: buyerAddress.longitude.toString(),
                latitude: buyerAddress.latitude.toString(),
              },
              carts,
            },
          }),
        );
      }
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.checkoutReset(contextDispatch));
    },
  };
};
/** === EXPORT === */
export { useCheckoutAction };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: eryz (team)
 * createDate: 16022022
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
