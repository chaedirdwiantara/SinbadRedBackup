/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT INTERNAL COMPONENT HERE === */
import { ShoppingCartHeader } from './shopping-cart-header.view';
import { ShoppingCartAddress } from './shopping-cart-address.view';
import { ShoppingCartFooter } from './shopping-cart-footer.view';
import { ShoppingCartProducts } from './shopping-cart-products.view';
/** === IMPORT EXTERNAL COMPONENT HERE === */
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  goBack,
  // useCartExampleAction,
  // useGetCartAction,
  // useGetTotalCartAction,
  // useAddToCartAction,
  // useUpdateCartAction,
  // useRemoveCartProductAction,
  useCheckoutAction,
  useCartMasterAction,
  useCheckProductAction,
  useCheckSellerAction,
  useCheckStockAction,
  useCancelStockAction,
} from '../../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
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

const dummyCheckoutData = {
  buyerAddress: 'Jl. Raya',
  carts: [
    {
      sellerId: 1,
      sellerName: 'Tigaraksa',
      products: [
        {
          productId: '53c9b0000000000000000000',
          warehouseId: 3,
          categoryId: 'e3a76d0b-4aa9-4588-8bdd-2840236e5ec4',
          brandId: '33d200000000000000000000',
          productName: 'SGM ANANDA 2 150 GR GRD 2.0',
          brandName: 'SGM',
          minQty: 3,
          qty: 3,
          qtyPerBox: 40,
          isPriceAfterTax: true,
          taxPercentage: 10,
          lastUsedPrice: 13707.1,
          isLastPriceUsedRules: true,
          price: 13707.1,
          uomLabel: 'PCS',
          selected: true,
          priceRules: [
            {
              minQty: 1,
              maxQty: 10,
              price: 13707.1,
            },
            {
              minQty: 11,
              maxQty: 20,
              price: 12707.1,
            },
          ],
        },
      ],
    },
  ],
};

/** === COMPONENT === */
const OmsShoppingCartView: FC = () => {
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const { stateCheckout, dispatchCheckout } = React.useContext(
    contexts.CheckoutContext,
  );
  // const cartExampleAction = useCartExampleAction();
  // const getCartAction = useGetCartAction();
  // const getTotalCartAction = useGetTotalCartAction();
  // const addToCartAction = useAddToCartAction();
  // const updateCartAction = useUpdateCartAction();
  // const removeCartProductAction = useRemoveCartProductAction();
  const checkoutAction = useCheckoutAction();
  const cartMasterAction = useCartMasterAction();
  const checkProductAction = useCheckProductAction();
  const checkSellerAction = useCheckSellerAction();
  const checkStockAction = useCheckStockAction();
  const cancelStockAction = useCancelStockAction();
  /** === HOOKS === */
  /** => Did Mount */
  useEffect(() => {
    // cartExampleAction.fetch(dispatchCart);
    // getCartAction.fetch(dispatchCart);
    // getTotalCartAction.fetch(dispatchCart);
    // addToCartAction.fetch(dispatchCart, dummyAddToCartPayload);
    // updateCartAction.fetch(dispatchCart, {
    //   carts: dummyUpdateCartPayload.carts,
    //   id: 'e3a76d0b-4aa9-4588-8bdd-2840236e5ec4',
    // });
    // removeCartProductAction.fetch(dispatchCart, {
    //   cartId: cartMasterAction.cartMaster.id,
    //   removedProducts: [
    //     {
    //       productId: '53c9b0000000000000000000',
    //       warehouseId: 1,
    //     },
    //     {
    //       productId: '53c9b0000000000000000002',
    //       warehouseId: 2,
    //     },
    //   ],
    // });
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
    checkoutAction.fetch(dispatchCheckout, dummyCheckoutData);
    checkSellerAction.fetch(dispatchCart, {
      sellerIds: [1, 2],
    });
    checkStockAction.fetch(dispatchCart, {
      reserved: true,
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
  console.log({
    cartMaster: cartMasterAction.cartMaster,
    stateCheckout,
    stateCart,
  });
  /** === VIEW === */
  /** => Main */
  return (
    <SnbContainer color="grey">
      <ShoppingCartHeader goBack={goBack} />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <ShoppingCartAddress />
          <ShoppingCartProducts />
        </View>
      </ScrollView>
      <ShoppingCartFooter onPressCheckout={() => cartMasterAction.reset()} />
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
