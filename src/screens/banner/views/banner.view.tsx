/** === IMPORT PACKAGE HERE ===  */
import React, { useContext, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  color,
  SnbIcon,
  SnbTextField,
} from 'react-native-sinbad-ui';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { goBack, goToBannerDetail, useBannerAction } from '../functions';
import { contexts } from '@contexts';
import * as models from '@models';
import LoadingPage from '@core/components/LoadingPage';
import { BannerStyles } from '../styles';

const { width } = Dimensions.get('window');

/** === COMPONENT === */
const BannerListView: React.FC = () => {
  /** === STATE === */
  const [searchText, setSearchText] = useState('');
  const { stateBanner, dispatchBanner } = useContext(contexts.BannerContext);
  const bannerAction = useBannerAction();
  const bannerlistState = stateBanner.list;
  /** === HOOK === */
  /** => effect */
  useEffect(() => {
    bannerAction.list(dispatchBanner, searchText);
  }, []);
  console.log('bannerlistState', bannerlistState);
  /** === FUNCTION === */
  /** => handle load more */
  const onHandleLoadMore = () => {
    if (stateBanner.list.data) {
      if (stateBanner.list.data.length < stateBanner.list.total) {
        bannerAction.loadMore(dispatchBanner, stateBanner.list);
      }
    }
  };
  /** => handle search */
  const onHandleSearch = () => {
    bannerAction.list(dispatchBanner, searchText);
  };
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Penawaran Nasional'}
        backAction={() => goBack()}
      />
    );
  };

  /** => search */
  const search = () => {
    return (
      <View style={BannerStyles.search}>
        <SnbTextField.Text
          noBorder
          value={searchText}
          type={'default'}
          placeholder="Cari di Sinbad"
          onChangeText={(text) => setSearchText(text)}
          clearText={() => setSearchText('')}
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="search"
          enter={() => onHandleSearch()}
          prefixIconName="search"
          suffixIconName={searchText !== '' ? 'cancel' : ''}
        />
      </View>
    );
  };

  /** => banner card */
  const renderBannerCard = ({
    item,
  }: {
    item: models.BannerListSuccessProps;
    index: number;
  }) => {
    const sourceHtml = {
      html: item.description,
    };
    return (
      <View style={BannerStyles.bannerCardContainer}>
        {/* Image */}
        <View>
          <Image
            defaultSource={require('../../../assets/images/banner/sinbad-loading-image-banner.png')}
            style={BannerStyles.imageCard}
            source={{
              uri: item.imageUrl,
            }}
          />
        </View>
        {/* Info */}
        <View style={{ padding: 16, backgroundColor: 'white' }}>
          <SnbText.B2>{item.header}</SnbText.B2>
          <View style={{ marginTop: 8 }}>
            <RenderHtml contentWidth={width} source={sourceHtml} />
          </View>
        </View>
        {/* Foter */}
        <View style={BannerStyles.footerCardBanner}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SnbIcon name={'calender'} color={color.black60} size={16} />
            <View style={{ marginLeft: 7 }}>
              <SnbText.C1 color={color.black60}>
                Berlaku sampai {moment(item.activeTo).format('DD MMM YYYY')}
              </SnbText.C1>
            </View>
          </View>
          {item.bannerType === 'general' ? (
            <TouchableOpacity
              style={BannerStyles.buttonDetail}
              onPress={() => goToBannerDetail(item.id)}>
              <SnbText.B2 color={'white'}>Detail</SnbText.B2>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  };

  /** => Banner List */
  const renderBannerList = () => {
    return (
      <FlatList
        data={bannerlistState.data}
        renderItem={renderBannerCard}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={onHandleLoadMore}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 0.04 * width,
        }}
      />
    );
  };

  /** => content */
  const content = () => {
    return (
      <View style={{ flex: 1 }}>
        {!bannerlistState.loading && bannerlistState.data.length > 0 ? (
          <View>{renderBannerList()}</View>
        ) : (
          <View />
        )}
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {search()}
      {bannerlistState.loading ? <LoadingPage /> : content()}
    </SnbContainer>
  );
};

export default BannerListView;
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
