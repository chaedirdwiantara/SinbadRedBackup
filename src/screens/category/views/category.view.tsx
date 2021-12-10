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
import { CategoryListSkeleton } from './CategoryListSkeleton';
/** === IMPORT FUNCTIONS === */
import { useCategoryContext } from 'src/data/contexts/category/useCategoryContext';
import {
  goBack,
  goToProduct,
  getCategory1stLevelIndex,
  useCategoryAction,
  useSelected2ndLevelCategory,
} from '../functions';
import { Images } from 'src/assets';
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
      <Image
        defaultSource={Images.opacityPlaceholder}
        source={{ uri: image }}
        style={{ width: size, height: size }}
      />
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
        item.children.length > 0
          ? setSelected1stLevelIndex(index)
          : goToProduct(item)
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
      item.id === selected2ndLevelId ? 'expand_less' : 'expand_more';

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
            if (item.children.length > 0) {
              handle2ndLevelIdChange(item.id);
              handle2ndLevelIndexChange(index);
            } else {
              goToProduct(item, selected1stLevelIndex, index);
            }
          }}>
          {globalIcon(item.icon, 32)}
          <View style={{ marginLeft: 8, flex: 1 }}>
            <SnbText.B3>{item.name}</SnbText.B3>
          </View>
          {item.children.length > 0 && (
            <SnbIcon name={iconName} size={24} color={color.black40} />
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
    total,
  }: {
    item: models.CategoryLevel3;
    index: number;
    total: number;
  }) => {
    // Set 2nd level category name if "Lihat Semua" is clicked
    const categoryName =
      index === 0
        ? categoryLevelState.data[selected1stLevelIndex].children[
            selected2ndLevelIndex ?? 0
          ].name
        : item?.name;
    const rowNumber = Math.ceil((index + 1) / 3);
    const totalAtRow = rowNumber * 3;
    let flexStyle: any = {};

    if (total >= totalAtRow) {
      flexStyle.flex = 1;
    }

    return (
      item && (
        <TouchableOpacity
          key={index}
          onPress={() =>
            goToProduct(
              { ...item, name: categoryName },
              selected1stLevelIndex,
              selected2ndLevelIndex as number,
              index,
            )
          }
          style={[
            CategoryStyle.level3layoutItem,
            {
              marginLeft: index === 0 || index % 3 === 0 ? 0 : 8,
              ...flexStyle,
            },
          ]}>
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
    const seeAllCategory: models.CategoryLevel3 = {
      id: item.id,
      name: 'Lihat Semua',
      icon: 'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/semua+kategori%403x.png',
    };

    return (
      item.children.length > 0 &&
      selected2ndLevelId === item.id && (
        <View style={CategoryStyle.level3layout}>
          {[seeAllCategory, ...item.children].map((category, categoryIndex) =>
            renderThirdLevelItem({
              item: category,
              index: categoryIndex,
              total: item.children.length + 1, // +1 from seeAllCategory
            }),
          )}
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
        <CategoryListSkeleton />
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
            categoryLevelState.data[selected1stLevelIndex]?.children.length >
              0 && (
              <View style={{ flex: 1 }}>
                <FlatList
                  contentContainerStyle={{ paddingBottom: 100, padding: 16 }}
                  data={categoryLevelState.data[selected1stLevelIndex].children}
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
