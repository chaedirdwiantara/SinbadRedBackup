/** === IMPORT PACKAGES ===  */
import React, { FC, useReducer } from 'react';
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
import { useOrderQuantity } from '@screen/product/functions';
/** === IMPORT STYLE ===  */
import { AddToCartModalStyle } from '../../../styles';
/** === TYPE ===  */
interface AddToCartModalProps {
  open: boolean;
  closeAction: () => void;
  onAddToCartPress: () => void;
}
/** === CONSTANT ===  */
const { height } = Dimensions.get('window');
/** === COMPONENT ===  */
const AddToCartModal: FC<AddToCartModalProps> = ({
  open,
  closeAction,
  onAddToCartPress,
}) => {
  /** === HOOKS ===  */
  const {
    stateProduct: { detail: productDetailState },
  } = useProductContext();
  const { orderQty, increaseOrderQty, decreaseOrderQty } = useOrderQuantity({
    minQty: productDetailState?.data?.minQty,
  });
  const [tooltipVisible, toggleTooltipVisible] = useReducer(
    (prevVisible) => !prevVisible,
    false,
  );
  /** === VIEW ===  */
  /** => Quantity Modifier */
  const renderQuantityModifier = () => (
    <View style={AddToCartModalStyle.quantityModifierContainer}>
      <SnbText.C1 color={color.black60}>Jumlah/pcs</SnbText.C1>
      <SnbNumberCounter
        value={orderQty}
        onIncrease={increaseOrderQty}
        onDecrease={decreaseOrderQty}
        minusDisabled={orderQty === productDetailState?.data?.minQty}
      />
    </View>
  );
  /** => Promo List */
  const renderPromoList = () => {
    return (
      productDetailState?.data !== null &&
      productDetailState?.data?.promoList.length > 0 && (
        <View style={{ paddingHorizontal: 16 }}>
          <SnbText.C1 color={color.black60}>Promo</SnbText.C1>
          <View style={{ marginTop: 8, marginBottom: 16 }}>
            <SnbText.C1>Anda berpotensi mendapatkan Promo</SnbText.C1>
          </View>
          <View style={{ height: height * 0.15 }}>
            <ScrollView>
              {productDetailState.data.promoList.length > 0 &&
                productDetailState.data.promoList.map((promo, promoIndex) => (
                  <View key={promoIndex} style={{ marginBottom: 8 }}>
                    <SnbText.C1>{promo.shortDescription}</SnbText.C1>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      )
    );
  };
  /** => Exclusive Tag */
  const renderExclusiveTag = () => {
    return (
      productDetailState?.data?.isExclusive && (
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
        source={{ uri: productDetailState?.data?.images[0].url }}
        style={AddToCartModalStyle.image}
      />
      <View style={{ marginLeft: 16 }}>
        {renderExclusiveTag()}
        <SnbText.C1>{productDetailState?.data?.name}</SnbText.C1>
        <View style={AddToCartModalStyle.priceContainer}>
          <View style={{ marginRight: 8 }}>
            <SnbText.B3 color={color.red50}>
              {toCurrency(productDetailState?.data?.price ?? 0, {
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
            per-Dus{' '}
            {`${productDetailState?.data?.packagedQty} ${productDetailState?.data?.minQtyType}`}
          </SnbText.C1>
          <View style={AddToCartModalStyle.lineSeparator} />
          <SnbText.C1>
            min.pembelian{' '}
            {`${productDetailState?.data?.minQty} ${productDetailState?.data?.minQtyType}`}
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
            {toCurrency(productDetailState?.data?.price ?? 0 * orderQty, {
              withFraction: false,
            })}
          </SnbText.B4>
        </View>
        <SnbText.C1 color={color.yellow40}>Belum termasuk PPN 10%</SnbText.C1>
      </View>
      <SnbButton.Dynamic
        size="small"
        type="primary"
        title="Tambah ke Keranjang"
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
      action
      actionIcon="close"
      closeAction={closeAction}
      content={renderContent()}
    />
  );
};

export default AddToCartModal;
