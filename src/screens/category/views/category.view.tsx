/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { FlatList, View, TouchableOpacity, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbSvgIcon,
  color,
  SnbIcon,
} from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import {
  goBack,
  goToProduct,
  useCategoryAction,
  useSetLevel2,
  categoryIndexById,
} from '../functions';
import { contexts } from '@contexts';
/** === IMPORT MODEL HERE === */
import * as models from '@models';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import Menu from '@core/components/Menu';
/** === IMPORT STYLE HERE === */
import CategoryStyle from '../styles/category.style';
/** === COMPONENT === */
const CategoryView: React.FC = () => {
  /** === HOOK === */
  const { params } = NavigationAction.useGetNavParams();
  const { level } = useCategoryAction();
  const { stateCategory, dispatchCategory } = React.useContext(
    contexts.CategoryContext,
  );
  const categoryLevelData = stateCategory.level.list;
  /** === STATE === */
  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    React.useState<number>(0);
  const {
    selectedLevel2Id,
    setSelectLevel2Id,
    selectedSecondLevelIndex,
    setSecondLevelIndex,
  } = useSetLevel2();
  /** === EFFECT === */
  /** => get category level */
  React.useEffect(() => {
    level(dispatchCategory);
  }, []);
  /** => choose default selected after get data */
  React.useEffect(() => {
    setSelectedCategoryIndex(
      categoryIndexById(params.id, categoryLevelData.data),
    );
  }, [categoryLevelData.data.length > 0]);
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Semua Kategori'}
        backAction={() => goBack()}
      />
    );
  };
  /** => global image */
  const globalIcon = (image: string, size: number) => {
    return image ? (
      <Image source={{ uri: image }} style={{ width: size, height: size }} />
    ) : (
      <SnbSvgIcon name="sinbad" size={size} />
    );
  };
  /** => third level item */
  const thirdLevelItem = ({
    item,
    index,
  }: {
    item: models.CategoryLevel3;
    index: number;
  }) => {
    return item ? (
      <TouchableOpacity
        key={index}
        onPress={() =>
          goToProduct(
            item,
            selectedCategoryIndex,
            selectedSecondLevelIndex as number,
            index,
          )
        }
        style={CategoryStyle.level3layoutItem}>
        {globalIcon(item.icon, 64)}
        <View style={{ marginTop: 4 }}>
          <SnbText.C1 align={'center'}>{item.name}</SnbText.C1>
        </View>
      </TouchableOpacity>
    ) : (
      <View />
    );
  };
  /** => second level item */
  const secondLevelItem = ({
    item,
    index,
  }: {
    item: models.CategoryLevel2;
    index: number;
  }) => {
    return (
      <View style={{ paddingBottom: 8 }}>
        <TouchableOpacity
          activeOpacity={1}
          key={index}
          style={
            item.id === selectedLevel2Id
              ? CategoryStyle.level2LayoutActive
              : CategoryStyle.level2LayoutInactive
          }
          onPress={() => {
            if (item.hasChild) {
              setSelectLevel2Id(item.id);
              setSecondLevelIndex(index);
            } else {
              goToProduct(item, selectedCategoryIndex, index);
            }
          }}>
          {globalIcon(item.icon, 32)}
          <View style={{ marginLeft: 8 }}>
            <SnbText.B3>{item.name}</SnbText.B3>
          </View>
          {item.hasChild ? (
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {item.id === selectedLevel2Id ? (
                <SnbIcon name={'expand_more'} size={24} color={color.black40} />
              ) : (
                <SnbIcon name={'expand_less'} size={24} color={color.black40} />
              )}
            </View>
          ) : (
            <View />
          )}
        </TouchableOpacity>
        {thirdLevel(item)}
      </View>
    );
  };
  /** => first level item */
  const firstLevelItem = ({
    item,
    index,
  }: {
    item: models.CategoryLevel;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={index}
        style={{
          padding: 16,
          borderWidth: 0,
          backgroundColor:
            index === selectedCategoryIndex ? color.white : color.black10,
        }}
        onPress={() =>
          item.hasChild ? setSelectedCategoryIndex(index) : goToProduct(item)
        }>
        <View style={{ alignItems: 'center', width: 80 }}>
          {globalIcon(item.icon, 32)}
          <View style={{ marginTop: 8 }}>
            <SnbText.C2 align={'center'}>{item.name}</SnbText.C2>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  /** => third level */
  const thirdLevel = (item: models.CategoryLevel2) => {
    const additionalData = [
      {
        id: item.id,
        name: 'Lihat Semua',
        icon: 'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/semua+kategori%403x.png',
        hasChild: false,
        child: [],
      },
    ];
    return item.hasChild && selectedLevel2Id === item.id ? (
      <View style={CategoryStyle.level3layout}>
        <Menu
          data={[...additionalData, ...item.child]}
          column={3}
          renderItem={thirdLevelItem}
        />
      </View>
    ) : (
      <View />
    );
  };
  /** => second level */
  const secondLevel = () => {
    const data = categoryLevelData.data[selectedCategoryIndex].child;
    return data.length > 0 ? (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 100, padding: 16 }}
          data={data}
          renderItem={secondLevelItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    ) : (
      <View />
    );
  };
  /** => first level */
  const firstLevel = () => {
    return (
      <View>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 100,
            backgroundColor: color.black10,
          }}
          data={categoryLevelData.data}
          renderItem={firstLevelItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  /** => content */
  const content = () => {
    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {firstLevel()}
        {secondLevel()}
      </View>
    );
  };
  /** => loading */
  const loading = () => {
    return (
      <View>
        <SnbText.B1>loading</SnbText.B1>
      </View>
    );
  };
  /** => process */
  const process = () => {
    return categoryLevelData.loading || categoryLevelData.data.length === 0
      ? loading()
      : content();
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {process()}
    </SnbContainer>
  );
};

export default CategoryView;
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
