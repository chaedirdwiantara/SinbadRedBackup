import React, { FC } from 'react';
import {
  SnbContainer,
  SnbTopNav,
  SnbListButtonType2,
} from 'react-native-sinbad-ui';
import { ScrollView, View } from 'react-native';
import { NavigationAction } from '@navigation';

const MerchantDetailAccountView: FC = () => {
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title="Akun Toko"
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

export default MerchantDetailAccountView;
