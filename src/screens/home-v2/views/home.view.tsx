import React, { FC, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  LayoutRectangle,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  SnbTopNav2,
  colorV2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';

import { BannerHomeView } from '../../banner/views';
import { Benefits, Categories, Brands } from '../components';

import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
import UpgradeVIPAccountBadge from '@screen/account/views/shared/upgrade-vip-account-badge.component';
import {
  copilotOptions,
  ModalStartCoachmark,
} from '@screen/account/views/shared';
import { useDataAuth } from '@core/redux/Data';
import { renderIF } from '@screen/auth/functions';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { NavigationAction } from '@navigation';

const { width, height } = Dimensions.get('window');
const CopilotView = walkthroughable(View);

const HomeView: FC = ({ start }: any) => {
  const [keyword, setKeyword] = useState('');
  const { meV2 } = useDataAuth();
  const tabBarHeight = useBottomTabBarHeight();
  const [vipBadgeLayout, setVipBadgeLayout] = useState<LayoutRectangle>();

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
        icon1Action={() => {
          if (meV2.data === null) {
            NavigationAction.navigate('LoginPhoneView');
          } else {
            NavigationAction.navigate('OmsShoppingCartView');
          }
        }}
        icon2Action={() => {
          if (meV2.data === null) {
            NavigationAction.navigate('LoginPhoneView');
          } else {
            NavigationAction.navigate('NotificationView');
          }
        }}
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
          <UpgradeVIPAccountBadge getLayout={setVipBadgeLayout} />,
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
        <Categories />
        <Brands />
      </ScrollView>
      <ModalStartCoachmark onStartCoachmark={start} />
      {renderIF(
        isBadgeVIPAvailable,
        <>
          <CopilotStep
            text="Dapatkan berbagai manfaat dan kemudahan dalam berbelanja."
            order={3}
            name="Jadi anggota VIP Sinbad">
            <CopilotView
              style={{
                height: vipBadgeLayout?.height,
                position: 'absolute',
                width,
                top: 60 + (StatusBar?.currentHeight || 0),
                zIndex: -1,
              }}
            />
          </CopilotStep>
          <CopilotStep
            text="Semua pesanan yang telah dibuat tersedia di halaman ini."
            order={4}
            name="Lihat Pesanan">
            <CopilotView
              style={[
                styles.pesananCoachmark,
                { height: tabBarHeight, top: height - tabBarHeight },
              ]}
            />
          </CopilotStep>
        </>,
        <CopilotStep
          text="Semua pesanan yang telah dibuat tersedia di halaman ini."
          order={3}
          name="Lihat Pesanan">
          <CopilotView
            style={[
              styles.pesananCoachmark,
              { height: tabBarHeight, top: height - tabBarHeight },
            ]}
          />
        </CopilotStep>,
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pesananCoachmark: {
    width: width * 0.25,
    position: 'absolute',
    left: width * 0.25,
    zIndex: -1,
  },
});

export default copilot(copilotOptions(4, 'homeCoachmark'))(HomeView);
