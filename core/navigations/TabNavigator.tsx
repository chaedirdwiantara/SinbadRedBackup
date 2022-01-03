import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import { View, Platform } from 'react-native';
import { HomeView } from '@screen/home/views';
import { HistoryListView } from '@screen/history/views';
import { HelpView } from '@screen/help/views';
import { UserView } from '@screen/user/views';
import FastOrderView from '../components/FastOrderView';
import {
  color as colors,
  SnbText,
  SnbIconHint,
  SnbSvgIcon,
} from 'react-native-sinbad-ui';
import { RootState } from '@reducer/index';
import { NavigationAction } from '../functions/navigation';

const { Navigator, Screen } = createBottomTabNavigator();
enableScreens();

const TabNavigator = () => {
  // const data = useSelector((state: RootState) => state.oms);

  return (
    <Navigator
      detachInactiveScreens
      tabBarOptions={{
        allowFontScaling: true,
        activeTintColor: colors.red50,
        inactiveTintColor: colors.black40,
        style: { height: Platform.OS === 'ios' ? '10%' : 54 },
      }}>
      <Screen
        name="HomeView"
        component={HomeView}
        options={{
          tabBarLabel: ({ color }) => (
            <View style={{ paddingBottom: 8 }}>
              <SnbText.C1 color={color}>Beranda</SnbText.C1>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <View style={{ paddingTop: 8 }}>
              <View style={{ height: 24 }}>
                <SnbIconHint
                  badgeColor="red"
                  iconName="beranda"
                  size={24}
                  iconColor={color}
                  dotShow={false}
                />
              </View>
            </View>
          ),
        }}
      />
      <Screen
        name="HistoryListView"
        component={HistoryListView}
        options={{
          tabBarLabel: ({ color }) => (
            <View style={{ paddingBottom: 8 }}>
              <SnbText.C1 color={color}>Pesanan</SnbText.C1>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <View style={{ paddingTop: 8 }}>
              <SnbIconHint
                badgeColor="red"
                iconName="pesanan"
                size={24}
                iconColor={color}
                dotShow={false}
              />
            </View>
          ),
        }}
      />
      <Screen
        name="FastOrderView"
        component={FastOrderView}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            NavigationAction.navigate('OmsShoppingCartView');
          },
        })}
        options={{
          tabBarLabel: () => (
            <View style={{ alignItems: 'center', paddingBottom: 8 }}>
              <SnbText.C2 color={colors.black80}>Langsung</SnbText.C2>
              <SnbText.C2 color={colors.black80}>Pesan</SnbText.C2>
            </View>
          ),
          tabBarIcon: () => (
            <View style={{ paddingBottom: 30 }}>
              <SnbSvgIcon name="sinbad" size={40} />
            </View>
          ),
        }}
      />
      <Screen
        name="HelpView"
        component={HelpView}
        options={{
          tabBarLabel: ({ color }) => (
            <View style={{ paddingBottom: 8 }}>
              <SnbText.C1 color={color}>Bantuan</SnbText.C1>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <View style={{ paddingTop: 8 }}>
              <SnbIconHint
                badgeColor="red"
                iconName="bantuan"
                size={24}
                iconColor={color}
                dotShow={false}
              />
            </View>
          ),
        }}
      />
      <Screen
        name="UserView"
        component={UserView}
        options={{
          tabBarLabel: ({ color }) => (
            <View style={{ paddingBottom: 8 }}>
              <SnbText.C1 color={color}>Profil</SnbText.C1>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <View style={{ paddingTop: 8 }}>
              <SnbIconHint
                badgeColor="red"
                iconName="profil"
                size={24}
                iconColor={color}
                dotShow={false}
              />
            </View>
          ),
        }}
      />
    </Navigator>
  );
};

export default TabNavigator;
