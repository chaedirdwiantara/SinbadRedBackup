import React, { FC, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import {
  SnbTopNav2,
  colorV2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';

import { BannerHomeView } from '../../banner/views';
import { Benefits, Categories, Brands } from '../components';
import { categories, brands } from '../dummies';

import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
import UpgradeVIPAccountBadge from '@screen/account/views/shared/upgrade-vip-account-badge.component';
import {
  copilotOptions,
  ModalStartCoachmark,
} from '@screen/account/views/shared';
import { useDataAuth } from '@core/redux/Data';
import { renderIF } from '@screen/auth/functions';

const { width } = Dimensions.get('window');
const CopilotView = walkthroughable(View);

const HomeView: FC = ({ start }: any) => {
  const [keyword, setKeyword] = useState('');
  const { meV2 } = useDataAuth();

  const isBadgeVIPAvailable =
    typeof meV2.data?.data?.isDataCompleted === 'boolean' &&
    meV2.data?.data?.isDataCompleted === false;

  return (
    <View style={{ flex: 1 }}>
      <CopilotStep
        text="Cari dan temukan produk terbaik untuk stok toko Anda."
        order={1}
        name="Temukan Produk yang Anda inginkan">
        <CopilotView
          style={{
            height: 56,
            position: 'absolute',
            width: '100%',
            marginTop: layout.spacing.xl,
          }}
        />
      </CopilotStep>
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
        {renderIF(
          isBadgeVIPAvailable,
          <CopilotStep
            text="Dapatkan berbagai manfaat dan kemudahan dalam berbelanja."
            order={3}
            name="Jadi anggota VIP Sinbad">
            <CopilotView>
              <UpgradeVIPAccountBadge />
            </CopilotView>
          </CopilotStep>,
        )}
        <CopilotStep
          text="Cek promo terbaik setiap hari biar belanja makin hemat."
          order={2}
          name="Promo terbaik Sinbad">
          <CopilotView>
            <View style={{ alignItems: 'center', height: 180 }}>
              <BannerHomeView />
            </View>
            <Benefits />
          </CopilotView>
        </CopilotStep>
        <Categories data={categories} />
        <Brands
          data={brands}
          onTitleActionPress={() => console.log('See all brands')}
        />
      </ScrollView>
      <ModalStartCoachmark onStartCoachmark={start} />
      <CopilotStep
        text="Semua pesanan yang telah dibuat tersedia di halaman ini."
        order={isBadgeVIPAvailable ? 4 : 3}
        name="Lihat Pesanan">
        <CopilotView
          style={{
            height: 54,
            width: width * 0.25,
            position: 'absolute',
            bottom: -56,
            left: width * 0.25,
          }}
        />
      </CopilotStep>
    </View>
  );
};

export default copilot(copilotOptions(4, 'homeCoachmark'))(HomeView);
