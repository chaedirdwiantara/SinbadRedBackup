/** === IMPORT PACKAGES ===  */
import React, { FC, useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SnbContainer, SnbTopNav } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { Accordion } from '@core/components/Accordion';
import { HorizontalProductGridLayout } from '@core/components/product/HorizontalProductGridLayout';
import { ActionButton } from '../detail/ActionButton';
import { PromoSuggestion } from './PromoSuggestion';
import { SectionTitle } from './SectionTitle';
import { ProductBundleMainInfo } from './ProductBundleMainInfo';
import { QuantityModifier } from './QuantityModifier';
/** === IMPORT FUNCTIONS === */
import { NavigationAction } from '@core/functions/navigation';
import { useProductContext } from 'src/data/contexts/product';
import {
  goBackFromBundleToDetail,
  goToShoppingCart,
  useOrderQuantity,
  useProductDetailAction,
} from '../../functions';
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
    params: { id: productId },
  } = NavigationAction.useGetNavParams();
  const [currentProductId, setCurrentProductId] = useState(productId);
  const {
    stateProduct: {
      list: productListState, // Temporarily used as related products state, will be changed later.
      detail: { data: productDetail, loading: productDetailLoading },
    },
    dispatchProduct,
  } = useProductContext();
  const { orderQty, onChangeQty, increaseOrderQty, decreaseOrderQty } =
    useOrderQuantity({
      minQty: productDetail?.minQty ?? 1,
    });
  const { fetch } = useProductDetailAction();

  useEffect(() => {
    // Will not fetch on mount. Will only fetch when one of the related products is pressed,
    // which will change the currentProductId state.
    if (currentProductId !== productId) {
      fetch(dispatchProduct, currentProductId);

      // Other fetch process are as follows:
      // Hit I and II at the same time (Endpoint names still needs confirmation).

      // I. Products Related
      // 1. Fetch from /product-cross-selling/${currentProductId}
      // 2. Array of Ids got from the first step is used as a payload to hit POST to /pdp-by-id
      // 3. Id got from the previous POST request will be used to fetch the real data from /pdp-by-id/${id}

      // II. Promos Related
      // 1. Fetch from /promo-cross-selling/${currentProductId}
    }
  }, [currentProductId]);
  /** === VIEW === */
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type5
        title="Bundle"
        backAction={() => goBackFromBundleToDetail(currentProductId)}
        type="red"
        iconName="cart"
        iconAction={goToShoppingCart}
        iconValue={100}
      />
      <ScrollView>
        <PromoSuggestion loading={productDetailLoading} />
        <ProductBundleMainInfo
          imageUrl={productDetail?.images[0].url}
          isExclusive={productDetail?.isExclusive!}
          name={productDetail?.name!}
          currentPrice={productDetail?.currentPrice!}
          packagedQty={productDetail?.packagedQty!}
          minQty={productDetail?.minQty!}
          minQtyType={productDetail?.minQtyType!}
          loading={productDetailLoading}
        />
        <QuantityModifier
          title="Jumlah/pcs"
          loading={productDetailLoading}
          qty={orderQty}
          onChangeQty={onChangeQty}
          onIncrease={increaseOrderQty}
          onDecrease={decreaseOrderQty}
          minusDisabled={orderQty === productDetail?.minQty}
        />
        <SectionTitle
          title="PRODUK TERKAIT"
          loading={productListState.loading} // relatedProductsState.loading
        />
        <HorizontalProductGridLayout
          data={productListState.data}
          loading={productListState.loading} // relatedProductsState.loading
          withOrderButton={true}
          // onEndReached={() =>
          //   loadMore(dispatchProductBundle, {
          //     skip: relatedProductsState.skip,
          //     canLoadMore: relatedProductsState.canLoadMore,
          //   })
          // }
          onCardPress={(item) => {
            setCurrentProductId(item.id);
          }}
        />
        <SectionTitle
          title="PROMO TERKAIT"
          loading={false} // relatedPromosState.loading
        />
        <View style={{ marginBottom: 16 }}>
          <Accordion
            data={otherPropertiesDummy.affiliatedPromos}
            loading={false} // relatedPromosState.loading
          />
        </View>
      </ScrollView>
      <ActionButton
        title="Tambah ke Keranjang"
        onPress={() => console.log('Add to cart pressed')}
      />
    </SnbContainer>
  );
};

export default ProductBundleView;
