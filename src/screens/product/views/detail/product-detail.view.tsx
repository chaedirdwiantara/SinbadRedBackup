/** === IMPORT PACKAGES ===  */
import React, { FC, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SnbText, SnbContainer, SnbStatusBar } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { ProductDetailHeader } from './ProductDetailHeader';
import { ProductDetailCarousel } from './ProductDetailCarousel';
import { ProductDetailMainInfo } from './ProductDetailMainInfo';
// import { ProductDetailSupplierInfo } from './ProductDetailSupplierInfo';
import { PromoSection } from './PromoSection';
import { ProductDetailSection } from './ProductDetailSection';
import { ProductDetailSectionItem } from './ProductDetailSectionItem';
import { ActionButton } from './ActionButton';
import { UnavailableSkuFlag } from './UnavailableSkuFlag';
import { PromoModal } from './PromoModal';
/** === IMPORT FUNCTIONS === */
import { NavigationAction } from '@core/functions/navigation';
import { useProductDetailAction } from '@screen/product/functions';
import { useProductContext } from 'src/data/contexts/product';
import { contexts } from '@contexts';
import { usePotentialPromoProductAction } from '@screen/promo/functions';
/** === DUMMY === */
const productDetailDummy = {
  id: '1',
  name: 'LAKME CC CREAM ALMOND',
  images: [
    {
      url: 'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
    },
    {
      url: 'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400582.png',
    },
  ],
  currentPrice: 77891,
  originalPrice: 85680,
  packagedQty: 5,
  minQty: 1,
  unit: 'Pcs',
  isExclusive: true,
  detail: 'It is what it is.',
  description: 'Good for skin obviously, experience the difference!',
  productWeight: 100,
  promoList: [
    {
      promoSellerId: '6149f9c2a5868baca3e6f8eb',
      shortDescription:
        'Setiap pembelian produk Lakme sebesar 2jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 1%.\nSetiap pembelian di atas 5jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 2%',
    },
    {
      promoSellerId: '6149f9c2a5868baca3e6f8eb',
      shortDescription:
        'Setiap pembelian produk Lakme sebesar 10jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 3%.',
    },
  ],
  supplier: {
    name: 'Depo Berkah Abadi',
    urbanCity: 'Jakarta Barat',
    logoUrl: '',
  },
  discount: '10%',
};
/** === COMPONENT === */
const ProductDetailView: FC = () => {
  /** === HOOKS === */
  const {
    params: { id: productId },
  } = NavigationAction.useGetNavParams();
  const {
    stateProduct: { detail: productDetailState },
    dispatchProduct,
  } = useProductContext();
  const { fetch } = useProductDetailAction();
  const [promoModalVisible, setPromoModalVisible] = useState(false);

  useEffect(() => {
    fetch(dispatchProduct, productId);
  }, []);

  /**
   * Potential Promo Product
   * - only fetch when the product data is ready
   */
  const {
    statePromo: { potentialPromoProduct: potentialPromoProduct },
    dispatchPromo,
  } = React.useContext(contexts.PromoContext);
  const potentialPromoProductList = potentialPromoProduct.list;
  const potentialPromoProductAction = usePotentialPromoProductAction();
  /** => potential promo product effect */
  React.useEffect(() => {
    if (productDetailState.data !== null) {
      const { id } = productDetailState.data;
      potentialPromoProductAction.reset(dispatchPromo);
      potentialPromoProductAction.list(
        dispatchPromo,
        '6149f9c2a5868baca3e6f8ec',
      );
    }
  }, [productDetailState]);

  /** === DERIVED === */
  const defaultProperties = {
    isAvailable: productDetailState.data?.isAvailable ?? true,
    isBundle: productDetailState.data?.isBundle ?? false,
    stock: 5,
  };
  /** === FUNCTION === */
  const getActionButtonTitle = () => {
    if (defaultProperties.stock > (productDetailState.data?.minQty ?? 1)) {
      if (defaultProperties.isBundle) {
        return 'Check Promo Bundle';
      } else {
        return 'Tambah ke Keranjang';
      }
    }

    return 'Stock Habis';
  };
  /** === VIEW === */
  /** => Loading */
  if (productDetailState.loading) {
    return (
      <View>
        <SnbText.H4>Loading...</SnbText.H4>
      </View>
    );
  }
  /** => Main */
  return (
    <SnbContainer color="white">
      <SnbStatusBar type="transparent1" />
      <ProductDetailHeader cartBadge={10} />
      {/* Content */}
      <View style={{ flex: 1 }}>
        <ScrollView>
          <ProductDetailCarousel images={productDetailState.data?.images!} />
          <ProductDetailMainInfo
            name={productDetailState.data?.name!}
            originalPrice={productDetailState.data?.originalPrice!}
            currentPrice={productDetailState.data?.currentPrice!}
            minQty={productDetailState.data?.minQty!}
            unit={productDetailState.data?.unit!}
            isExclusive={productDetailState.data?.isExclusive!}
            stock={defaultProperties.stock}
            hasPromo={false} // When promoList.length > 0, for now it'll be set to false
          />
          {/* Will be hidden temporarily */}
          {/* <ProductDetailSupplierInfo
            logo={productDetailDummy.supplier.logoUrl}
            name={productDetailDummy.supplier.name}
            urbanCity={productDetailDummy.supplier.urbanCity}
          /> */}
          {potentialPromoProductList.data.length > 0 && (
            <PromoSection
              description={potentialPromoProductList.data[0].shortDescription}
              onPress={() => setPromoModalVisible(true)}
            />
          )}
          {defaultProperties.isBundle && (
            <ProductDetailSection title="Promosi Bundle Special">
              <SnbText.B3>Promo Bundle Data</SnbText.B3>
            </ProductDetailSection>
          )}
          <ProductDetailSection title="Informasi Produk">
            <ProductDetailSectionItem
              name="Minimal Pembelian"
              value={`${productDetailState.data?.minQty} ${productDetailState.data?.unit}`}
            />
            <ProductDetailSectionItem
              name="Jumlah per-Dus"
              value={`${productDetailState.data?.packagedQty} ${productDetailState.data?.unit}`}
            />
            <ProductDetailSectionItem
              name="Berat"
              value={`${productDetailState.data?.productWeight} gr`}
              bottomSpaces={0}
            />
          </ProductDetailSection>
          <ProductDetailSection title="Detail Produk">
            <SnbText.B3>{productDetailState.data?.detail}</SnbText.B3>
          </ProductDetailSection>
          <ProductDetailSection title="Deskripsi Produk">
            <SnbText.B3>{productDetailState.data?.description}</SnbText.B3>
          </ProductDetailSection>
          <View style={{ height: 10 }} />
        </ScrollView>
      </View>
      {defaultProperties.isAvailable ? (
        <ActionButton
          title={getActionButtonTitle()}
          disabled={
            defaultProperties.stock < (productDetailState.data?.minQty ?? 1)
          }
          onPress={() => console.log('Add to cart pressed')}
        />
      ) : (
        <UnavailableSkuFlag />
      )}
      <PromoModal
        visible={promoModalVisible}
        onClose={() => setPromoModalVisible(false)}
        promoList={potentialPromoProductList.data}
      />
    </SnbContainer>
  );
};

export default ProductDetailView;
