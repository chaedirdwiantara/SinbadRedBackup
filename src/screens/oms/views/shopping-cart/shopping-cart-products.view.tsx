/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { colorV2, SnbCheckbox2, SnbText2 } from 'react-native-sinbad-ui';
import { ICheckbox } from '@sinbad/react-native-sinbad-ui/lib/typescript/models/CheckboxTypes';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ProductAvailableSection } from './product-available-section.view';
import { ProductNotAvailableSection } from './product-not-available-section.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import * as models from '@models';
import { ShoppingCartStyles } from '@screen/oms/styles';
/** === INTERFACES === */
interface ShoppingCartProductsProps {
  availableProducts: models.CartMasterSellers[];
  unavailableProducts: models.CartMasterUnavailable[];
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
  isAnyActiveProduct: () => boolean;
  manageCheckboxStatus: ({ sellerId }: models.ManageCheckbox) => ICheckbox;
  manageCheckboxOnPress: ({
    sellerId,
    currentStatus,
  }: models.ManageCheckbox) => void;
  keyboardFocus: { isFocus: boolean; setFocus: (val: boolean) => void };
  handleScrollToBottom: () => void;
  testID: string;
}
/** === COMPONENT === */
export const ShoppingCartProducts: FC<ShoppingCartProductsProps> = ({
  availableProducts,
  unavailableProducts,
  handleRemoveProductModal,
  handleUpdateQty,
  handleUpdateSelected,
  isAnyActiveProduct,
  manageCheckboxStatus,
  manageCheckboxOnPress,
  keyboardFocus,
  handleScrollToBottom,
  testID,
}) => {
  const allSellerCheckboxStatus = manageCheckboxStatus({ sellerId: null });
  /** === HOOKS === */
  /** === VIEW === */
  /** => MAIN */
  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      {isAnyActiveProduct() ? (
        <View
          style={{
            ...ShoppingCartStyles.cardContainer,
            flexDirection: 'row',
            paddingVertical: 16,
          }}>
          <View style={{ marginRight: 16 }}>
            <SnbCheckbox2
              testID={`checkbox.checkAll.productContainer.${testID}`}
              checked={allSellerCheckboxStatus === 'selected'}
              indeterminate={allSellerCheckboxStatus === 'indeterminate'}
              onChange={() => {
                manageCheckboxOnPress({
                  sellerId: null,
                  currentStatus: allSellerCheckboxStatus,
                });
              }}
            />
          </View>
          <SnbText2.Body.Small
            testID={`checkbox.checkAll.productContainer.${testID}`}
            color={colorV2.textColor.default}>
            Pilih Semua
          </SnbText2.Body.Small>
        </View>
      ) : (
        <View />
      )}
      <ProductAvailableSection
        testID={`available.productContainer.${testID}`}
        availableProducts={availableProducts}
        handleRemoveProductModal={handleRemoveProductModal}
        handleUpdateQty={handleUpdateQty}
        handleUpdateSelected={handleUpdateSelected}
        manageCheckboxStatus={manageCheckboxStatus}
        manageCheckboxOnPress={manageCheckboxOnPress}
        keyboardFocus={keyboardFocus}
      />
      <ProductNotAvailableSection
        testID={`unavailable.productContainer.${testID}`}
        unavailableProducts={unavailableProducts}
        handleRemoveProductModal={handleRemoveProductModal}
        handleScrollToBottom={handleScrollToBottom}
      />
    </View>
  );
};
