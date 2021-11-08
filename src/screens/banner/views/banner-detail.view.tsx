/** === IMPORT PACKAGE HERE ===  */
import React, { useContext } from 'react';
import {
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbCardInfoType2,
  color,
  SnbDivider,
  SnbBottomSheet,
} from 'react-native-sinbad-ui';
import RenderHtml from 'react-native-render-html';
import SnbTextSeeMore from '@core/components/TextSeeMore';
import { ProductGridCard } from '@core/components/ProductGridCard';
import { goBack, useBannerAction } from '../functions';
import { contexts } from '@contexts';
import { BannerDetailStyles } from '../styles';

const { width } = Dimensions.get('window');
interface RecommendedProduct {
  id: string;
  name: string;
  imageUrl: string;
  displayPrice: number;
  isBundle: boolean;
  isPromo: boolean;
  isExclusive: boolean;
}
/** === DUMMY === */
const recommendedProducts: Array<RecommendedProduct> = [
  {
    id: '1',
    name: 'LAKME CC CREAM ALMOND',
    imageUrl:
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
    displayPrice: 77891,
    isBundle: false,
    isPromo: true,
    isExclusive: true,
  },
  {
    id: '2',
    name: 'LAKME BLUR PERFECT CREAMER',
    imageUrl:
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
    displayPrice: 150000,
    isBundle: false,
    isPromo: false,
    isExclusive: false,
  },
  {
    id: '3',
    name: 'LAKME ABSOLUTE LIQUID CONCEALER IVORY FAIR',
    imageUrl:
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67145109.png',
    displayPrice: 98782,
    isBundle: true,
    isPromo: true,
    isExclusive: true,
  },
  {
    id: '4',
    name: 'LAKME BIPHASED MAKEUP REMOVER',
    imageUrl:
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/21158106.png',
    displayPrice: 72000,
    isBundle: false,
    isPromo: true,
    isExclusive: false,
  },
  {
    id: '5',
    name: 'LAKME CC CREAM HONEY',
    imageUrl:
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400582.png',
    displayPrice: 77891,
    isBundle: false,
    isPromo: false,
    isExclusive: true,
  },
];

/** Mock Data TnC */
const termsAndCondition = [
  'Berlaku untuk user dari semua tier',
  'Pembelian min 1.000.000 untuk SKU (SGM 300gr)',
  'Tidak berlaku kelipatan',
  'Voucher tidak bisa diuangkan, ditukar kembali dalam bentuk point atau digunakan untuk pembelian SKU lain',
  'Masa aktif voucher terhitung dari voucher didapatkan',
];

/** === COMPONENT === */
const BannerDetailView: React.FC = ({ route }: any) => {
  /** === STATE === */
  const [modalTnCVisible, setModalTnCVisible] = React.useState<boolean>(false);
  const { stateBanner, dispatchBanner } = useContext(contexts.BannerContext);
  const bannerAction = useBannerAction();
  const bannerDetailState = stateBanner.detail;
  /** === HOOK === */
  React.useEffect(() => {
    bannerAction.detail(dispatchBanner, route.params.bannerId);
    return () => {
      bannerAction.resetDetail(dispatchBanner);
    };
  }, []);
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <View
        style={{ width: '100%', position: 'absolute', zIndex: 1000, top: 0 }}>
        <SnbTopNav.Type5
          type={'transparent1'}
          backAction={() => goBack()}
          title={''}
          iconAction={() => {}}
          iconName={'cart'}
          iconValue={10}
        />
      </View>
    );
  };

  /** => banner */
  const renderBanner = () => {
    return (
      <Image
        defaultSource={require('../../../assets/images/banner/sinbad-loading-image-banner.png')}
        source={{
          uri: bannerDetailState.data?.imageUrl,
        }}
        style={{
          height: 180,
          width: '100%',
        }}
      />
    );
  };

  /** => promo card information */
  const renderPromoCardInformation = () => {
    return (
      <View style={{ marginTop: -65 }}>
        <SnbCardInfoType2.Header title={bannerDetailState.data?.header}>
          <SnbCardInfoType2.Row
            label={'Berlaku Sampai'}
            text={moment(bannerDetailState.data?.activeTo).format(
              'DD MMM YYYY',
            )}
          />
        </SnbCardInfoType2.Header>
      </View>
    );
  };

  /** => voucher description */
  const renderPromoDescriptionHtml = () => {
    const sourceHtml = {
      html: bannerDetailState.data?.description,
    };
    return (
      <View style={BannerDetailStyles.sectionContainer}>
        <RenderHtml contentWidth={width} source={sourceHtml} />
      </View>
    );
  };

  /** => voucher description */
  const renderPromoDescription = () => {
    return (
      <View style={BannerDetailStyles.sectionContainer}>
        <SnbTextSeeMore
          maxLine={3}
          toggleColor={color.red50}
          toggleShowMore={'Lihat Semua'}
          toggleShowLess={'Lihat Lebih Sedikit'}
          content={
            <SnbText.B1>{bannerDetailState.data?.description}</SnbText.B1>
          }
        />
      </View>
    );
  };

  /** => promo TnC */
  const renderPromoTnC = () => {
    return (
      <View style={BannerDetailStyles.sectionContainer}>
        <View>
          <SnbText.B2>Syarat dan Ketentuan</SnbText.B2>
        </View>
        <SnbDivider style={{ marginVertical: 8 }} />
        <View style={{ marginRight: 20 }}>
          {Array.isArray(termsAndCondition) &&
            termsAndCondition.slice(0, 3).map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginBottom: 4,
                  }}>
                  <View style={{ marginRight: 8, width: 20 }}>
                    <SnbText.B1>{index + 1}.</SnbText.B1>
                  </View>
                  <SnbText.B1>{item}</SnbText.B1>
                </View>
              );
            })}
        </View>
        {Array.isArray(termsAndCondition) && termsAndCondition.length > 3 && (
          <TouchableOpacity onPress={() => setModalTnCVisible(true)}>
            <SnbText.B1 color={color.red50}>Baca Selengkapnya</SnbText.B1>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  /** === Product Card === */
  const renderProductCard = ({
    item,
    index,
  }: {
    item: RecommendedProduct;
    index: number;
  }) => (
    <View
      key={index}
      style={{
        width: 160,
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === recommendedProducts.length - 1 ? 16 : 0,
      }}>
      <ProductGridCard
        flexOne={true}
        name={item.name}
        imageUrl={item.imageUrl}
        price={item.displayPrice}
        isBundle={item.isBundle}
        isPromo={item.isPromo}
        isExclusive={item.isExclusive}
        onCardPress={() => console.log(`${item.name} pressed`)}
      />
    </View>
  );

  /** === Product List Separator === */
  const renderProductListSeparator = () => {
    return <View style={{ width: 12 }} />;
  };

  /** => Product List */
  const renderProductList = () => (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={recommendedProducts}
      renderItem={renderProductCard}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={renderProductListSeparator}
    />
  );

  /** => produk terkait */
  const renderRecommendationProduct = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <View style={BannerDetailStyles.headerProductList}>
          <SnbText.B2>Produk Terkait</SnbText.B2>
        </View>
        {renderProductList()}
      </View>
    );
  };

  /** => modal full TnC */
  const renderModalFullTnC = () => {
    return (
      <SnbBottomSheet
        open={modalTnCVisible}
        title={'Syarat dan Ketentuan'}
        action={true}
        actionIcon={'close'}
        closeAction={() => setModalTnCVisible(false)}
        content={
          <View style={{ marginRight: 20, paddingHorizontal: 16 }}>
            {termsAndCondition.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginBottom: 4,
                  }}>
                  <View style={{ marginRight: 8, width: 20 }}>
                    <SnbText.B1>{index + 1}.</SnbText.B1>
                  </View>
                  <SnbText.B1>{item}</SnbText.B1>
                </View>
              );
            })}
          </View>
        }
      />
    );
  };

  /** => main */
  return (
    <SnbContainer color="grey">
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderBanner()}
        {renderPromoCardInformation()}
        {bannerDetailState.data?.bannerType === 'general'
          ? renderPromoDescriptionHtml()
          : renderPromoDescription()}
        {bannerDetailState.data?.bannerType === 'general' ? (
          <View />
        ) : (
          renderPromoTnC()
        )}
        {bannerDetailState.data?.bannerType === 'general' ? (
          <View />
        ) : (
          renderRecommendationProduct()
        )}
        {renderModalFullTnC()}
      </ScrollView>
    </SnbContainer>
  );
};

export default BannerDetailView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
