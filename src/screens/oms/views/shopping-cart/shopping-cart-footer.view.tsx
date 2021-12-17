/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbCheckbox, SnbButton, color } from 'react-native-sinbad-ui';
import { toCurrency } from '../../../../../core/functions/global/currency-format';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ShoppingCartVoucherTag } from './shopping-cart-voucher-tag.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import {
  handleAllSelectedProductsChange,
  getTotalPrice,
} from '../../functions';
import { ShoppingCartStyles } from '../../styles';
import { CartInvoiceGroup } from '@models';
/** === TYPE ===  */
interface ShoppingCartFooterProps {
  allProductsSelected: boolean;
  invoiceGroups: CartInvoiceGroup[];
  setInvoiceGroups: (any: any) => void;
  setProductSelectedCount: (any: any) => void;
  setAllProductsSelected: (any: any) => void;
  totalProducts: any;
  productSelectedCount: number;
  openModalCheckout: (any: any) => void;
}
/** === COMPONENT === */
export const ShoppingCartFooter: FC<ShoppingCartFooterProps> = ({
  allProductsSelected,
  invoiceGroups,
  setInvoiceGroups,
  setProductSelectedCount,
  setAllProductsSelected,
  totalProducts,
  productSelectedCount,
  openModalCheckout,
}) => {
  return (
    <View style={ShoppingCartStyles.footerContainer}>
      <ShoppingCartVoucherTag />
      <View style={ShoppingCartStyles.footerBody}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <SnbCheckbox
            status={allProductsSelected ? 'selected' : 'unselect'}
            onPress={() =>
              handleAllSelectedProductsChange(
                allProductsSelected === false ? true : false,
                [invoiceGroups, setInvoiceGroups],
                setProductSelectedCount,
                setAllProductsSelected,
                totalProducts,
              )
            }
          />
          <View style={{ marginLeft: 10 }}>
            <SnbText.B3>Pilih Semua</SnbText.B3>
          </View>
        </View>
        <View style={{ flexDirection: 'row', minWidth: '50%' }}>
          <View style={{ marginRight: 10, alignItems: 'flex-end' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 4,
              }}>
              <View style={{ marginRight: 6 }}>
                <SnbText.B3>Total:</SnbText.B3>
              </View>
              <SnbText.B2 color={color.red50}>
                {toCurrency(getTotalPrice(invoiceGroups), {
                  withFraction: false,
                })}
              </SnbText.B2>
            </View>
            <SnbText.C1>{`${productSelectedCount} barang dipilih`}</SnbText.C1>
          </View>
          <SnbButton.Dynamic
            disabled={productSelectedCount <= 0}
            type="primary"
            title="Checkout"
            size="small"
            onPress={() => openModalCheckout(true)}
          />
        </View>
      </View>
    </View>
  );
};
