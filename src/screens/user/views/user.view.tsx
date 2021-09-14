import React, { FC, useEffect } from 'react';
import { View, ScrollView, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  color,
  SnbText,
  SnbIconHint,
  SnbListButtonType2,
  SnbCardMultiButtonType1,
  SnbCardButtonType2,
  SnbSvgIcon,
} from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
import Svg from '@svg';
/** === IMPORT STYLE HERE === */
import UserStyles from '../styles/user.style';
/** === IMPORT FUNCTION HERE === */
import { UserHookFunc } from '../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';

const UserView: FC = () => {
  /** === HOOK === */
  const { action, state } = UserHookFunc.useBadgeInformation();
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const { stateUser, dispatchUser } = React.useContext(contexts.UserContext);
  useEffect(() => {
    storeDetailAction.detail(dispatchUser, '1');
  }, []);
  /** === FUNCTION FOR HOOK === */
  const showBadge = (show: boolean) => {
    action(show);
  };
  /** === VIEW === */
  console.log('storeDetail:', stateUser);

  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type2
        type="red"
        title="Profil"
        iconName={'settings'}
        iconAction={() => NavigationAction.navigate('UserSettingView')}
      />
    );
  };
  const renderHeaderInformation = () => {
    const data = stateUser.detail.data?.ownerData?.profile;
    return (
      <View style={UserStyles.headerInformationContainer}>
        <View style={UserStyles.imageContainer}>
          {data?.imageUrl ? (
            <Image source={{ uri: data.imageUrl }} style={UserStyles.image} />
          ) : (
            <Svg name={'avatar'} size={50} color={color.red50} />
          )}
        </View>
        <View style={UserStyles.userInfo}>
          <SnbText.B4 color={color.white}>{data?.name}</SnbText.B4>
          <SnbText.C1 color={color.white}>Kelengkapan profil 50%</SnbText.C1>
        </View>
      </View>
    );
  };
  const renderLoyaltiInformation = () => {
    return (
      <View>
        <View style={UserStyles.headerBackground} />
        <View style={{ marginTop: -40, marginHorizontal: -10 }}>
          <SnbCardMultiButtonType1
            buttonList={[
              {
                icon: <SnbSvgIcon name={'sinbad_coin'} size={24} />,
                title: 'Sinbad Point',
                subtitle: '1000 Point',
                onPress: () => storeDetailAction.detail(dispatchUser, '1'),
              },
              {
                icon: (
                  <SnbIconHint
                    iconName={'warehouse'}
                    size={24}
                    badgeColor="yellow"
                    iconColor={color.red50}
                  />
                ),
                title: 'Voucher Untukmu',
                subtitle: null,
                onPress: () => console.log('pressed'),
              },
            ]}
          />
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
          <SnbListButtonType2
            title={'Data Diri'}
            onPress={() =>
              NavigationAction.navigate('MerchantDetailProfileView')
            }
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <View style={UserStyles.bodyTitleContainer}>
            <SnbText.B4>Data Toko</SnbText.B4>
            <SnbText.B3>4/9 Selesai</SnbText.B3>
          </View>
          <SnbListButtonType2
            title={'Informasi Toko'}
            onPress={() =>
              NavigationAction.navigate('MerchantDetailInformationView')
            }
          />
          <SnbListButtonType2
            title={'Alamat Toko'}
            onPress={() =>
              NavigationAction.navigate('MerchantDetailAddressView')
            }
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <View style={UserStyles.bodyTitleContainer}>
            <SnbText.B4>Data Supplier</SnbText.B4>
          </View>
          <SnbListButtonType2
            title={'Informasi Supplier'}
            onPress={() =>
              NavigationAction.navigate('MerchantSupplierInformationView')
            }
          />
        </View>
      </View>
    );
  };
  const renderBadgeInformation = () => {
    if (state) {
      return (
        <View>
          <SnbCardButtonType2
            text={
              'Lengkapi profile untuk menjadikan Anda User Verified dan dapatkan fasilitas menarik'
            }
            leftItem={<SnbSvgIcon name={'verified_user'} size={24} />}
            rightIcon={'x'}
            onPress={() => showBadge(!state)}
          />
        </View>
      );
    }
  };
  const contentItem = () => {
    return (
      <>
        {renderHeaderInformation()}
        {renderLoyaltiInformation()}
        {renderBadgeInformation()}
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
    <SnbContainer color={'white'}>
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default UserView;
