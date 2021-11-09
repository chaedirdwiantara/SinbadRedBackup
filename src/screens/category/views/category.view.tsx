/** === IMPORT PACKAGES ===  */
import React, { useState, useEffect } from 'react';
import { FlatList, View, TouchableOpacity, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbSvgIcon,
  color,
  SnbIcon,
} from 'react-native-sinbad-ui';
import { RouteProp, useRoute } from '@react-navigation/native';
/** === IMPORT COMPONENT === */
import Menu from '@core/components/Menu';
/** === IMPORT FUNCTIONS === */
import { useCategoryContext } from 'src/data/contexts/category/useCategoryContext';
import {
  goBack,
  goToProduct,
  getCategory1stLevelIndex,
  useCategoryAction,
  useSelected2ndLevelCategory,
} from '../functions';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === IMPORT STYLE === */
import CategoryStyle from '../styles/category.style';
/** === TYPES === */
type CategoryRouteParams = {
  Category: {
    categoryId?: string;
  };
};

type CategoryRouteProps = RouteProp<CategoryRouteParams, 'Category'>;
/** === COMPONENT === */
const CategoryView: React.FC = () => {
  /** === HOOKS === */
  const { params } = useRoute<CategoryRouteProps>();
  const { fetchList } = useCategoryAction();
  const {
    stateCategory: {
      level: { list: categoryLevelState },
    },
    dispatchCategory,
  } = useCategoryContext();
  const [selected1stLevelIndex, setSelected1stLevelIndex] = useState(0);
  const {
    selected2ndLevelId,
    selected2ndLevelIndex,
    handle2ndLevelIdChange,
    handle2ndLevelIndexChange,
  } = useSelected2ndLevelCategory();

  useEffect(() => {
    fetchList(dispatchCategory);
  }, []);

  // Set default selected category 1st level index after data is fetched
  useEffect(() => {
    if (categoryLevelState.data.length > 0) {
      setSelected1stLevelIndex(
        getCategory1stLevelIndex(categoryLevelState.data, params?.categoryId),
      );
    }
  }, [categoryLevelState.data.length]);
  /** === VIEW === */
  /** => Global Icon */
  const globalIcon = (image: string, size: number) => {
    return image ? (
      <Image source={{ uri: image }} style={{ width: size, height: size }} />
    ) : (
      <SnbSvgIcon name="sinbad" size={size} />
    );
  };
  /** => First Level Item */
  const renderFirstLevelItem = ({
    item,
    index,
  }: {
    item: models.CategoryLevel;
    index: number;
  }) => (
    <TouchableOpacity
      activeOpacity={1}
      key={index}
      style={{
        padding: 16,
        borderWidth: 0,
        backgroundColor:
          index === selected1stLevelIndex ? color.white : color.black10,
      }}
      onPress={() =>
        item.hasChild ? setSelected1stLevelIndex(index) : goToProduct(item)
      }>
      <View style={{ alignItems: 'center', width: 80 }}>
        {globalIcon(item.icon, 32)}
        <View style={{ marginTop: 8 }}>
          <SnbText.C2 align={'center'}>{item.name}</SnbText.C2>
        </View>
      </View>
    </TouchableOpacity>
  );
  /** => Second Level Item */
  const renderSecondLevelItem = ({
    item,
    index,
  }: {
    item: models.CategoryLevel2;
    index: number;
  }) => {
    const iconName =
      item.id === selected2ndLevelId ? 'expand_more' : 'expand_less';

    return (
      <View style={{ paddingBottom: 8 }}>
        <TouchableOpacity
          activeOpacity={1}
          key={index}
          style={
            item.id === selected2ndLevelId
              ? CategoryStyle.level2LayoutActive
              : CategoryStyle.level2LayoutInactive
          }
          onPress={() => {
            if (item.hasChild) {
              handle2ndLevelIdChange(item.id);
              handle2ndLevelIndexChange(index);
            } else {
              goToProduct(item, selected1stLevelIndex, index);
            }
          }}>
          {globalIcon(item.icon, 32)}
          <View style={{ marginLeft: 8 }}>
            <SnbText.B3>{item.name}</SnbText.B3>
          </View>
          {item.hasChild && (
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <SnbIcon name={iconName} size={24} color={color.black40} />
            </View>
          )}
        </TouchableOpacity>
        {renderthirdLevelList(item)}
      </View>
    );
  };
  /** => Third Level Item */
  const renderThirdLevelItem = ({
    item,
    index,
  }: {
    item: models.CategoryLevel3;
    index: number;
  }) => {
    return (
      item && (
        <TouchableOpacity
          key={index}
          onPress={() =>
            goToProduct(
              item,
              selected1stLevelIndex,
              selected2ndLevelIndex as number,
              index,
            )
          }
          style={CategoryStyle.level3layoutItem}>
          {globalIcon(item.icon, 64)}
          <View style={{ marginTop: 4 }}>
            <SnbText.C1 align={'center'}>{item.name}</SnbText.C1>
          </View>
        </TouchableOpacity>
      )
    );
  };
  /** => Third Level List */
  const renderthirdLevelList = (item: models.CategoryLevel2) => {
    const additionalData = [
      {
        id: item.id,
        name: 'Lihat Semua',
        icon: 'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/semua+kategori%403x.png',
        hasChild: false,
        child: [],
      },
    ];

    return (
      item.hasChild &&
      selected2ndLevelId === item.id && (
        <View style={CategoryStyle.level3layout}>
          <Menu
            data={[...additionalData, ...item.child]}
            column={3}
            renderItem={renderThirdLevelItem}
          />
        </View>
      )
    );
  };
  /** => Main */
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        type="red"
        title={'Semua Kategori'}
        backAction={goBack}
      />
      {categoryLevelState.loading || categoryLevelState.data.length === 0 ? (
        <View>
          <SnbText.B1>loading</SnbText.B1>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* First Level List */}
          <View>
            <FlatList
              contentContainerStyle={{
                paddingBottom: 100,
                backgroundColor: color.black10,
              }}
              data={categoryLevelState.data}
              renderItem={renderFirstLevelItem}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {
            // Second Level List
            categoryLevelState.data[selected1stLevelIndex]?.child.length >
              0 && (
              <View style={{ flex: 1 }}>
                <FlatList
                  contentContainerStyle={{ paddingBottom: 100, padding: 16 }}
                  data={categoryLevelState.data[selected1stLevelIndex].child}
                  renderItem={renderSecondLevelItem}
                  keyExtractor={(_, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )
          }
        </View>
      )}
    </SnbContainer>
  );
};

export default CategoryView;
