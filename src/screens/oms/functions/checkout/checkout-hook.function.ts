/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
import { useContext } from 'react';
import { useDataCartMaster } from '@core/redux/Data';
/** === FUNCTION === */
/** => checkout action */
const useCheckoutAction = () => {
  const { stateCart } = useContext(contexts.CartContext);
  const cartMaster: models.CartMaster = useDataCartMaster();
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      if (
        stateCart.postCheckProduct.data !== null &&
        stateCart.postCheckSeller.data !== null &&
        stateCart.postCheckStock.data !== null &&
        stateCart.buyerAddress.data !== null
      ) {
        dispatch(
          Actions.checkoutProcess(contextDispatch, {
            data: {
              buyerName: stateCart.buyerAddress.data.buyerName,
              buyerAddress: stateCart.buyerAddress.data,
              carts: cartMaster.sellers,
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
