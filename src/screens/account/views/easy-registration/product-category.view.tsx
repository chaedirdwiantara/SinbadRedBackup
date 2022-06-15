import { useNavigation, useRoute } from '@react-navigation/native';
import { useEasyRegistration } from '@screen/account/functions';
import {
  SnbButton2,
  SnbContainer,
  SnbProgress,
  SnbText2,
  SnbTopNav2,
  spacingV2 as layout,
  borderV2,
  colorV2,
  SnbIcon,
} from '@sinbad/react-native-sinbad-ui';
import { ICheckbox } from '@sinbad/react-native-sinbad-ui/lib/typescript/models/CheckboxTypes';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { ErrorContent } from '../shared';

const Content: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
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
      params?.selectedProductCategory.forEach((selectedCategory: any) => {
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
        style={{
          flexDirection: 'row',
          paddingVertical: layout.spacing.md,
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: borderV2.radius.lg,
            borderWidth: 1,
            borderColor: colorV2.strokeColor.disable,
            padding: layout.spacing.sm,
          }}>
          <Image
            source={{ uri: item?.icon || ' ' }}
            style={{ width: 24, height: 24 }}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: layout.spacing.md }}>
          <SnbText2.Paragraph.Small>{item?.name}</SnbText2.Paragraph.Small>
        </View>
        <SnbIcon
          name={
            item?.isSelected
              ? 'check_box_selected'
              : 'check_box_unselect_outline'
          }
          size={24}
          color={
            item?.isSelected ? colorV2.iconColor.red : colorV2.iconColor.default
          }
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1, marginTop: layout.spacing.xxsm }}>
      <View
        style={{
          marginHorizontal: layout.spacing.lg,
          paddingVertical: layout.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: colorV2.bgColor.neutralAlt,
        }}>
        <SnbText2.Headline.Small>
          Produk apa yang Anda jual?
        </SnbText2.Headline.Small>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={() => {
            if (productCategories?.data.length > 0) {
              return (
                <View
                  style={{
                    borderBottomWidth: 0.75,
                    borderColor: colorV2.strokeColor.default,
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
                      paddingVertical: layout.spacing.md,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderRadius: borderV2.radius.lg,
                        borderWidth: 1,
                        borderColor: colorV2.strokeColor.default,
                        padding: layout.spacing.sm,
                      }}>
                      <Image
                        source={require('@image/all_product.png')}
                        style={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    </View>
                    <View
                      style={{ flex: 1, marginHorizontal: layout.spacing.md }}>
                      <SnbText2.Body.Default>
                        Semua Produk
                      </SnbText2.Body.Default>
                    </View>
                    <SnbIcon
                      name={
                        checkBoxStatus === 'indeterminate'
                          ? 'check_box_indeterminate'
                          : 'check_box_unselect_outline'
                      }
                      size={24}
                      color={
                        checkBoxStatus === 'indeterminate'
                          ? colorV2.iconColor.red
                          : colorV2.iconColor.default
                      }
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
          contentContainerStyle={{ paddingHorizontal: layout.spacing.xl }}
          ListEmptyComponent={() => {
            if (productCategories?.loading) {
              return (
                <View style={{ padding: layout.spacing.lg }}>
                  <SnbProgress />
                </View>
              );
            }

            if (productCategories?.error) {
              return (
                <View style={{ padding: layout.spacing.lg }}>
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
            <View
              style={{
                height: 0.75,
                backgroundColor: colorV2.bgColor.neutralAlt,
              }}
            />
          )}
        />
      </View>
      <View style={{ width: '100%', marginVertical: layout.spacing.lg }}>
        <View style={{ marginHorizontal: layout.spacing.lg }}>
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
