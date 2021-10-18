/** === IMPORT PACKAGES ===  */
import React, { FC, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  SnbText,
  SnbContainer,
  SnbStatusBar,
  SnbIcon,
  SnbCarousel,
  SnbCarouselIndicator,
  color,
  styles,
  SnbButton,
  SnbBadge,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { ProductDetailSection } from './ProductDetailSection';
/** === IMPORT FUNCTIONS === */
import { NavigationAction } from '@core/functions/navigation';
import { toCurrency } from '@core/functions/global/currency-format';
/** === IMPORT STYLE === */
import { ProductDetailStyle } from '@screen/product/styles';
/** === DUMMY === */
const productDetailDummy = {
  id: '1',
  name: 'LAKME CC CREAM ALMOND',
  images: [
    'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
    'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400582.png',
  ],
  currentPrice: 77891,
  originalPrice: 85680,
  discount: '10%',
  stock: 4,
  packagedQty: 5,
  minQty: 1,
  uom: 'Pcs',
  isExclusive: true,
  isBundle: true,
  description: 'Good for skin obviously, experience the difference!',
  weight: '100 gr',
  promoList: [
    {
      shortDescription:
        'Setiap pembelian produk Lakme sebesar 2jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 1%.\nSetiap pembelian di atas 5jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 2%',
    },
    {
      shortDescription:
        'Setiap pembelian produk Lakme sebesar 10jt atau lebih, customer berhak mendapatkan potongan diskon sebesar 3%.',
    },
  ],
  supplier: {
    name: 'Depo Berkah Abadi',
    urban: {
      city: 'Jakarta Barat',
    },
    imageLogoUrl: '',
  },
  isAvailable: true,
};
/** === CONSTANT === */
const { width, height } = Dimensions.get('window');
/** === COMPONENT === */
const ProductDetailView: FC = () => {
  /** === HOOKS === */
  const carouselRef = useRef();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [promoModalVisible, setPromoModalVisible] = useState(false);
  /** === VIEW === */
  /** => Header Nagigation */
  const renderHeaderNavigation = () => (
    <View style={ProductDetailStyle.headerNavigationContainer}>
      <TouchableOpacity
        onPress={() => NavigationAction.back()}
        style={ProductDetailStyle.navigationButton}>
        <SnbIcon name="arrow_back" size={24} color={color.white} />
      </TouchableOpacity>
      <TouchableOpacity style={ProductDetailStyle.navigationButton}>
        <View style={ProductDetailStyle.cartBadge}>
          <SnbBadge.Hint color="red" value={10} />
        </View>
        <SnbIcon name="cart" size={24} color={color.white} />
      </TouchableOpacity>
    </View>
  );
  /** => Carousel Item */
  const renderCarouselItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={{ width: width, height: width }} />
  );
  /** => Image Carousel */
  const renderImageCarousel = () => (
    <View style={{ height: width }}>
      <View style={{ flex: 1 }}>
        <SnbCarousel
          carouselRef={carouselRef}
          data={productDetailDummy.images}
          renderItem={renderCarouselItem}
          itemWidth={width}
          sliderWidth={width}
          setCurrentActive={setActiveImageIndex}
          loop={true}
        />
      </View>
      <View style={ProductDetailStyle.carouselIndicatorContainer}>
        <SnbCarouselIndicator
          carouselRef={carouselRef}
          dotsLength={productDetailDummy.images.length}
          activeDotIndex={activeImageIndex}
        />
      </View>
    </View>
  );
  /** => Exclusive Tag */
  const renderExclusiveTag = () => {
    return (
      productDetailDummy.isExclusive && (
        <View style={ProductDetailStyle.exclusiveTagContainer}>
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
  /** => Main Info */
  const renderMainInfo = () => (
    <View style={{ paddingHorizontal: 16, paddingVertical: 14 }}>
      {renderExclusiveTag()}
      <SnbText.H4>{productDetailDummy.name}</SnbText.H4>
      <View style={{ marginVertical: 8 }}>
        <SnbText.B2 color={color.red50}>
          {toCurrency(productDetailDummy.currentPrice, { withFraction: false })}
        </SnbText.B2>
      </View>
      {productDetailDummy.stock > productDetailDummy.minQty && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: productDetailDummy.discount
              ? 'space-between'
              : 'flex-end',
            alignItems: 'center',
          }}>
          {productDetailDummy.discount && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SnbText.B3 color={color.black40}>
                {toCurrency(productDetailDummy.originalPrice, {
                  withFraction: false,
                })}
              </SnbText.B3>
            </View>
          )}
          <SnbText.B3
            color={
              color.red50
            }>{`Tersisa ${productDetailDummy.stock} ${productDetailDummy.uom}`}</SnbText.B3>
        </View>
      )}
    </View>
  );
  /** => Supplier Info */
  const renderSupplierInfo = () => (
    <View>
      <View style={{ height: 10, backgroundColor: color.black5 }} />
      <View style={[styles.shadowForBox10, { padding: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={
              productDetailDummy.supplier.imageLogoUrl
                ? { uri: productDetailDummy.supplier.imageLogoUrl }
                : require('../../../../assets/images/store.png')
            }
            style={ProductDetailStyle.supplierLogo}
          />
          <View style={{ flex: 1 }}>
            <SnbText.B3>{productDetailDummy.supplier.name}</SnbText.B3>
            <View style={{ marginTop: 4 }}>
              <SnbText.C1 color={color.black80}>
                {productDetailDummy.supplier.urban.city}
              </SnbText.C1>
            </View>
          </View>
          <TouchableOpacity
            style={ProductDetailStyle.supplierButton}
            onPress={() => console.log('See supplier pressed')}>
            <SnbText.C1 color={color.red70}>Lihat Supplier</SnbText.C1>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  /** => Promo Section */
  const renderPromoSection = () => {
    return (
      productDetailDummy.promoList.length > 0 && (
        <ProductDetailSection title="Promosi" separator={false}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => setPromoModalVisible(true)}>
            <View style={{ flex: 1 }}>
              <SnbText.C1 color={color.black80}>
                Anda Berpotensi mendapatkan:
              </SnbText.C1>
              <View style={{ marginTop: 4 }}>
                <SnbText.B3>
                  {productDetailDummy.promoList[0].shortDescription}
                </SnbText.B3>
              </View>
            </View>
            <SnbIcon name="chevron_right" size={24} color={color.black60} />
          </TouchableOpacity>
        </ProductDetailSection>
      )
    );
  };
  /** => Promo Bundle Section */
  const renderPromoBundleSection = () => {
    return (
      productDetailDummy.isBundle && (
        <ProductDetailSection title="Promosi Bundle Special">
          <SnbText.B3>Content</SnbText.B3>
        </ProductDetailSection>
      )
    );
  };
  /** => Section Item */
  const renderSectionItem = (
    key: string,
    value: string,
    bottomSpaces: number = 6,
  ) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: bottomSpaces ?? 0,
      }}>
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <SnbText.B3>{key}</SnbText.B3>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <SnbText.B3>{value}</SnbText.B3>
      </View>
    </View>
  );
  /** => Product Info */
  const renderProductInfo = () => (
    <ProductDetailSection title="Informasi Produk">
      {renderSectionItem(
        'Minimal Pembelian',
        `${productDetailDummy.minQty} ${productDetailDummy.uom}`,
      )}
      {renderSectionItem(
        'Jumlah per-Dus',
        `${productDetailDummy.packagedQty} ${productDetailDummy.uom}`,
      )}
      {renderSectionItem('Berat', productDetailDummy.weight, 0)}
    </ProductDetailSection>
  );
  /** => Product Detail */
  const renderProductDetail = () => (
    <ProductDetailSection title="Detail Produk">
      <SnbText.B3>HTML Content</SnbText.B3>
    </ProductDetailSection>
  );
  /** => Product Description */
  const renderProductDescription = () => (
    <ProductDetailSection title="Deskripsi Produk">
      <SnbText.B3>{productDetailDummy.description}</SnbText.B3>
    </ProductDetailSection>
  );
  /** => Unavailable SKU Flag */
  const renderUnavailableSKUFlag = () => (
    <View style={ProductDetailStyle.unavailableSKUFlag}>
      <SnbIcon name="error" size={20} color={color.red50} />
      <View style={{ marginLeft: 8 }}>
        <SnbText.C1>
          SKU tidak tersedia di lokasi Anda. Silahkan pilih SKU lain yang
          tersedia
        </SnbText.C1>
      </View>
    </View>
  );
  /** => Action Button Title */
  const getActionButtonTitle = () =>
    productDetailDummy.stock > productDetailDummy.minQty
      ? productDetailDummy.isBundle
        ? 'Check Promo Bundle'
        : 'Tambah ke Keranjang'
      : 'Stock Habis';
  /** => Action Button */
  const renderActionButton = () => {
    return productDetailDummy.isAvailable ? (
      <View style={{ height: 80 }}>
        <SnbButton.Single
          type="primary"
          disabled={productDetailDummy.stock < productDetailDummy.minQty}
          title={getActionButtonTitle()}
          onPress={() => console.log('Add to cart pressed')}
        />
      </View>
    ) : (
      renderUnavailableSKUFlag()
    );
  };
  /** => Promo Modal */
  const renderPromoModal = () => (
    <SnbBottomSheet
      open={promoModalVisible}
      title="Promosi"
      action={true}
      actionIcon="close"
      closeAction={() => setPromoModalVisible(false)}
      content={
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <SnbText.B4>Potongan Harga</SnbText.B4>
          <View style={{ height: height * 0.15, marginTop: 16 }}>
            <ScrollView>
              {productDetailDummy.promoList.map((promo, promoIndex) => (
                <View key={promoIndex} style={{ marginBottom: 8 }}>
                  <SnbText.C1>{promo.shortDescription}</SnbText.C1>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      }
    />
  );
  /** => Content */
  const renderContent = () => (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {renderImageCarousel()}
        {renderMainInfo()}
        {renderSupplierInfo()}
        {renderPromoSection()}
        {renderPromoBundleSection()}
        {renderProductInfo()}
        {renderProductDetail()}
        {renderProductDescription()}
        <View style={{ height: 10 }} />
      </ScrollView>
    </View>
  );
  /** => Main */
  return (
    <SnbContainer color="white">
      <SnbStatusBar type="transparent1" />
      {renderHeaderNavigation()}
      {renderContent()}
      {renderActionButton()}
      {renderPromoModal()}
    </SnbContainer>
  );
};

export default ProductDetailView;
