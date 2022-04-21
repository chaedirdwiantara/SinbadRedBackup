import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { SnbTopNav2 } from '@sinbad/react-native-sinbad-ui';

import { BannerHomeView } from '../../banner/views';

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
      <View
        style={{
          alignItems: 'center',
          marginTop: -4,
          height: 180,
        }}>
        <BannerHomeView />
      </View>
    </View>
  );
};

export default HomeView;
