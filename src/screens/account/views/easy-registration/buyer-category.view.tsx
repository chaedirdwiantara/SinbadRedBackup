import React from 'react';
import {
  color,
  SnbButton,
  SnbContainer,
  SnbIcon,
  SnbProgress,
  SnbText,
  SnbTopNav,
} from '@sinbad/react-native-sinbad-ui';
import {
  BackHandler,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const [location] = React.useState<models.ISearchLocationsData | null>(
    params?.selectedLocation,
  );
  const { navigate } = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderBottomWidth: 0.5,
        borderColor: color.black40,
      }}>
      <View style={{ flex: 1 }}>
        <SnbText.B3 color={color.black60}>Lokasi Toko</SnbText.B3>
        <View style={{ marginVertical: 4 }} />
        <SnbText.B2>
          {location
            ? `${location.city}, ${location.district}, ${location.urban}`
            : 'Lokasi tidak ditemukan'}
        </SnbText.B2>
      </View>
      <View style={{ marginHorizontal: 4 }} />
      <SnbButton.Dynamic
        title="Ubah"
        onPress={() => navigate(LIST_LOCATION_VIEW)}
        type="secondary"
        disabled={false}
        size="small"
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

  React.useEffect(() => {
    if (buyerCategories.data.length === 0) {
      getBuyerCategory();
    }
  }, []);

  React.useEffect(() => {
    if (createBasicAccountState.data) {
      if (actionFrom === 'mulai') {
        me();
        meV2();
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
    );
  }

  function renderBuyerCategoryItem({ item }: any) {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedBuyerCategory(item);
          navigate(PRODUCT_CATEGORY_VIEW, {
            setSelectedProductCategory,
            selectedProductCategory,
          });
        }}
        style={{
          borderRadius: 16,
          borderWidth: 0.75,
          borderColor: color.black40,
        }}>
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={setIcon(item.slug)}
            style={{ height: 40, width: 40, alignSelf: 'flex-start' }}
            resizeMode="contain"
          />
          <View style={{ marginHorizontal: 8 }} />
          <View style={{ flex: 1 }}>
            <SnbText.H3>{item.name}</SnbText.H3>
            <View style={{ marginTop: 4 }}>
              {item.description.map((el: string, idx: number) => (
                <View
                  key={idx}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      height: 4,
                      width: 4,
                      borderRadius: 4,
                      backgroundColor: color.black80,
                    }}
                  />
                  <View style={{ marginHorizontal: 2 }} />
                  <SnbText.B3>{el}</SnbText.B3>
                </View>
              ))}
            </View>
          </View>
          <SnbIcon name="arrow_forward_ios" color={color.black80} size={16} />
        </View>
        {selectedBuyerCategory?.slug === item?.slug &&
          selectedProductCategory.length > 0 && (
            <View
              style={{
                margin: 16,
                marginTop: 0,
                paddingHorizontal: 16,
                backgroundColor: color.blue10,
                paddingVertical: 12,
                borderRadius: 8,
              }}>
              <SnbText.B3 color={color.blue80}>
                {selectedProductCategory.length} kategori produk terpilih
              </SnbText.B3>
            </View>
          )}
      </TouchableOpacity>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={buyerCategories?.data?.data}
          keyExtractor={(item) => item.slug}
          renderItem={renderBuyerCategoryItem}
          contentContainerStyle={{ padding: 16, marginVertical: 16 }}
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
          ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }} />}
        />
      </View>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          onPress={() => handleOnCreateBasicAccount('mulai')}
          title="Mulai Pakai Sinbad"
          type="primary"
          loading={createBasicAccountState.loading && actionFrom === 'mulai'}
          disabled={
            selectedBuyerCategory === null ||
            selectedProductCategory.length === 0 ||
            createBasicAccountState.loading
          }
        />
      </View>
      <View style={{ marginBottom: 16 }}>
        <SnbButton.Dynamic
          size="medium"
          onPress={() => {
            handleOnCreateBasicAccount('lengkapi');
          }}
          title="Lengkapi Akun Saya"
          buttonColor={color.blue50}
          type="tertiary"
          loading={createBasicAccountState.loading && actionFrom === 'lengkapi'}
          disabled={
            selectedBuyerCategory === null ||
            selectedProductCategory.length === 0 ||
            createBasicAccountState.loading
          }
        />
      </View>
    </View>
  );
};

const Content: React.FC = () => {
  return (
    <View
      style={{ flex: 1, borderTopColor: color.black40, borderTopWidth: 0.5 }}>
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
      <SnbTopNav.Type1 title="Pilih Kategori Toko" type="white" />
      <Content />
    </SnbContainer>
  );
};

export default BuyerCategoryView;
