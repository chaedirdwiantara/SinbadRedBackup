import React from 'react';
import {
  colorV2,
  SnbButton2,
  SnbContainer,
  SnbProgress,
  SnbText2,
  SnbTopNav2,
  spacingV2 as layout,
  borderV2,
  SpecialButton,
  SnbInfoBox2,
  FooterButton,
} from '@sinbad/react-native-sinbad-ui';
import { BackHandler, FlatList, Image, View } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import * as models from '@models';
import { LogBox } from 'react-native';
import { ErrorContent } from '../shared';
import {
  DATA_COMPLETENESS_INTRO_VIEW,
  LIST_LOCATION_VIEW,
  PRODUCT_CATEGORY_VIEW,
} from '@screen/account/functions/screens_name';
import { useCoachmark, useEasyRegistration } from '@screen/account/functions';
import { useAuthCoreAction } from '@core/functions/auth';
import { useDataAuth } from '@core/redux/Data';

const setIcon = (slug: string) => {
  switch (slug) {
    case 'toko-grosir':
      return require('@image/grosir.png');
    case 'toko-semi-grosir':
      return require('@image/semi-grosir.png');
    case 'toko-ritel':
      return require('@image/retail.png');
    default:
      return require('@image/grosir.png');
  }
};

const BuyerLocation: React.FC = () => {
  const { params }: any = useRoute();
  const [location, setLocation] =
    React.useState<models.ISearchLocationsData | null>(
      params?.selectedLocation,
    );
  const { navigate } = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: layout.spacing.lg,
        borderBottomWidth: 0.75,
        borderColor: colorV2.strokeColor.disable,
      }}>
      <View style={{ flex: 1 }}>
        <SnbText2.Paragraph.Tiny>Lokasi Toko</SnbText2.Paragraph.Tiny>
        <View style={{ marginVertical: layout.spacing.xxsm }} />
        <SnbText2.Body.Small testID={'05'}>
          {location
            ? `${location.city}, ${location.district}, ${location.urban}`
            : 'Lokasi tidak ditemukan'}
        </SnbText2.Body.Small>
      </View>
      <View style={{ marginHorizontal: layout.spacing.xxsm }} />
      <SnbButton2.Primary
        title="Ubah"
        onPress={() => navigate(LIST_LOCATION_VIEW, { setLocation })}
        disabled={false}
        size="small"
        outline
        testID={'05'}
      />
    </View>
  );
};

const BuyerCategory: React.FC = () => {
  const { params }: any = useRoute();
  const [selectedBuyerCategory, setSelectedBuyerCategory] =
    React.useState<any>(null);
  const { navigate, reset } = useNavigation();
  const [selectedProductCategory, setSelectedProductCategory] = React.useState<
    any[]
  >([]);
  const [actionFrom, setActionFrom] = React.useState<string>('');
  const {
    createBasicAccount,
    buyerCategories,
    getBuyerCategory,
    createBasicAccountState,
  } = useEasyRegistration();
  const [location] = React.useState<models.ISearchLocationsData | null>(
    params?.selectedLocation,
  );
  const { getCoachmark } = useCoachmark();
  const { meV2, me } = useAuthCoreAction();
  const { meV2: meV2Data } = useDataAuth();

  React.useEffect(() => {
    if (buyerCategories.data.length === 0) {
      getBuyerCategory();
    }
    meV2();
  }, []);

  React.useEffect(() => {
    if (createBasicAccountState.data) {
      me();
      meV2();
      if (actionFrom === 'mulai') {
        getCoachmark();
        reset({ index: 0, routes: [{ name: 'Home' }] });
      } else if (actionFrom === 'lengkapi') {
        navigate(DATA_COMPLETENESS_INTRO_VIEW);
      }
    }
  }, [createBasicAccountState]);

  function handleOnCreateBasicAccount(action: string) {
    setActionFrom(action);
    createBasicAccount(
      location,
      selectedBuyerCategory,
      selectedProductCategory,
      meV2Data,
    );
  }

  function renderBuyerCategoryItem({ item }: any) {
    return (
      <View>
        <SpecialButton.Card
          testID={'05'}
          title={item.name}
          subTitle={item.description.map((el: string, idx: number) => (
            <View
              key={idx}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  height: 4,
                  width: 4,
                  borderRadius: borderV2.radius.sm,
                  backgroundColor: colorV2.textColor.secondary,
                }}
              />
              <View style={{ marginHorizontal: layout.spacing.xxsm }} />
              <SnbText2.Paragraph.Small color={colorV2.textColor.secondary}>
                {el}
              </SnbText2.Paragraph.Small>
            </View>
          ))}
          iconComponent={
            <Image
              source={setIcon(item.slug)}
              style={{ height: 40, width: 40, alignSelf: 'flex-start' }}
              resizeMode="contain"
            />
          }
          infoComponent={
            selectedBuyerCategory?.slug === item?.slug &&
            selectedProductCategory.length > 0 && (
              <SnbInfoBox2
                title={`${selectedProductCategory.length} kategori produk terpilih`}
                color="blue"
              />
            )
          }
          onPress={() => {
            setSelectedBuyerCategory(item);
            navigate(PRODUCT_CATEGORY_VIEW, {
              setSelectedProductCategory,
              selectedProductCategory,
            });
          }}
          action
          actionType="action"
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={buyerCategories?.data?.data}
          keyExtractor={(item) => item.slug}
          renderItem={renderBuyerCategoryItem}
          contentContainerStyle={{
            padding: layout.spacing.lg,
            marginVertical: layout.spacing.lg,
          }}
          ListEmptyComponent={() => {
            if (buyerCategories?.loading) {
              return <SnbProgress />;
            }

            if (buyerCategories?.error) {
              return (
                <ErrorContent
                  action={getBuyerCategory}
                  message={buyerCategories?.error?.message}
                />
              );
            }

            return null;
          }}
          ItemSeparatorComponent={() => (
            <View style={{ marginVertical: layout.spacing.sm }} />
          )}
        />
      </View>
      <View>
        <FooterButton.Single
          title="Mulai Pakai Sinbad"
          textLink={'Lengkapi Akun Saya'}
          buttonPress={() => handleOnCreateBasicAccount('mulai')}
          textLinkPress={() => handleOnCreateBasicAccount('lengkapi')}
          testID={'05'}
          disabled={
            selectedBuyerCategory === null ||
            selectedProductCategory.length === 0 ||
            createBasicAccountState.loading
          }
          disabledTextLink={
            selectedBuyerCategory === null ||
            selectedProductCategory.length === 0 ||
            createBasicAccountState.loading
          }
          loadingButton={
            createBasicAccountState.loading && actionFrom === 'mulai'
          }
        />
      </View>
    </View>
  );
};

const Content: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <BuyerLocation />
      <BuyerCategory />
    </View>
  );
};

const BuyerCategoryView: React.FC = () => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const handleBackButton = React.useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return backHandler.remove;
  }, []);

  useFocusEffect(handleBackButton);

  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type1
        title="Pilih Kategori Toko"
        color="white"
        testID={'05'}
      />
      <Content />
    </SnbContainer>
  );
};

export default BuyerCategoryView;
