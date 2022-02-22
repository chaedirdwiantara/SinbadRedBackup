/** === IMPORT PACKAGE HERE ===  */
import {
  useCartMasterAction,
  useCheckProductAction,
  useCheckSellerAction,
  useCheckStockAction,
  useUpdateCartAction,
} from '@screen/oms/functions';
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { SnbText, SnbButton, color } from 'react-native-sinbad-ui';
import { contexts } from '@contexts';

const dummyUpdatePayload = {
  carts: [
    {
      sellerId: 1,
      sellerName: 'Seller 1',
      products: [
        {
          productId: 'bd1abe44-87be-11ec-a8a3-0242ac120002',
          warehouseId: 1,
          categoryId: 'e3a76d0b-4aa9-4588-8bdd-2840236e5ec4',
          productImageUrl:
            'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/prod/catalogue-images/15515/image_1617790108395.png',
          brandId: '33d200000000000000000000',
          brandName: 'SGM',
          productName: 'SGM Ananda 1',
          qty: 1,
          minQty: 10,
          qtyPerBox: 40,
          uomLabel: 'Kardus',
          isPriceAfterTax: true,
          taxPercentage: 5.5,
          lastUsedPrice: 10000,
          isLastPriceUsedRules: true,
          price: 35000,
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
          selected: true,
        },
      ],
    },
  ],
};

/** === INTERFACE === */
interface FooterProps {
  onPressCheckout: () => void;
}
/** === COMPONENT ===  */
export const ShoppingCartFooter: FC<FooterProps> = ({ onPressCheckout }) => {
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);

  const updateCartAction = useUpdateCartAction();
  const cartMasterAction = useCartMasterAction();
  const checkProductAction = useCheckProductAction();
  const checkSellerAction = useCheckSellerAction();
  const checkStockAction = useCheckStockAction();

  const handleOnPressCheckout = () => {
    onPressCheckout();
    updateCartAction.fetch(dispatchCart, {
      id: 'bd1abe44-87be-11ec-a8a3-0242ac120002',
      carts: dummyUpdatePayload.carts,
    });
  };

  useEffect(() => {
    if (stateCart.update.data) {
      const carts =
        cartMasterAction.cartMaster.sellers.flatMap((seller) =>
          seller.products.map((product) => ({
            productId: product.productId,
            warehouseId: product.warehouseId,
          })),
        ) ?? [];
      const sellerIds =
        cartMasterAction.cartMaster.sellers.map((seller) => seller.sellerId) ??
        [];

      console.log({ carts, sellerIds });

      /** Input product(s) that's been selected and available as payload */
      checkProductAction.fetch(dispatchCart, {
        carts,
      });
      checkSellerAction.fetch(dispatchCart, {
        sellerIds,
      });
      checkStockAction.fetch(dispatchCart, {
        cartId: cartMasterAction.cartMaster.id,
        reserved: true,
        carts,
      });
    }
  }, [stateCart.update.data]);

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: color.white,
        justifyContent: 'flex-end',
        elevation: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SnbText.B2 color={color.black60}>Total: </SnbText.B2>
            <SnbText.H4 color={color.red50}>Rp0</SnbText.H4>
          </View>
          <SnbText.B4 color={color.black60}>0 barang dipilih</SnbText.B4>
        </View>
        <View>
          <SnbButton.Dynamic
            title="Checkout"
            type="primary"
            onPress={handleOnPressCheckout}
            size={'large'}
          />
        </View>
      </View>
    </View>
  );
};
