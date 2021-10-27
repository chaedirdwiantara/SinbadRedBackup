/** === IMPORT PACKAGES === */
import React, { FC, Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import {
  goBack,
  goToHome,
  goToSearch,
  goToShoppingCart,
} from '@core/functions/product';
/** === IMPORT tYPE === */
import { ProductHeaderType } from './product-list-core.type';
/** === TYPE === */
interface NavigationHeaderProps {
  type?: ProductHeaderType;
  title?: string;
  setSearchKeyword?: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}
/** === COMPONENT === */
const NavigationHeader: FC<NavigationHeaderProps> = ({
  type = 'default',
  title,
  setSearchKeyword,
  onSearch,
}) => {
  /** === VIEW === */
  /** => Default Header */
  const renderDefaultHeader = () => (
    <SnbTopNav.Type6
      title={title as string}
      backAction={goBack}
      type="red"
      icon1Name="search"
      icon1Action={goToSearch}
      icon2Value={100}
      icon2Name="cart"
      icon2Action={goToShoppingCart}
    />
  );
  /** => Search Header */
  const renderSearchHeader = () => (
    <SnbTopNav.Type8
      type="red"
      placeholder="Cari di Sinbad"
      clearText={() => setSearchKeyword!('')}
      enter={onSearch}
      goToSearch={goToSearch}
      onChangeText={(keyword) => setSearchKeyword!(keyword)}
      icon1Name="home"
      icon1Action={goToHome}
      icon2Value={100}
      icon2Name="cart"
      icon2Action={goToShoppingCart}
    />
  );
  /** => Main */
  return (
    <View>
      {type === 'default' ? renderDefaultHeader() : renderSearchHeader()}
    </View>
  );
};

export default NavigationHeader;
