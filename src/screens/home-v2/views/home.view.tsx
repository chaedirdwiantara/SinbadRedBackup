import React, { FC, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SnbTopNav2, colorV2 } from '@sinbad/react-native-sinbad-ui';

import { BannerHomeView } from '../../banner/views';
import { Benefits, Categories, Brands } from '../components';
import { categories, brands } from '../dummies';

const HomeView: FC = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <SnbTopNav2.Type10
        placeholder="Cari di sinbad"
        icon1Name="cart"
        icon2Name="notification"
        color="red"
        icon1Action={() => console.log('Cart pressed')}
        icon2Action={() => console.log('Notifications pressed')}
        inputValue={keyword}
        onChangeText={(text) => setKeyword(text)}
        onClearText={() => setKeyword('')}
        onEnter={() => console.log('Searched keyword:', keyword)}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colorV2.bgColor.light,
          marginTop: -4,
        }}>
        <View style={{ alignItems: 'center', height: 180 }}>
          <BannerHomeView />
        </View>
        <Benefits />
        <Categories data={categories} />
        <Brands
          data={brands}
          onTitleActionPress={() => console.log('See all brands')}
        />
      </ScrollView>
    </View>
  );
};

export default HomeView;