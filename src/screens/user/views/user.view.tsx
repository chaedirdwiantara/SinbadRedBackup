import React, { FC, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
  SnbButton,
  SnbDialog,
} from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
/** === IMPORT STYLE HERE === */
import UserStyles from '../styles/user.style';
/** === IMPORT FUNCTION HERE === */
import { UserHookFunc } from '../functions';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import { ModalUserProfileCompletion } from './modal-user-profile-completion.view';
import LoadingPage from '@core/components/LoadingPage';
import { setErrorMessage, useAuthAction } from '@screen/auth/functions';
import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
import { copilotOptions } from '@screen/account/views/shared';
import { useCoachmark } from '@screen/account/functions';

const CopilotView = walkthroughable(View);

/** === INTERFACE === */
interface NavigationParams {
  isProfileCompletionCart: boolean;
}

const UserView: FC = ({ start }: any) => {
  /** === HOOK === */
  const { action, state } = UserHookFunc.useBadgeInformation();
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const { stateUser, dispatchUser } = React.useContext(contexts.UserContext);
  const { logout } = useAuthAction();
  const { reset } = useNavigation();
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const { coachmarkState } = useCoachmark();

  // usage for show modal
  const [modalUserProfileCompletion, setModalUserProfileCompletion] = React.useState(false);
  const isProfileCompletionCart = NavigationAction.useGetNavParams<NavigationParams>()?.params?.isProfileCompletionCart;
  console.log(isProfileCompletionCart);

  useFocusEffect(
    React.useCallback(() => {
      storeDetailAction.detail(dispatchUser);
    }, []),
  );

  /** === FUNCTION FOR HOOK === */
  const showBadge = (show: boolean) => {
    action(show);
  };

  //function for start couchmark
  useEffect(() => {
    if (typeof coachmarkState.data?.profileCoachmark === 'boolean') {
      if (coachmarkState?.data?.profileCoachmark === false) {
        setTimeout(() => {
          start();
        }, 100);
      }
    }
  }, [coachmarkState?.data?.profileCoachmark]);
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
      <View style={{ marginBottom: 90 }}>
        <CopilotStep
          text="Atur identitas diri dan toko Anda dengan mudah disini."
          order={1}
          name="Atur Identitas">
          <CopilotView>
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
            <View>
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
          </CopilotView>
        </CopilotStep>

        <CopilotStep
          text="Informasi lengkap supplier yang terdaftar dengan toko Anda."
          order={2}
          name="Lihat info supplier">
          <CopilotView>
            <View style={{ marginTop: 16 }}>
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
          </CopilotView>
        </CopilotStep>
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
    if (stateUser.detail.error && stateUser.detail.error.code !== 401) {
      return (
        <View style={{ flex: 1 }}>
          <SnbTopNav.Type2
            type="red"
            title="Profil"
            iconName={'exit_to_app'}
            iconAction={() => setShowConfirmation(true)}
          />
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('@image/sinbad_image/cry_sinbad.png')}
              style={{ height: 192, aspectRatio: 1 }}
            />
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <SnbText.H4>Terjadi Kesalahan</SnbText.H4>
            </View>
            <SnbText.B3 align="center">
              {setErrorMessage(
                stateUser.detail.error.code,
                stateUser.detail.error.errorMessage,
              )}
            </SnbText.B3>
            <View style={{ marginVertical: 8 }} />
            <SnbButton.Dynamic
              iconName="refresh"
              type="tertiary"
              size="small"
              title="Coba Lagi"
              disabled={false}
              loading={false}
              onPress={() => storeDetailAction.detail(dispatchUser)}
            />
          </View>
        </View>
      );
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
          {/* Modal Profile Completion */}
          <ModalUserProfileCompletion isOpen={modalUserProfileCompletion} handleNavigateToCart={() => {
            NavigationAction.navigate('OmsShoppingCartView');
          }} />
        </View>
      );
    }
    return <LoadingPage />;
  };

  /** this for main view */
  return (
    <View style={{ flex: 1 }}>
      <SnbContainer color={'grey'}>{content()}</SnbContainer>
      <SnbDialog
        title="Yakin keluar Sinbad ?"
        open={showConfirmation}
        okText="Ya"
        cancelText="Tidak"
        cancel={() => {
          setShowConfirmation(false);
        }}
        ok={() => {
          setShowConfirmation(false);
          logout();
          reset({ index: 0, routes: [{ name: 'LoginPhoneView' }] });
        }}
        content="Apakah anda yakin ingin keluar Aplikasi SINBAD ?"
      />
    </View>
  );
};

export default copilot(copilotOptions(2, 'profileCoachmark'))(UserView);
