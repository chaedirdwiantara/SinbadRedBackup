/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SnbText, SnbCheckbox, SnbIcon, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ShoppingCartStyles } from '@screen/oms/styles';
import * as models from '@models';

interface ProductUnavailableViewProps {
  unavailableProducts: models.CartMasterUnavailable[];
  handleRemoveProductModal: (params: models.HandleRemoveProduct) => void;
}

export const ProductUnavailableView: FC<ProductUnavailableViewProps> = ({
  unavailableProducts,
  handleRemoveProductModal,
}) => {
  /** => PRODUCT IMAGE */
  const renderProductImage = (imageUrl: string) => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={ShoppingCartStyles.productImg}
        />
      </View>
    );
  };
  /** => ACTION SECTION */
  const renderActionSection = (product: models.CartMasterUnavailable) => {
    return (
      <View style={ShoppingCartStyles.unavailableActionContainer}>
        <TouchableOpacity onPress={() => {}}>
          <SnbText.B4 color={color.blue50}>Cari Produk Sejenis</SnbText.B4>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const removedProducts: models.RemovedProducts[] = [];
            removedProducts.push({
              productId: product.productId,
              warehouseId: product.warehouseId,
            });
            handleRemoveProductModal({
              source: 'unavailable',
              removedProducts,
            });
          }}>
          <SnbIcon name="delete_outline" color={color.black80} size={32} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <React.Fragment>
      {unavailableProducts.map((item) => {
        return (
          <View
            key={`${item.productId}.${item.sellerId}`}
            style={ShoppingCartStyles.horizontalCardContent}>
            <View style={{ flexDirection: 'row' }}>
              <View style={ShoppingCartStyles.checkboxContainer}>
                <SnbCheckbox
                  disabled={true}
                  status={'unselect'}
                  onPress={() => {}}
                />
              </View>
              {renderProductImage(item.productImageUrl)}
              <View style={{ justifyContent: 'center' }}>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <SnbText.B4 color={color.black60}>
                    {item.productName}
                  </SnbText.B4>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <SnbText.B4 color={color.black80}>{item.status}</SnbText.B4>
                </View>
              </View>
            </View>
            {renderActionSection(item)}
          </View>
        );
      })}
    </React.Fragment>
  );
};
