import React, { FC, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import {
  SnbContainer,
  SnbTopNav2,
  color,
  SnbText,
  SnbText2,
  SnbTextSeeMoreType1,
  SnbButton,
  SnbDialog,
  SnbIcon,
  SnbButton2,
  spacingV2 as layout,
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
  const [loadingCarousel, setLoadingCarousel] = useState(true);

  // usage for show modal
  const [modalUserProfileCompletion, setModalUserProfileCompletion] =
    React.useState(false);
  const isProfileCompletionCart =
    NavigationAction.useGetNavParams<NavigationParams>()?.params
      ?.isProfileCompletionCart;

  //show modal if complete data from cart
  useEffect(() => {
    const ownerData = stateUser.detail.data?.ownerData;
    const buyerData = stateUser.detail.data?.buyerData;
    if (stateUser) {
      if (
        isProfileCompletionCart === true &&
        ownerData?.info.isImageIdOcrValidate === true &&
        buyerData?.buyerInformation.buyerAccount.name !== null &&
        buyerData?.buyerAddress.address !== null
      ) {
        setModalUserProfileCompletion(true);
      }
    }
  }, [stateUser, isProfileCompletionCart]);

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

  useEffect(() => {
    if (loadingCarousel) {
      setLoadingCarousel(false);
    }
  }, [loadingCarousel]);
  /** === GO TO PAGE === */
  const goTo = (data: any) => {
    const { type, title } = data;
    switch (type) {
      case 'ktp': {
        NavigationAction.navigate('UpdatePhotoKTPView');
        break;
      }
      case 'merchantAccountName':
        NavigationAction.navigate('MerchantEditView', { title, type });
        break;
      case 'storeAddress':
        handleAddressNavigation();
        break;
      default:
        break;
    }
  };
  /** === VIEW === */
  /** => header */
  const header = () => {
    if (stateUser.detail.data) {
      return <SnbTopNav2.Type1 color="white" title="Profil" />;
    }
    return <SnbTopNav2.Type1 color="red" title="Profil" />;
  };

  const handleAddressNavigation = () => {
    const buyerData = stateUser.detail.data?.buyerData;
    if (buyerData?.buyerAddress.address !== null) {
      NavigationAction.navigate('MerchantEditAddressView');
    } else {
      NavigationAction.navigate('MapsViewType2', { originFrom: 'profile' });
    }
  };

  /** === RENDER SLIDER PAGINATION DOT === */
  const pagination = () => {
    const dataHeader = [
      {
        id: 1,
        title: 'Foto KTP',
        subTitle: 'Upload Foto KTP',
        icon: 'ktp',
        message: 'Belanja lebih mudah dengan melengkapi profil Anda.',
        type: 'ktp',
        status: stateUser.detail.data?.ownerData?.info?.isImageIdOcrValidate,
      },
      {
        id: 2,
        title: 'Tambah Nama Toko',
        subTitle: 'Isi Nama Toko',
        icon: 'store',
        message: 'Belanja lebih mudah dengan melengkapi profil Anda.',
        type: 'merchantAccountName',
        status:
          stateUser.detail.data?.buyerData?.buyerInformation?.buyerAccount
            ?.name !== null
            ? true
            : false,
      },
      {
        id: 3,
        title: 'Alamat Toko',
        subTitle: 'Isi Alamat Toko',
        icon: 'location',
        message: 'Belanja lebih mudah dengan melengkapi profil Anda.',
        type: 'storeAddress',
        status:
          stateUser.detail.data?.buyerData?.buyerAddress?.address !== null
            ? true
            : false,
      },
    ];
    const dataCarousel = dataHeader.filter((item) => item.status === false);
    return (
      <View>
        <Pagination
          dotsLength={dataCarousel.length}
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
          <View style={[UserStyles.shadowStyle, UserStyles.carouselContainer]}>
            <View style={UserStyles.cardBody}>
              <View>
                <Svg name={item.icon} size={40} />
              </View>
              <View style={{ flex: 1, marginHorizontal: layout.spacing.lg }}>
                <SnbText2.Body.Default>{item.subTitle}</SnbText2.Body.Default>
                <SnbText2.Paragraph.Small>
                  {item.message}
                </SnbText2.Paragraph.Small>
              </View>
              <SnbButton2.Primary
                size="tiny"
                onPress={() => {
                  goTo({
                    type: item.type,
                    title: item.title,
                  });
                }}
                title="Lengkapi"
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderHeaderInformation = () => {
    const data = stateUser.detail.data?.ownerData?.profile;
    const buyerData = stateUser.detail.data?.buyerData;
    const ownerData = stateUser.detail.data?.ownerData;
    const source = data?.imageUrl
      ? { uri: data?.imageUrl }
      : require('../../../assets/images/sinbad_image/avatar.png');
    const dataHeader = [
      {
        id: 1,
        title: 'Foto KTP',
        subTitle: 'Upload Foto KTP',
        icon: 'ktp',
        message: 'Belanja lebih mudah dengan melengkapi profil Anda.',
        type: 'ktp',
        status: stateUser.detail.data?.ownerData?.info?.isImageIdOcrValidate,
      },
      {
        id: 2,
        title: 'Tambah Nama Toko',
        subTitle: 'Isi Nama Toko',
        icon: 'store',
        message: 'Belanja lebih mudah dengan melengkapi profil Anda.',
        type: 'merchantAccountName',
        status:
          stateUser.detail.data?.buyerData?.buyerInformation?.buyerAccount
            ?.name !== null
            ? true
            : false,
      },
      {
        id: 3,
        title: 'Alamat Toko',
        subTitle: 'Isi Alamat Toko',
        icon: 'location',
        message: 'Belanja lebih mudah dengan melengkapi profil Anda.',
        type: 'storeAddress',
        status:
          stateUser.detail.data?.buyerData?.buyerAddress?.address !== null
            ? true
            : false,
      },
    ];
    const dataCarousel = dataHeader.filter((item) => item.status === false);
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
              {!data?.imageUrl ? (
                <SnbIcon
                  name={'person_circle'}
                  size={52}
                  color={color.black40}
                />
              ) : (
                <Image source={source} style={UserStyles.image} />
              )}
            </View>
            <View style={UserStyles.userInfo}>
              <View style={{ marginLeft: -18, flexDirection: 'row' }}>
                <SnbTextSeeMoreType1 line={1}>
                  <SnbText.H4 color={'#677A8E'}>
                    {data?.name
                      ? data.name
                      : buyerData?.buyerInformation?.buyerAccount?.code}
                  </SnbText.H4>
                </SnbTextSeeMoreType1>
                <View style={{ alignSelf: 'center', marginLeft: -18 }}>
                  <SnbIcon
                    name={'shield'}
                    size={16}
                    color={
                      ownerData?.accountType === 'basic'
                        ? color.black60
                        : color.blue50
                    }
                  />
                </View>
              </View>
              <SnbText.B3 color={'#677A8E'}>
                {ownerData?.accountType === 'basic' ? 'Akun Basic' : 'Akun VIP'}
              </SnbText.B3>
            </View>
          </View>
          <CopilotStep
            text="Verifikasi sekarang untuk menggunakan semua fitur utama di Sinbad."
            order={1}
            name="Verifikasi Akun Anda">
            <CopilotView>
              <Carousel
                data={dataCarousel}
                sliderWidth={width}
                itemWidth={width * 0.92}
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
        <View>
          {!ownerData?.info.isImageIdOcrValidate ||
          buyerData?.buyerInformation.buyerAccount.name === null ||
          buyerData?.buyerAddress.address === null
            ? pagination()
            : null}
        </View>
      </View>
    );
  };
  const renderUserInformation = () => {
    const data = stateUser.detail.data?.progress;
    const ownerData = stateUser.detail.data?.ownerData;
    const buyerData = stateUser.detail.data?.buyerData;
    return (
      <View style={{ marginBottom: 90 }}>
        <CopilotStep
          text="Lengkapi informasi data diri Anda dengan mudah di sini."
          order={2}
          name="Data Diri">
          <CopilotView>
            <View style={{ marginVertical: 16 }}>
              <View style={UserStyles.bodyTitleContainer}>
                <SnbText2.Body.Small>Data Pemilik</SnbText2.Body.Small>
                <SnbText2.Paragraph.Small>{`${data?.ownerProgress.done}/${data?.ownerProgress.total} Selesai`}</SnbText2.Paragraph.Small>
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
                badges1={ownerData?.info.isImageIdOcrValidate ? false : true}
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
                <SnbText.B3>{`${data?.buyerProgress.done}/${data?.buyerProgress.total} Selesai`}</SnbText.B3>
              </View>
              <ListButton
                leftItem={
                  <SnbIcon name="store" color={color.black40} size={24} />
                }
                title={'Informasi Toko'}
                onPress={() =>
                  NavigationAction.navigate('MerchantDetailAccountView')
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
                onPress={handleAddressNavigation}
                rightItem={
                  <SnbIcon
                    name="chevron_right"
                    color={color.black40}
                    size={24}
                  />
                }
                badges1={
                  buyerData?.buyerInformation?.buyerAccount?.name !== null
                    ? false
                    : true
                }
                leftBadgeItem1={
                  <SnbIcon name={'create'} size={20} color={color.blue50} />
                }
                badgesTitle1={'Isi Nama Toko'}
                badges2={
                  buyerData?.buyerAddress?.address !== null ? false : true
                }
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
                pressBadge2={handleAddressNavigation}
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
          <SnbTopNav2.Type2
            color="red"
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
                stateUser.detail.error.message,
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
