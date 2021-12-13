import React, { FC } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
  SnbTextSeeMoreType1,
} from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
/** === IMPORT STYLE HERE === */
import UserStyles from '../styles/user.style';
/** === IMPORT FUNCTION HERE === */
import { UserHookFunc } from '../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import LoadingPage from '@core/components/LoadingPage';

const UserView: FC = () => {
  /** === HOOK === */
  const { action, state } = UserHookFunc.useBadgeInformation();
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const { stateUser, dispatchUser } = React.useContext(contexts.UserContext);
  useFocusEffect(
    React.useCallback(() => {
      storeDetailAction.detail(dispatchUser, { id: '' });
    }, []),
  );
  /** === FUNCTION FOR HOOK === */
  const showBadge = (show: boolean) => {
    action(show);
  };
  /** === VIEW === */
  /** => header */
  const header = () => {
    if (stateUser.detail.data) {
      return (
        <SnbTopNav.Type2
          type="red"
          title="Profil"
          iconName={'settings'}
          iconAction={() => NavigationAction.navigate('UserSettingView')}
        />
      );
    }
    return <SnbTopNav.Type1 type="red" title="Profil" />;
  };
  const renderHeaderInformation = () => {
    const data = stateUser.detail.data?.ownerData?.profile;
    const source = data?.imageUrl
      ? { uri: data?.imageUrl }
      : require('../../../assets/images/sinbad_image/avatar.png');
    return (
      <View style={UserStyles.headerInformationContainer}>
        <View style={UserStyles.imageContainer}>
          <Image source={source} style={UserStyles.image} />
        </View>
        <View style={UserStyles.userInfo}>
          <View style={{ marginLeft: -18 }}>
            <SnbTextSeeMoreType1 line={1}>
              <SnbText.B4 color={color.white}>{data?.name}</SnbText.B4>
            </SnbTextSeeMoreType1>
          </View>
          <SnbText.C1 color={color.white}>
            Kelengkapan profil {countPercentageProfileComplete()}%
          </SnbText.C1>
        </View>
      </View>
    );
  };
  const countPercentageProfileComplete = () => {
    const progressDone = stateUser.detail.data?.progress.done || 0;
    const progressTotal = stateUser.detail.data?.progress.total || 0;
    return Math.floor((progressDone / progressTotal) * 100);
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
                onPress: () => console.log('press'),
              },
              {
                icon: (
                  <SnbIconHint
                    iconName={'assignment_complete'}
                    size={24}
                    badgeColor="yellow"
                    iconColor={color.red50}
                  />
                ),
                title: 'Quest',
                subtitle: null,
                onPress: () => NavigationAction.navigate('QuestListView'),
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
    const data = stateUser.detail.data?.progress;
    return (
      <View>
        <View style={{ marginVertical: 16 }}>
          <View style={UserStyles.bodyTitleContainer}>
            <SnbText.B4>Data Pemilik</SnbText.B4>
            <SnbText.B3>{`${data?.ownerProgress.done}/${data?.ownerProgress.total} Selesai`}</SnbText.B3>
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
            <SnbText.B3>{`${data?.storeProgress.done}/${data?.storeProgress.total} Selesai`}</SnbText.B3>
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
    if (stateUser.detail.loading || !stateUser.detail.data) {
      return <LoadingPage />;
    }
    if (stateUser.detail.data) {
      return (
        <View>
          {header()}
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}>
            {contentItem()}
          </ScrollView>
        </View>
      );
    }
  };
  /** this for main view */
  return (
    <View style={{ flex: 1 }}>
      <SnbContainer color={'grey'}>{content()}</SnbContainer>
    </View>
  );
};

export default UserView;
