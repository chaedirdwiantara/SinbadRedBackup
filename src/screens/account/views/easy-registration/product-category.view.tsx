import { useNavigation, useRoute } from '@react-navigation/native';
import { useEasyRegistration } from '@screen/account/functions';
import {
  color,
  SnbButton2,
  SnbCheckbox,
  SnbContainer,
  SnbProgress,
  SnbText2,
  SnbTopNav2,
} from '@sinbad/react-native-sinbad-ui';
import { ICheckbox } from '@sinbad/react-native-sinbad-ui/lib/typescript/models/CheckboxTypes';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { ErrorContent } from '../shared';

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
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const isSelected =
      data.filter((el) => el.isSelected).length === data.length;
    const newData = data.map((el) => {
      if (checkBoxStatus === 'indeterminate') {
        el.isSelected = true;
      } else if (checkBoxStatus === 'unselect' && isSelected) {
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
    if (productCategories?.data) {
      params.selectedProductCategory.forEach((selectedCategory: any) => {
        productCategories.data.forEach((el: any) => {
          if (selectedCategory.id === el.id) {
            el.isSelected = true;
          }
        });
      });
      setData(productCategories.data);
    }
  }, [productCategories]);

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
      setCheckBoxStatus('indeterminate');
      setDisableButton(false);
    } else {
      setCheckBoxStatus('unselect');
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
          <SnbText2.Paragraph.Small>{item?.name}</SnbText2.Paragraph.Small>
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
        <SnbText2.Headline.Small>Produk apa yang Anda jual?</SnbText2.Headline.Small>
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
                        checkBoxStatus === 'indeterminate'
                          ? 'unselect'
                          : 'indeterminate',
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
                      <SnbText2.Body.Default>Semua Produk</SnbText2.Body.Default>
                    </View>
                    <SnbCheckbox
                      status={checkBoxStatus}
                      onPress={() => {
                        setCheckBoxStatus(
                          checkBoxStatus === 'indeterminate'
                            ? 'unselect'
                            : 'indeterminate',
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
          ListEmptyComponent={() => {
            if (productCategories?.loading) {
              return (
                <View style={{ padding: 16 }}>
                  <SnbProgress />
                </View>
              );
            }

            if (productCategories?.error) {
              return (
                <View style={{ padding: 16 }}>
                  <ErrorContent
                    action={getProductCategory}
                    message={productCategories?.error?.message}
                  />
                </View>
              );
            }

            return null;
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: 0.75, backgroundColor: color.black40 }} />
          )}
        />
      </View>
      <View style={{ width: '100%', marginVertical: 16 }}>
        <View style={{ marginHorizontal: 16 }}>
          <SnbButton2.Primary
            title="Simpan Kategori Produk"
            onPress={onHandleSaveProductCategory}
            disabled={disableButton}
            size={'medium'}
            full
          />
        </View>
      </View>
    </View>
  );
};

const ProductCategoryView: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        backAction={goBack}
        title="Kategori Produk"
        color="white"
      />
      <Content />
    </SnbContainer>
  );
};

export default ProductCategoryView;
