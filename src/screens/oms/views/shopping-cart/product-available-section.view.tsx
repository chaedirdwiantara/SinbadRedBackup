/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbCheckbox, SnbText, color } from 'react-native-sinbad-ui';
import { ICheckbox } from '@sinbad/react-native-sinbad-ui/lib/typescript/models/CheckboxTypes';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ProductView } from './product.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import * as models from '@models';
import { ShoppingCartStyles } from '@screen/oms/styles';
/** === INTERFACES === */
interface ProductAvailableSectionProps {
  availableProducts: models.CartMasterSellers[];
  handleRemoveProductModal: (params: models.HandleRemoveProduct) => void;
  handleUpdateQty: ({
    productId,
    sellerId,
    warehouseId,
    type,
  }: models.UpdateCartQty) => void;
  handleUpdateSelected: ({
    productId,
    sellerId,
    warehouseId,
  }: models.ProductKeyObject) => void;
  manageCheckboxStatus: ({ sellerId }: models.ManageCheckbox) => ICheckbox;
  manageCheckboxOnPress: ({
    sellerId,
    currentStatus,
  }: models.ManageCheckbox) => void;
  keyboardFocus: { isFocus: boolean; setFocus: (val: boolean) => void };
}
/** === COMPONENT === */
export const ProductAvailableSection: FC<ProductAvailableSectionProps> = ({
  availableProducts,
  handleRemoveProductModal,
  handleUpdateQty,
  handleUpdateSelected,
  manageCheckboxStatus,
  manageCheckboxOnPress,
  keyboardFocus,
}) => {
  /** === HOOKS === */
  /** === VIEW === */
  /** => MAIN */
  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      {availableProducts.map((item) => {
        if (item.products.length !== 0) {
          const thisSellerCheckboxStatus = manageCheckboxStatus({
            sellerId: item.sellerId,
          });
          return (
            <View key={item.sellerId}>
              <View style={ShoppingCartStyles.sellerContainer}>
                <View style={{ marginRight: 16 }}>
                  <SnbCheckbox
                    status={thisSellerCheckboxStatus}
                    onPress={() => {
                      manageCheckboxOnPress({
                        sellerId: item.sellerId,
                        currentStatus: thisSellerCheckboxStatus,
                      });
                    }}
                  />
                </View>
                <SnbText.B4 color={color.black100}>
                  {item.sellerName}
                </SnbText.B4>
              </View>
              {item.products.map((product) => (
                <View
                  key={`${product.productId}.${product.sellerId}`}
                  style={{ ...ShoppingCartStyles.cardContainer, marginTop: 0 }}>
                  <ProductView
                    product={product}
                    handleRemoveProductModal={handleRemoveProductModal}
                    handleUpdateQty={handleUpdateQty}
                    handleUpdateSelected={handleUpdateSelected}
                    keyboardFocus={keyboardFocus}
                  />
                </View>
              ))}
            </View>
          );
        }
      })}
    </View>
  );
};
