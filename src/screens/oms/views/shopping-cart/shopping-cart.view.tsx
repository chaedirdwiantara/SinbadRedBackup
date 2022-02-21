/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT INTERNAL COMPONENT HERE === */
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartAddress } from './shopping-cart-address.view';
import { ShoppingCartFooter } from './shopping-cart-footer.view';
import { ShoppingCartProducts } from './shopping-cart-products.view';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import LoadingPage from '@core/components/LoadingPage';
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  goBack,
  useGetCartAction,
  useCartMasterAction,
  useCheckProductAction,
  useCheckSellerAction,
  useCheckStockAction,
  useCancelStockAction,
} from '../../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
import * as models from '@models';
/** === DUMMIES === */
// const dummyAddToCartPayload = {
//   productId: '53c9b0000000000000000000',
//   productName: 'SGM ANANDA 2 150 GR GRD 2.0',
//   categoryId: '33d2AB000000000000000000',
//   brandId: '33d200000000000000000000',
//   brandName: 'SGM',
//   productImageUrl:
//     'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/prod/catalogue-images/15515/image_1617790108395.png',
//   minQty: 3,
//   qty: 3,
//   isPriceAfterTax: true,
//   taxPercentage: 10,
//   lastUsedPrice: 13707.1,
//   price: 13707.1,
//   qtyPerBox: 40,
//   priceRules: [
//     {
//       minQty: 1,
//       maxQty: 10,
//       price: 13707.1,
//     },
//     {
//       minQty: 11,
//       maxQty: 20,
//       price: 12707.1,
//     },
//   ],
//   uomLabel: 'PCS',
//   warehouseId: 3,
//   sellerId: 1,
//   sellerName: 'Tigaraksa',
//   selected: true,
// };

// const dummyUpdateCartPayload = {
//   carts: [
//     {
//       sellerId: 1,
//       sellerName: 'Tigaraksa',
//       products: [
//         {
//           productId: '53c9b0000000000000000000',
//           warehouseId: 3,
//           categoryId: 'e3a76d0b-4aa9-4588-8bdd-2840236e5ec4',
//           brandId: '33d200000000000000000000',
//           productName: 'SGM ANANDA 2 150 GR GRD 2.0',
//           brandName: 'SGM',
//           minQty: 3,
//           qty: 3,
//           qtyPerBox: 40,
//           isPriceAfterTax: true,
//           taxPercentage: 10,
//           price: 13707.1,
//           uomLabel: 'PCS',
//           selected: true,
//           priceRules: [
//             {
//               minQty: 1,
//               maxQty: 10,
//               price: 13707.1,
//             },
//             {
//               minQty: 11,
//               maxQty: 20,
//               price: 12707.1,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  const [localCartMaster, setLocalCartMaster] = useState<models.CartMaster>();
  const [pageLoading, setPageLoading] = useState(true);
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const getCartAction = useGetCartAction();
  const cartMasterAction = useCartMasterAction();
  const checkProductAction = useCheckProductAction();
  const checkSellerAction = useCheckSellerAction();
  const checkStockAction = useCheckStockAction();
  const cancelStockAction = useCancelStockAction();
  /** === HOOKS === */
  /** => Did Mount */
  useEffect(() => {
    getCartAction.fetch(dispatchCart);
    checkProductAction.fetch(dispatchCart, {
      carts: [
        {
          productId: '53c9b0000000000000000000',
          warehouseId: 1,
        },
        {
          productId: '53c9b0000000000000000002',
          warehouseId: 2,
        },
      ],
    });
    checkSellerAction.fetch(dispatchCart, {
      sellerIds: [1, 2],
    });
    checkStockAction.fetch(dispatchCart, {
      cartId: 'qweqweqw',
      reserved: false,
      carts: [
        {
          productId: '53c9b0000000000000000000',
          warehouseId: 1,
        },
        {
          productId: '53c9b0000000000000000002',
          warehouseId: 1,
        },
      ],
    });
    cancelStockAction.fetch(dispatchCart);
  }, []);
  /** => after success fetch getCart, save data to redux */
  useEffect(() => {
    if (stateCart.get.data !== null) {
      cartMasterAction.setCartMaster(stateCart.get.data);
    }
  }, [stateCart.get.data]);
  /** => after success fetch checkProduct, merge data to redux */
  useEffect(() => {
    if (
      stateCart.checkProduct.data !== null &&
      stateCart.checkSeller.data !== null &&
      stateCart.checkStock.data !== null &&
      cartMasterAction.cartMaster.id !== ''
    ) {
      cartMasterAction.mergeCheckProduct(stateCart.checkProduct.data);
    }
  }, [cartMasterAction.cartMaster.id, stateCart.checkProduct.data]);
  /** => after success fetch checkSeller, merge data to redux */
  useEffect(() => {
    if (
      stateCart.checkProduct.data !== null &&
      stateCart.checkSeller.data !== null &&
      stateCart.checkStock.data !== null &&
      cartMasterAction.cartMaster.isCheckProductMerged
    ) {
      cartMasterAction.mergeCheckSeller(stateCart.checkSeller.data);
    }
  }, [
    cartMasterAction.cartMaster.isCheckProductMerged,
    stateCart.checkSeller.data,
  ]);
  /** => after success fetch checkStock, merge data to redux */
  useEffect(() => {
    if (
      stateCart.checkProduct.data !== null &&
      stateCart.checkSeller.data !== null &&
      stateCart.checkStock.data !== null &&
      cartMasterAction.cartMaster.isCheckSellerMerged
    ) {
      cartMasterAction.mergeCheckStock(stateCart.checkStock.data);
    }
  }, [
    cartMasterAction.cartMaster.isCheckSellerMerged,
    stateCart.checkStock.data,
  ]);
  /** => after success merge all check data to redux, save redux to local state */
  useEffect(() => {
    if (
      cartMasterAction.cartMaster.isCheckProductMerged &&
      cartMasterAction.cartMaster.isCheckSellerMerged &&
      cartMasterAction.cartMaster.isCheckStockMerged
    ) {
      setLocalCartMaster(cartMasterAction.cartMaster);
      setPageLoading(false);
    }
  }, [cartMasterAction.cartMaster]);
  console.log({
    cartMaster: cartMasterAction.cartMaster,
    stateCart,
    localCartMaster,
  });
  /** === VIEW === */
  /** => CONTENT */
  const renderContent = () => {
    if (localCartMaster && localCartMaster.id !== '') {
      return (
        <React.Fragment>
          <ScrollView>
            <View style={{ flex: 1 }}>
              <ShoppingCartAddress />
              <ShoppingCartProducts
                unavailableProducts={localCartMaster.unavailable}
                availableProducts={localCartMaster.sellers}
              />
            </View>
          </ScrollView>
          <ShoppingCartFooter
            onPressCheckout={() => cartMasterAction.reset()}
          />
        </React.Fragment>
      );
    }
  };
  /** => MAIN */
  return (
    <SnbContainer color="grey">
      <ShoppingCartHeader goBack={goBack} />
      {!pageLoading ? renderContent() : <LoadingPage />}
    </SnbContainer>
  );
};

export default OmsShoppingCartView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: ryan
 * updatedDate: 07022022
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
