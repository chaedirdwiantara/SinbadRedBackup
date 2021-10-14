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
import { toCurrency } from '@core/functions/global/currency-format';
import { useOrderQuantity } from '@screen/product/functions';
/** === IMPORT STYLE ===  */
import { AddToCartModalStyle } from '../styles';
/** === TYPE ===  */
interface AddToCartModalProps {
  open: boolean;
  closeAction: () => void;
  onAddToCartPress: () => void;
}
/** === DUMMY ===  */
const productDetailDummy = {
  id: '1',
  name: 'LAKME CC CREAM ALMOND',
  imageUrl:
    'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
  price: 77891,
  packagedQty: 5,
  minQty: 1,
  uom: 'Pcs',
  isExclusive: false,
  promoList: [
    {
      shortDescription:
        'Setiap pembelian produk Mamy poko & Charm sebesar 2jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 1%.\nSetiap pembelian di atas 5jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 2%',
    },
    {
      shortDescription:
        'Setiap pembelian produk Mamy poko & Charm sebesar 10jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 3%.',
    },
  ],
};
/** === CONSTANT ===  */
const { height } = Dimensions.get('window');
/** === COMPONENT ===  */
export const AddToCartModal: FC<AddToCartModalProps> = ({
  open,
  closeAction,
  onAddToCartPress,
}) => {
  /** === HOOKS ===  */
  const { orderQty, increaseOrderQty, decreaseOrderQty } = useOrderQuantity({
    minQty: productDetailDummy.minQty,
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
        minusDisabled={orderQty === productDetailDummy.minQty}
      />
    </View>
  );
  /** => Promo List */
  const renderPromoList = () => {
    return (
      productDetailDummy.promoList.length > 0 && (
        <View style={{ paddingHorizontal: 16 }}>
          <SnbText.C1 color={color.black60}>Promo</SnbText.C1>
          <View style={{ marginTop: 8, marginBottom: 16 }}>
            <SnbText.C1>Anda berpotensi mendapatkan Promo</SnbText.C1>
          </View>
          <View style={{ height: height * 0.15 }}>
            <ScrollView>
              {productDetailDummy.promoList.map((promo, promoIndex) => (
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
      productDetailDummy.isExclusive && (
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
        source={{ uri: productDetailDummy.imageUrl }}
        style={AddToCartModalStyle.image}
      />
      <View style={{ marginLeft: 16 }}>
        {renderExclusiveTag()}
        <SnbText.C1>{productDetailDummy.name}</SnbText.C1>
        <View style={AddToCartModalStyle.priceContainer}>
          <View style={{ marginRight: 8 }}>
            <SnbText.B3 color={color.red50}>
              {toCurrency(productDetailDummy.price, { withFraction: false })}
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
            {`${productDetailDummy.packagedQty} ${productDetailDummy.uom}`}
          </SnbText.C1>
          <View style={AddToCartModalStyle.lineSeparator} />
          <SnbText.C1>
            min.pembelian{' '}
            {`${productDetailDummy.minQty} ${productDetailDummy.uom}`}
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
            {toCurrency(productDetailDummy.price * orderQty, {
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
