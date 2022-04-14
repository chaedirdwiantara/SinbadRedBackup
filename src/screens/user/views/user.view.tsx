import React, { FC, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  color,
  SnbText,
  SnbTextSeeMoreType1,
  SnbButton,
  SnbDialog,
  SnbIcon,
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
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Svg from '@svg';
import ListButton from '../views/shared/list-button.component';

const CopilotView = walkthroughable(View);

/** === INTERFACE === */
interface NavigationParams {
  isProfileCompletionCart: boolean;
}

const UserView: FC = ({ start }: any) => {
  /** === HOOK === */
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const { stateUser, dispatchUser } = React.useContext(contexts.UserContext);
  const { logout } = useAuthAction();
  const { reset } = useNavigation();
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const { coachmarkState } = useCoachmark();
  const { width } = Dimensions.get('window');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [dataHeader] = React.useState([
    {
      id: 1,
      title: 'Foto KTP',
      subTitle: 'Upload Foto KTP',
      icon: 'ktp',
      message: 'Belanja lebih mudah dengan melengkapi profil Anda.',
      type: 'ktp',
    },
    {
      id: 2,
      title: 'Tambah Nama Toko',
      subTitle: 'Isi Nama Toko',
      icon: 'store',
      message: 'Belanja lebih mudah dengan melengkapi profil Anda.',
      type: 'merchantAccountName',
    },
    {
      id: 3,
      title: 'Alamat Toko',
      subTitle: 'Isi Alamat Toko',
      icon: 'location',
      message: 'Belanja lebih mudah dengan melengkapi profil Anda.',
      type: 'storeAddress',
    },
  ]);

  // usage for show modal
  const [modalUserProfileCompletion, setModalUserProfileCompletion] =
    React.useState(false);
  const isProfileCompletionCart =
    NavigationAction.useGetNavParams<NavigationParams>()?.params
      ?.isProfileCompletionCart;

  useFocusEffect(
    React.useCallback(() => {
      storeDetailAction.detail(dispatchUser);
    }, []),
  );

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
  /** === GO TO PAGE === */
  const goTo = (data: any) => {
    const { type, title } = data;
    switch (type) {
      case 'ktp': {
        NavigationAction.navigate('MerchantEditPhotoView', { title, type });
        break;
      }
      case 'merchantAccountName':
        NavigationAction.navigate('MerchantEditView', { title, type });
        break;
      case 'storeAddress':
        NavigationAction.navigate('MerchantDetailAddressView');
        break;
      default:
        break;
    }
  };
  /** === VIEW === */
  /** => header */
  const header = () => {
    if (stateUser.detail.data) {
      return <SnbTopNav.Type1 type="white" title="Profil" />;
    }
    return <SnbTopNav.Type1 type="red" title="Profil" />;
  };

  /** === RENDER SLIDER PAGINATION DOT === */
  const pagination = () => {
    return (
      <View>
        <Pagination
          dotsLength={dataHeader.length}
          activeDotIndex={activeIndex}
          dotContainerStyle={{ marginHorizontal: 2 }}
          dotStyle={UserStyles.activeDot}
          inactiveDotStyle={UserStyles.inactiveDot}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View>
    );
  };

  /** === RENDER HEADER ITEM SLIDE === */
  const renderItem = (item: any, index: any) => {
    return (
      <View key={index}>
        <View>
          <View
            style={[
              UserStyles.shadowStyle,
              {
                backgroundColor: color.white,
                marginHorizontal: 4,
                borderRadius: 5,
              },
            ]}>
            <View style={UserStyles.cardBody}>
              <View style={{ alignSelf: 'center' }}>
                <Svg name={item.icon} size={40} />
              </View>
              <View
                style={{
                  marginLeft: 16,
                  alignSelf: 'center',
                  width: 185,
                }}>
                <SnbText.H4>{item.subTitle}</SnbText.H4>
                <SnbText.B3 color={'#677A8E'}>{item.message}</SnbText.B3>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: color.red50,
                  height: 24,
                  alignSelf: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 4,
                  paddingBottom: 2,
                }}
                onPress={() =>
                  goTo({
                    type: item.type,
                    title: item.title,
                  })
                }>
                <SnbText.B3 color={color.white} align={'center'}>
                  Lengkapi
                </SnbText.B3>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderHeaderInformation = () => {
    const data = stateUser.detail.data?.ownerData?.profile;
    const source = data?.imageUrl
      ? { uri: data?.imageUrl }
      : require('../../../assets/images/sinbad_image/avatar.png');
    return (
      <View style={UserStyles.headerInformationContainer}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={['#cfd6de', '#f4f5f7']}
          style={{
            flex: 1,
          }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={UserStyles.imageContainer}>
              <Image source={source} style={UserStyles.image} />
            </View>
            <View style={UserStyles.userInfo}>
              <View style={{ marginLeft: -18, flexDirection: 'row' }}>
                <SnbTextSeeMoreType1 line={1}>
                  <SnbText.H4 color={'#677A8E'}>{data?.name}</SnbText.H4>
                </SnbTextSeeMoreType1>
                <View style={{ alignSelf: 'center', marginLeft: -18 }}>
                  <SnbIcon name={'shield'} size={16} color={color.black60} />
                </View>
              </View>
              <SnbText.B3 color={'#677A8E'}>Akun Basic</SnbText.B3>
            </View>
          </View>
          <CopilotStep
            text="Verifikasi sekarang untuk menggunakan semua fitur utama di Sinbad."
            order={1}
            name="Verifikasi Akun Anda">
            <CopilotView>
              <Carousel
                data={dataHeader}
                sliderWidth={1 * width}
                itemWidth={width}
                renderItem={({ item, index }) => renderItem(item, index)}
                onSnapToItem={(index) => {
                  setActiveIndex(index);
                }}
                slideStyle={{ padding: 10 }}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                activeSlideAlignment={'center'}
                layout={'default'}
                removeClippedSubviews={false}
              />
            </CopilotView>
          </CopilotStep>
        </LinearGradient>
        <View>{pagination()}</View>
      </View>
    );
  };
  const renderUserInformation = () => {
    const data = stateUser.detail.data?.progress;
    return (
      <View style={{ marginBottom: 90 }}>
        <CopilotStep
          text="Lengkapi informasi data diri Anda dengan mudah di sini."
          order={2}
          name="Data Diri">
          <CopilotView>
            <View style={{ marginVertical: 16 }}>
              <View style={UserStyles.bodyTitleContainer}>
                <SnbText.B4>Data Pemilik</SnbText.B4>
                <SnbText.B3>{`${data?.ownerProgress.done}/${data?.ownerProgress.total} Selesai`}</SnbText.B3>
              </View>
              <ListButton
                leftItem={
                  <SnbIcon name="person" color={color.black40} size={24} />
                }
                title={'Data Diri'}
                onPress={() =>
                  NavigationAction.navigate('MerchantDetailProfileView')
                }
                rightItem={
                  <SnbIcon
                    name="chevron_right"
                    color={color.black40}
                    size={24}
                  />
                }
                badges1
                leftBadgeItem1={<Svg name={'ktp_blue'} size={20} />}
                badgesTitle1={'Upload Foto KTP'}
                separator
                pressBadge1={() => goTo({ type: 'ktp', title: 'Foto KTP' })}
              />
            </View>
          </CopilotView>
        </CopilotStep>

        <CopilotStep
          text="Lengkapi informasi data toko Anda dengan mudah di sini."
          order={3}
          name="Data Toko">
          <CopilotView>
            <View>
              <View style={UserStyles.bodyTitleContainer}>
                <SnbText.B4>Data Toko</SnbText.B4>
                <SnbText.B3>{`${data?.storeProgress.done}/${data?.storeProgress.total} Selesai`}</SnbText.B3>
              </View>
              <ListButton
                leftItem={
                  <SnbIcon name="store" color={color.black40} size={24} />
                }
                title={'Informasi Toko'}
                onPress={() =>
                  NavigationAction.navigate('MerchantDetailInformationView')
                }
                rightItem={
                  <SnbIcon
                    name="chevron_right"
                    color={color.black40}
                    size={24}
                  />
                }
                separator
              />
              <ListButton
                leftItem={
                  <SnbIcon
                    name="location_store"
                    color={color.black40}
                    size={24}
                  />
                }
                title={'Alamat Toko'}
                onPress={() =>
                  NavigationAction.navigate('MerchantEditAddressView')
                }
                rightItem={
                  <SnbIcon
                    name="chevron_right"
                    color={color.black40}
                    size={24}
                  />
                }
                badges1
                leftBadgeItem1={
                  <SnbIcon name={'create'} size={20} color={color.blue50} />
                }
                badgesTitle1={'Isi Nama Toko'}
                badges2
                leftBadgeItem2={
                  <SnbIcon
                    name={'location_store'}
                    size={20}
                    color={color.blue50}
                  />
                }
                badgesTitle2={'Isi Alamat Toko'}
                pressBadge1={() =>
                  goTo({
                    type: 'merchantAccountName',
                    title: 'Tambah Nama Toko',
                  })
                }
                pressBadge2={() =>
                  NavigationAction.navigate('MerchantDetailAddressView')
                }
                separator
              />
            </View>
          </CopilotView>
        </CopilotStep>

        <View>
          <ListButton
            leftItem={
              <SnbIcon name="exit_to_app" color={color.black40} size={24} />
            }
            title={'Log Out'}
            onPress={() => setShowConfirmation(true)}
            separator={false}
          />
        </View>
      </View>
    );
  };
  const contentItem = () => {
    return (
      <>
        {renderHeaderInformation()}
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
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 16 }}>
            {contentItem()}
          </ScrollView>
          {/* Modal Profile Completion */}
          <ModalUserProfileCompletion
            isOpen={modalUserProfileCompletion}
            handleNavigateToCart={() => {
              NavigationAction.navigate('OmsShoppingCartView');
            }}
          />
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

export default copilot(copilotOptions(3, 'profileCoachmark'))(UserView);
