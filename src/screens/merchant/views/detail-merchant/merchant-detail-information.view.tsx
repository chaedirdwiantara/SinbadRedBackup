import React, { FC, useEffect } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbListButtonType2,
} from 'react-native-sinbad-ui';
import { ScrollView, View, BackHandler } from 'react-native';
import { NavigationAction } from '@navigation';

const MerchantDetailInformationView: FC = () => {
  //hardware back handler
  useEffect(() => {
    const backAction = () => {
      NavigationAction.back();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title="Informasi Toko"
        backAction={() => NavigationAction.back()}
      />
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <View>
          <SnbListButtonType2
            title={'Akun Toko'}
            onPress={() =>
              NavigationAction.navigate('MerchantDetailAccountView')
            }
          />
          <SnbListButtonType2
            title={'Kelengkapan Informasi Toko'}
            onPress={() =>
              NavigationAction.navigate('MerchantEditView', {
                title: 'Kelengkapan Informasi Toko',
                type: 'merchantCompletenessInformation',
              })
            }
          />
        </View>
      </ScrollView>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'white'}>
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default MerchantDetailInformationView;
