import { useNavigation, useRoute } from '@react-navigation/native';
import { useEasyRegistration } from '@screen/auth/functions/easy-registration-hooks';
import {
  color,
  SnbButton,
  SnbCheckbox,
  SnbContainer,
  SnbProgress,
  SnbText,
  SnbTopNav,
} from '@sinbad/react-native-sinbad-ui';
import { ICheckbox } from '@sinbad/react-native-sinbad-ui/lib/typescript/models/CheckboxTypes';
import React from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';

const Content: React.FC = () => {
  return (
    <View style={{ flex: 1, borderTopWidth: 1, borderColor: color.black10 }}>
      <ProductCategory />
    </View>
  );
};

const ProductCategory: React.FC = () => {
  const { params }: any = useRoute();
  const { goBack } = useNavigation();
  const [checkBoxStatus, setCheckBoxStatus] =
    React.useState<ICheckbox>('unselect');
  const [disableButton, setDisableButton] = React.useState(true);
  const { getProductCategory, productCategories } = useEasyRegistration();
  const [data, setData] = React.useState<any[]>(productCategories?.data);

  React.useEffect(() => {
    const newData = data.map((el) => {
      if (checkBoxStatus === 'selected') {
        el.isSelected = true;
      } else if (checkBoxStatus === 'unselect') {
        el.isSelected = false;
      }
      return el;
    });
    setData(newData);
  }, [checkBoxStatus]);

  React.useEffect(() => {
    getProductCategory();
  }, []);

  React.useEffect(() => {
    setData(productCategories?.data);
  }, [productCategories?.data]);

  React.useEffect(() => {
    const isSelected = data.filter((el) => el.isSelected);
    const isNotSelected = data.filter((el) => !el.isSelected);
    if (isNotSelected.length === data.length) {
      setCheckBoxStatus('unselect');
      setDisableButton(true);
    } else if (isSelected.length === data.length) {
      setCheckBoxStatus('selected');
      setDisableButton(false);
    } else {
      setCheckBoxStatus('indeterminate');
      setDisableButton(false);
    }
  }, [data]);

  function onHandleSaveProductCategory() {
    goBack();
    params?.setSelectedProductCategory(data.filter((el) => el.isSelected));
  }

  function renderItems({ item }: any) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          const newData = data.map((el) => {
            if (el.id === item.id) {
              el.isSelected = !el.isSelected;
            }
            return el;
          });
          setData(newData);
        }}
        style={{ flexDirection: 'row', padding: 12, alignItems: 'center' }}>
        <View
          style={{
            borderRadius: 16,
            borderWidth: 0.75,
            borderColor: color.black40,
            padding: 8,
          }}>
          <Image
            source={{ uri: item?.icon || ' ' }}
            style={{ width: 24, height: 24 }}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <SnbText.B1>{item?.name}</SnbText.B1>
        </View>
        <SnbCheckbox
          onPress={() => {
            const newData = data.map((el) => {
              if (el.id === item.id) {
                el.isSelected = !el.isSelected;
              }
              return el;
            });
            setData(newData);
          }}
          status={item?.isSelected ? 'selected' : 'unselect'}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1, marginTop: 4 }}>
      <View
        style={{
          marginHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 0.75,
          borderBottomColor: color.black40,
        }}>
        <SnbText.H4>Produk apa yang Anda jual?</SnbText.H4>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={() => {
            if (productCategories?.data.length > 0) {
              return (
                <View
                  style={{
                    borderBottomWidth: 0.75,
                    borderColor: color.black40,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setCheckBoxStatus(
                        checkBoxStatus === 'selected' ? 'unselect' : 'selected',
                      );
                    }}
                    style={{
                      flexDirection: 'row',
                      padding: 12,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderRadius: 16,
                        borderWidth: 0.75,
                        borderColor: color.black40,
                        padding: 8,
                      }}>
                      <Image
                        source={require('@image/all_product.png')}
                        style={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 12 }}>
                      <SnbText.H3>Semua Produk</SnbText.H3>
                    </View>
                    <SnbCheckbox
                      status={checkBoxStatus}
                      onPress={() => {
                        setCheckBoxStatus(
                          checkBoxStatus === 'selected'
                            ? 'unselect'
                            : 'selected',
                        );
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }
            return null;
          }}
          data={data}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderItems}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          ListEmptyComponent={() => (
            <View style={{ padding: 16 }}>
              <SnbProgress />
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 0.75, backgroundColor: color.black40 }} />
          )}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getProductCategory} />
          }
        />
      </View>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          title="Simpan Kategori Produk"
          onPress={onHandleSaveProductCategory}
          type="primary"
          disabled={disableButton}
        />
      </View>
    </View>
  );
};

const ProductCategoryView: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        backAction={goBack}
        title="Kategori Produk"
        type="white"
      />
      <Content />
    </SnbContainer>
  );
};

export default ProductCategoryView;
