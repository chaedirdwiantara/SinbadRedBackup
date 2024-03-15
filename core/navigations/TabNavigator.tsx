import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import { View, Platform } from 'react-native';
import { HomeView } from '@screen/home-v2/views';
import { OrderHistoryListView } from '@screen/order-history/views';
import { HelpView } from '@screen/help/views';
import { UserView } from '@screen/user/views';
import { SnbIconHint2, SnbText2, colorV2 } from 'react-native-sinbad-ui';
import { NavigationAction } from '../functions/navigation';
import { useDataAuth } from '@core/redux/Data';

const { Navigator, Screen } = createBottomTabNavigator();
enableScreens();

const TabNavigator = () => {
  // const data = useSelector((state: RootState) => state.oms);
  const { me } = useDataAuth();
  return (
    <Navigator
      detachInactiveScreens
      tabBarOptions={{
        allowFontScaling: true,
        activeTintColor: colorV2.iconColor.dark,
        inactiveTintColor: colorV2.iconColor.default,
        style: { height: Platform.OS === 'ios' ? '10%' : 58 },
      }}>
      <Screen
        name="HomeView"
        component={HomeView}
        options={{
          tabBarTestID: 'menuBar.beranda',
          tabBarAccessibilityLabel: 'menuBar.beranda',
          tabBarLabel: ({ color }) => (
            <View style={{ paddingBottom: 8 }}>
              <SnbText2.Caption.Small color={color} testID={'menuBar.beranda'}>
                Beranda
              </SnbText2.Caption.Small>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <View style={{ paddingTop: 8 }}>
              <View style={{ height: 24 }}>
                <SnbIconHint2
                  testID="menuBar.beranda"
                  value={0}
                  iconColor={color}
                  iconName="home"
                  size={24}
                />
              </View>
            </View>
          ),
        }}
      />
      <Screen
        name="HistoryListView"
        component={OrderHistoryListView}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            if (me.data === null) {
              NavigationAction.navigate('LoginPhoneView');
            } else {
              NavigationAction.navigate('HistoryListView');
            }
          },
        })}
        options={{
          tabBarTestID: 'menuBar.pesanan',
          tabBarAccessibilityLabel: 'menuBar.pesanan',
          tabBarLabel: ({ color }) => (
            <View style={{ paddingBottom: 8 }}>
              <SnbText2.Caption.Small color={color} testID={'menuBar.pesanan'}>
                Pesanan
              </SnbText2.Caption.Small>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <View style={{ paddingTop: 8 }}>
              <SnbIconHint2
                testID="menuBar.pesanan"
                value={0}
                iconColor={color}
                iconName="log_history"
                size={24}
              />
            </View>
          ),
        }}
      />
      <Screen
        name="HelpView"
        component={HelpView}
        options={{
          tabBarTestID: 'menuBar.bantuan',
          tabBarAccessibilityLabel: 'menuBar.bantuan',
          tabBarLabel: ({ color }) => (
            <View style={{ paddingBottom: 8 }}>
              <SnbText2.Caption.Small color={color} testID={'menuBar.bantuan'}>
                Bantuan
              </SnbText2.Caption.Small>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <View style={{ paddingTop: 8 }}>
              <SnbIconHint2
                testID="menuBar.bantuan"
                value={0}
                iconColor={color}
                iconName="help"
                size={24}
              />
            </View>
          ),
        }}
      />
      <Screen
        name="UserView"
        component={UserView}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            if (me.data === null) {
              NavigationAction.navigate('OnBoardingView');
            } else {
              NavigationAction.navigate('UserView');
            }
          },
        })}
        options={{
          tabBarTestID: 'menuBar.profil',
          tabBarAccessibilityLabel: 'menuBar.profil',
          tabBarLabel: ({ color }) => (
            <View style={{ paddingBottom: 8 }}>
              <SnbText2.Caption.Small color={color} testID={'menuBar.profil'}>
                Profil
              </SnbText2.Caption.Small>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <View style={{ paddingTop: 8 }}>
              <SnbIconHint2
                testID="menuBar.profil"
                value={0}
                iconColor={color}
                iconName="person_circle"
                size={24}
              />
            </View>
          ),
        }}
      />
    </Navigator>
  );
};

export default TabNavigator;
