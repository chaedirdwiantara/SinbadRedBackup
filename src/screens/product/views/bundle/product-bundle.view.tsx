/** === IMPORT PACKAGES ===  */
import React, { FC, useState } from 'react';
import { View, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbNumberCounter,
  color,
} from '@sinbad/react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { Accordion } from '@core/components/Accordion';
import { HorizontalGridLayout } from '@core/components/product/HorizontalGridLayout';
import { ActionButton } from '../detail/ActionButton';
import { PromoSuggestion } from './PromoSuggestion';
import { SectionTitle } from './SectionTitle';
import { ProductBundleMainInfo } from './ProductBundleMainInfo';
/** === IMPORT FUNCTIONS === */
import { useProductContext } from 'src/data/contexts/product';
import {
  goBack,
  goToShoppingCart,
  useOrderQuantity,
  useProductListActions,
} from '../../functions';
/** === IMPORT STYLE === */
import { ProductBundleStyle } from '../../styles';
/** === DUMMY === */
const otherPropertiesDummy = {
  affiliatedPromos: [
    { name: 'Fist of many', description: 'OMG it is so cheap!' },
    { name: 'God bless', description: '3 in 1. Come again?!' },
    {
      name: 'New world',
      description: 'You will never see a bonus like this again.',
    },
  ],
};
/** === COMPONENT === */
const ProductBundleView: FC = () => {
  /** === HOOKS === */
  const {
    stateProduct: {
      list: productListState,
      detail: { data: productDetailContext },
    },
    dispatchProduct,
  } = useProductContext();
  const [productDetail] = useState(productDetailContext);
  const { orderQty, increaseOrderQty, decreaseOrderQty } = useOrderQuantity({
    minQty: productDetail?.minQty,
  });
  const { loadMore } = useProductListActions();
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type5
        title="Bundle"
        backAction={goBack}
        type="red"
        iconName="cart"
        iconAction={goToShoppingCart}
        iconValue={100}
      />
      <ScrollView>
        <PromoSuggestion />
        <ProductBundleMainInfo
          imageUrl={productDetail?.images[0].url}
          isExclusive={productDetail?.isExclusive!}
          name={productDetail?.name!}
          currentPrice={productDetail?.currentPrice!}
          packagedQty={productDetail?.packagedQty!}
          minQty={productDetail?.minQty!}
          minQtyType={productDetail?.minQtyType!}
        />
        <View style={ProductBundleStyle.quantityModifierContainer}>
          <SnbText.C1 color={color.black60}>Jumlah/pcs</SnbText.C1>
          <SnbNumberCounter
            value={orderQty}
            onIncrease={increaseOrderQty}
            onDecrease={decreaseOrderQty}
            minusDisabled={orderQty === productDetail?.minQty}
          />
        </View>
        <SectionTitle title="PRODUK TERKAIT" />
        <HorizontalGridLayout
          data={productListState.data}
          loading={productListState.loading}
          withOrderButton={true}
          // onEndReached={() =>
          //   loadMore(dispatchProduct, {
          //     skip: productListState.skip,
          //     canLoadMore: productListState.canLoadMore,
          //   })
          // }
        />
        <SectionTitle title="PROMO TERKAIT" />
        <View style={{ marginBottom: 16 }}>
          <Accordion data={otherPropertiesDummy.affiliatedPromos} />
        </View>
      </ScrollView>
      <ActionButton
        disabled={false}
        title="Tambah ke Keranjang"
        onPress={() => null}
      />
    </SnbContainer>
  );
};

export default ProductBundleView;
