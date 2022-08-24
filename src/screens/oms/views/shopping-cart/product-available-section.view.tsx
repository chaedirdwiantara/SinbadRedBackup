/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbCheckbox2, SnbText2 } from 'react-native-sinbad-ui';
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
  testID: string;
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
  testID,
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
                  <SnbCheckbox2
                    testID={`checkbox.seller${item.sellerId}.${testID}`}
                    checked={thisSellerCheckboxStatus === 'selected'}
                    indeterminate={thisSellerCheckboxStatus === 'indeterminate'}
                    onChange={() => {
                      manageCheckboxOnPress({
                        sellerId: item.sellerId,
                        currentStatus: thisSellerCheckboxStatus,
                      });
                    }}
                  />
                </View>
                <SnbText2.Headline.Small
                  testID={`sellerName.seller${item.sellerId}.${testID}`}>
                  {item.sellerName}
                </SnbText2.Headline.Small>
              </View>
              {item.products.map((product) => (
                <View
                  key={`${product.productId}.${product.sellerId}.${product.warehouseId}`}
                  style={{ ...ShoppingCartStyles.cardContainer, marginTop: 0 }}>
                  <ProductView
                    testID={testID}
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
