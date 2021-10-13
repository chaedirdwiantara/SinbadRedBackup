/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { BrandCard } from '@core/components/BrandCard';
import { goBack, useBrandAction } from '../functions';
import { contexts } from '@contexts';
import LoadingPage from '@core/components/LoadingPage';
import * as models from '@models';

const { width } = Dimensions.get('window');
console.log('width', width);

/** === COMPONENT === */
const BannerView: React.FC = () => {
  /** === HOOK === */
  const { stateBrand, dispatchBrand } = React.useContext(contexts.BrandContext);
  const brandAction = useBrandAction();
  const brandListState = stateBrand.list;
  // console.log('stateBrand', stateBrand);
  /** => effect */
  React.useEffect(() => {
    console.log('RUN BRAND LIST');
    brandAction.list(dispatchBrand);
    return () => {
      console.log('RESET BRAND LIST');
      brandAction.reset(dispatchBrand);
    };
  }, []);

  const onHandleLoadMore = () => {
    if (stateBrand.list.data.length < stateBrand.list.total) {
      brandAction.loadMore(dispatchBrand, stateBrand.list);
    }
  };
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Brand Kami'}
        backAction={() => goBack()}
      />
    );
  };
  const renderBrandCard = ({
    item,
    index,
  }: {
    item: models.BrandListSuccessProps;
    index: number;
  }) => (
    <View key={index} style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
      <BrandCard
        id={item.id}
        imageUrl={item.image}
        height={0.25 * width}
        width={0.21 * width}
        onCardPress={() => console.log(`${item.image} pressed`)}
      />
    </View>
  );
  /** => Brand List */
  const renderBrandList = () => {
    return (
      <FlatList
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 0.01 * width,
        }}
        showsHorizontalScrollIndicator
        data={brandListState.data}
        renderItem={renderBrandCard}
        keyExtractor={(item) => item.id}
        numColumns={4}
        onEndReachedThreshold={0.1}
        onEndReached={onHandleLoadMore()}
      />
    );
  };
  /** => content */
  const content = () => {
    return (
      <View>
        {!brandListState.loading && brandListState.data.length !== 0 ? (
          <View>{renderBrandList()}</View>
        ) : (
          <LoadingPage />
        )}
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default BannerView;
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
