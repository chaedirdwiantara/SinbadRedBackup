/** === IMPORT PACKAGES ===  */
import React, { FC, useReducer } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  SnbBottomSheet,
  SnbText,
  color,
  SnbButton,
  SnbIcon,
  SnbToolTips,
  styles,
  SnbNumberCounter,
} from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS ===  */
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { toCurrency } from '@core/functions/global/currency-format';
import { useShopingCartContext } from 'src/data/contexts/oms/shoping-cart/useShopingCartContext';
import { useStockContext } from 'src/data/contexts/product/stock/useStockContext';
/** === IMPORT STYLE ===  */
import { AddToCartModalStyle } from '../../../styles';
import { PromoSection } from './PromoSection';
/** === TYPE ===  */
interface AddToCartModalProps {
  open: boolean;
  closeAction: () => void;
  onAddToCartPress: () => void;
  orderQty: number;
  increaseOrderQty: () => void;
  decreaseOrderQty: () => void;
}
/** === COMPONENT ===  */
const AddToCartModal: FC<AddToCartModalProps> = ({
  open,
  closeAction,
  onAddToCartPress,
  orderQty,
  increaseOrderQty,
  decreaseOrderQty,
}) => {
  /** === HOOKS ===  */
  const {
    stateProduct: {
      detail: { data: dataProductDetail },
    },
  } = useProductContext();
  const {
    stateShopingCart: {
      create: { loading: addToCartLoading },
    },
  } = useShopingCartContext();
  const {
    stateStock: {
      validation: { data: dataStock, error: errorStock },
    },
  } = useStockContext();
  const [tooltipVisible, toggleTooltipVisible] = useReducer(
    (prevVisible) => !prevVisible,
    false,
  );

  /** === VIEW ===  */
  /** => Quantity Modifier */
  const renderQuantityModifier = () => (
    <View style={AddToCartModalStyle.quantityModifierContainer}>
      <SnbText.C1 color={color.black60}>Jumlah/pcs</SnbText.C1>
      {dataStock && dataProductDetail && (
        <SnbNumberCounter
          value={orderQty}
          onIncrease={increaseOrderQty}
          onDecrease={decreaseOrderQty}
          minusDisabled={orderQty <= dataProductDetail?.minQty}
          plusDisabled={orderQty >= dataStock?.stock}
        />
      )}
    </View>
  );
  /** => Promo List */
  const renderPromoList = () => {
    return <PromoSection />;
  };
  /** => Exclusive Tag */
  const renderExclusiveTag = () => {
    return (
      dataProductDetail?.isExclusive && (
        <View style={AddToCartModalStyle.exclusiveTagContainer}>
          <SnbIcon
            name="stars"
            color={color.yellow50}
            size={18}
            style={{ marginRight: 4 }}
          />
          <SnbText.C1 color={color.yellow50}>Exclusive</SnbText.C1>
        </View>
      )
    );
  };
  /** => Product Data */
  const renderProductData = () => (
    <View style={AddToCartModalStyle.mainContentContainer}>
      <Image
        source={{ uri: dataProductDetail?.images[0].url }}
        style={AddToCartModalStyle.image}
      />
      <View style={{ marginLeft: 16 }}>
        {renderExclusiveTag()}
        <SnbText.C1>{dataProductDetail?.name}</SnbText.C1>
        <View style={AddToCartModalStyle.priceContainer}>
          <View style={{ marginRight: 8 }}>
            <SnbText.B3 color={color.red50}>
              {toCurrency(dataProductDetail?.finalPrice ?? 0, {
                withFraction: false,
              })}
            </SnbText.B3>
          </View>
          <TouchableOpacity onPress={toggleTooltipVisible}>
            <SnbIcon name="help" color={color.black40} size={18} />
          </TouchableOpacity>
          <View style={AddToCartModalStyle.tooltipContainer}>
            <SnbToolTips
              show={tooltipVisible}
              tips="Bottom"
              content={
                <SnbText.C3 color={color.white}>
                  Harga ini mungkin berubah mempertimbangkan lokasi gudang
                </SnbText.C3>
              }
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <SnbText.C1>
            per-Dus {`${dataProductDetail?.packagedQty} Pcs`}
          </SnbText.C1>
          <View style={AddToCartModalStyle.lineSeparator} />
          <SnbText.C1>
            min.pembelian{' '}
            {`${dataProductDetail?.minQty} ${dataProductDetail?.unit}`}
          </SnbText.C1>
        </View>
      </View>
    </View>
  );
  /** => Footer */
  const renderFooter = () => (
    <View style={[AddToCartModalStyle.footer, styles.shadowStyle]}>
      <View style={{ marginRight: 16 }}>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <SnbText.B3>Total: </SnbText.B3>
          <SnbText.B4 color={color.red50}>
            {toCurrency(dataProductDetail?.finalPrice ?? 0 * orderQty, {
              withFraction: false,
            })}
          </SnbText.B4>
        </View>
        <SnbText.C1 color={color.yellow40}>Belum termasuk PPN 10%</SnbText.C1>
      </View>
      <SnbButton.Dynamic
        loading={addToCartLoading}
        disabled={dataStock === null}
        size="small"
        type="primary"
        title={errorStock ? 'Stock Habis' : 'Tambah ke Keranjang'}
        radius={6}
        onPress={onAddToCartPress}
      />
    </View>
  );
  /** => Content */
  const renderContent = () => (
    <View>
      {renderProductData()}
      {renderPromoList()}
      {renderQuantityModifier()}
      {renderFooter()}
    </View>
  );
  /** => Main */
  return (
    <SnbBottomSheet
      open={open}
      title="Masukan Jumlah"
      actionIcon="close"
      closeAction={closeAction}
      content={renderContent()}
    />
  );
};

export default AddToCartModal;
