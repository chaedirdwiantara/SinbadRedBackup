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
  Alert,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  LIST_LOCATION_VIEW,
  PRODUCT_CATEGORY_VIEW,
} from '@screen/auth/functions/screens_name';
import * as models from '@models';
import { LogBox } from 'react-native';
import { useEasyRegistration } from '@screen/auth/functions/easy-registration-hooks';

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
        <SnbText.B3>Lokasi Toko</SnbText.B3>
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
  const [selectedBuyerCategory, setSelectedBuyerCategory] =
    React.useState<any>(null);
  const { navigate } = useNavigation();
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
  const { params }: any = useRoute();
  const [location] = React.useState<models.ISearchLocationsData | null>(
    params?.selectedLocation,
  );

  React.useEffect(() => {
    getBuyerCategory();
  }, []);

  React.useEffect(() => {
    if (createBasicAccountState.data) {
      if (actionFrom === 'mulai') {
        Alert.alert('Info', 'Action will be direct to Home Page');
      } else if (actionFrom === 'lengkapi') {
        Alert.alert(
          'Info',
          'Action will be direct to Premium Account Data Completeness',
        );
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
          setSelectedProductCategory([]);
          navigate(PRODUCT_CATEGORY_VIEW, { setSelectedProductCategory });
        }}
        style={{
          borderRadius: 16,
          borderWidth: selectedBuyerCategory?.slug === item?.slug ? 1 : 0.75,
          borderColor:
            selectedBuyerCategory?.slug === item?.slug
              ? color.red60
              : color.black40,
        }}>
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{ uri: item.image }}
            style={{ height: 56, width: 56, backgroundColor: color.black10 }}
          />
          <View style={{ marginHorizontal: 8 }} />
          <View style={{ flex: 1 }}>
            <SnbText.H3>{item.name}</SnbText.H3>
            <View style={{ marginTop: 4 }}>
              {item.description.map((el: string, idx: number) => (
                <SnbText.B3 key={idx}>- {el}</SnbText.B3>
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
          ListEmptyComponent={() => <SnbProgress />}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getBuyerCategory} />
          }
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
          onPress={() => handleOnCreateBasicAccount('lengkapi')}
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

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type1 title="Pilih Kategori Toko" type="white" />
      <Content />
    </SnbContainer>
  );
};

export default BuyerCategoryView;
