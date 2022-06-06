/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbCheckbox2, SnbText2, colorV2 } from 'react-native-sinbad-ui';
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
          <SnbText2.Body.Small color={colorV2.textColor.default}>
            Pilih Semua
          </SnbText2.Body.Small>
        </View>
      ) : (
        <View />
      )}
      <ProductAvailableSection
        availableProducts={availableProducts}
        handleRemoveProductModal={handleRemoveProductModal}
        handleUpdateQty={handleUpdateQty}
        handleUpdateSelected={handleUpdateSelected}
        manageCheckboxStatus={manageCheckboxStatus}
        manageCheckboxOnPress={manageCheckboxOnPress}
        keyboardFocus={keyboardFocus}
      />
      <ProductNotAvailableSection
        unavailableProducts={unavailableProducts}
        handleRemoveProductModal={handleRemoveProductModal}
        handleScrollToBottom={handleScrollToBottom}
      />
    </View>
  );
};
