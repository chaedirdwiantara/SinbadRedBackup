import React, { FC } from 'react';
import { View, ScrollView, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  color,
  SnbText,
  SnbCardButton,
  SnbListButtonType2,
} from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import UserStyles from '../styles/user.style';

const UserView: FC = () => {
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type2
        type="red"
        title="Profil"
        iconName={'settings'}
        iconAction={() => alert('test')}
      />
    );
  };
  const renderHeaderInformation = () => {
    return (
      <View style={UserStyles.headerInformationContainer}>
        <View style={UserStyles.imageContainer}>
          <Image
            source={{
              uri: 'https://dutadamaiyogyakarta.id/wp-content/uploads/2016/06/team-1.jpg',
            }}
            style={UserStyles.image}
          />
        </View>
        <View style={UserStyles.userInfo}>
          <SnbText.B4 color={color.white}>John Doe</SnbText.B4>
          <SnbText.C1 color={color.white}>Kelengkapan profil 50%</SnbText.C1>
        </View>
      </View>
    );
  };
  const renderLoyaltiInformation = () => {
    return (
      <View>
        <View style={UserStyles.headerBackground} />
        <View style={{ marginTop: -40, marginHorizontal: 11 }}>
          <SnbCardButton title={'test'} subTitle1={'test'} />
        </View>
      </View>
    );
  };
  const renderUserInformation = () => {
    return (
      <View>
        <View style={{ marginVertical: 16 }}>
          <View style={UserStyles.bodyTitleContainer}>
            <SnbText.B4>Data Pemilik</SnbText.B4>
            <SnbText.B3>1/8 Selesai</SnbText.B3>
          </View>
          <SnbListButtonType2 title={'Data Diri'} />
        </View>
        <View style={{ marginBottom: 16 }}>
          <View style={UserStyles.bodyTitleContainer}>
            <SnbText.B4>Data Toko</SnbText.B4>
            <SnbText.B3>4/9 Selesai</SnbText.B3>
          </View>
          <SnbListButtonType2 title={'Informasi Toko'} />
          <SnbListButtonType2 title={'Alamat Toko'} />
        </View>
        <View style={{ marginBottom: 16 }}>
          <View style={UserStyles.bodyTitleContainer}>
            <SnbText.B4>Data Supplier</SnbText.B4>
          </View>
          <SnbListButtonType2 title={'Informasi Supplier'} />
        </View>
      </View>
    );
  };
  const contentItem = () => {
    return (
      <>
        {renderHeaderInformation()}
        {renderLoyaltiInformation()}
        {renderUserInformation()}
      </>
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        {contentItem()}
      </ScrollView>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'grey'}>
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default UserView;
