import React, { FC, useEffect, useState } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/core';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import {
  SnbContainer,
  SnbTopNav2,
  colorV2,
  SnbText2,
  SnbIcon,
  SnbButton2,
  spacingV2 as layout,
  Content,
  SnbBottomSheet2Ref,
  SpecialButton,
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
import { setErrorMessage } from '@screen/auth/functions';
import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
import { copilotOptions } from '@screen/account/views/shared';
import { useCoachmark, useEasyRegistration } from '@screen/account/functions';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Svg from '@svg';
import ModalLogout from './shared/modal-logout.component';
import ModalCompletnessConfirmation from './modal-completness-confirmation.view';

const CopilotView = walkthroughable(View);

/** === INTERFACE === */
interface NavigationParams {
  isProfileCompletionCart: boolean;
}

const UserView: FC = ({ start }: any) => {
  /** === HOOK === */
  const storeDetailAction = UserHookFunc.useStoreDetailAction();
  const { stateUser, dispatchUser } = React.useContext(contexts.UserContext);
  const refModalLogout = React.useRef<SnbBottomSheet2Ref>(null);
  const { coachmarkState } = useCoachmark();
  const { width } = Dimensions.get('window');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [loadingCarousel, setLoadingCarousel] = useState(true);
  const [clickFromCart, setClickFromCart] = useState(false);
  const { updateBadgeProfile, resetUpdateBadgeProfile } =
    UserHookFunc.useUpdateBadgeProfile();
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const {
    completeDataConfirmation,
    completeDataConfirmationState,
    resetCompleteDataConfirmation,
  } = useEasyRegistration();
  const isFocused = useIsFocused();
  const dataHeader = [
    {
      id: 1,
      title: 'Upgrade VIP Diproses',
      subTitle: 'Tim kami sedang memproses upgrade akun Anda.',
      icon: 'shield',
      type: 'upgradeVipProcess',
      status: stateUser?.updateBadgeProfile?.data
        ? true
        : stateUser?.detail?.data?.vipStatus === 'to_review'
        ? false
        : true,
    },
    {
      id: 2,
      title: 'Upgrade Akun Berhasil',
      subTitle: 'Akun Anda telah berhasil menjadi akun VIP.',
      icon: 'shield_blue',
      type: 'upgradeVipSuccess',
      status: stateUser?.updateBadgeProfile?.data
        ? true
        : stateUser?.detail?.data?.vipStatus === 'vip'
        ? false
        : true,
    },
    {
      id: 3,
      title: 'Upgrade Akun Gagal',
      subTitle: 'Silakan cek kembali kelengkapan profil anda.',
      icon: 'error',
      type: 'upgradeVipFailed',
      status: stateUser?.updateBadgeProfile?.data
        ? true
        : stateUser?.detail?.data?.vipStatus === 'reject'
        ? false
        : true,
    },
    {
      id: 4,
      title: 'Foto KTP',
      subTitle: 'Belanja lebih mudah dengan melengkapi profil Anda.',
      icon: 'ktp',
      type: 'ktp',
      status: stateUser.detail.data?.ownerData?.info?.isImageIdOcrValidate,
    },
    {
      id: 5,
      title: 'Tambah Nama Toko',
      subTitle: 'Belanja lebih mudah dengan melengkapi profil Anda.',
      icon: 'store',
      type: 'merchantAccountName',
      status:
        stateUser.detail.data?.buyerData?.buyerInformation?.buyerAccount
          ?.name !== null
          ? true
          : false,
    },
    {
      id: 6,
      title: 'Alamat Toko',
      subTitle: 'Belanja lebih mudah dengan melengkapi profil Anda.',
      icon: 'location',
      type: 'storeAddress',
      status:
        stateUser.detail.data?.buyerData?.buyerAddress?.address !== null
          ? true
          : false,
    },
  ];
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
        buyerData?.buyerAddress.address !== null &&
        !clickFromCart
      ) {
        setModalUserProfileCompletion(true);
      }
    }
  }, [stateUser, isProfileCompletionCart]);

  useFocusEffect(
    React.useCallback(() => {
      storeDetailAction.detail(dispatchUser);
      resetUpdateBadgeProfile(dispatchUser);
    }, []),
  );

  //function for start couchmark
  useEffect(() => {
    if (typeof coachmarkState.data?.profileCoachmark === 'boolean') {
      if (coachmarkState?.data?.profileCoachmark === false) {
        start();
      }
    }
  }, [coachmarkState?.data?.profileCoachmark]);

  useEffect(() => {
    if (loadingCarousel) {
      setLoadingCarousel(false);
    }
  }, [loadingCarousel]);

  useEffect(() => {
    const ownerData = stateUser.detail.data?.ownerData;
    const buyerData = stateUser.detail.data?.buyerData;
    const dataComplete =
      typeof stateUser.detail.data?.isDataCompleted === 'boolean' &&
      stateUser.detail.data?.isDataCompleted === false;
    if (stateUser.detail?.data?.wasRejected && isFocused) {
      if (!dataComplete) {
        if (
          !ownerData?.info.isImageIdOcrValidate ||
          !ownerData?.info.isTaxNo ||
          !ownerData?.info.isSelfieImageUrl ||
          !buyerData?.buyerInformation?.buyerAccount?.name ||
          !buyerData?.buyerAddress?.address ||
          !ownerData?.info?.isImageBuyer
        ) {
          setOpenModalConfirmation(true);
        }
      } else {
        setOpenModalConfirmation(false);
      }
    } else {
      setOpenModalConfirmation(false);
    }
  }, [stateUser, isFocused]);

  useEffect(() => {
    if (completeDataConfirmationState.data) {
      storeDetailAction.detail(dispatchUser);
      setOpenModalConfirmation(false);
      resetCompleteDataConfirmation();
    }
  }, [completeDataConfirmationState]);

  /** === GO TO PAGE === */
  const goTo = (data: any) => {
    const { type, title } = data;
    switch (type) {
      case 'ktp': {
        NavigationAction.navigate('UpdatePhotoKTPView');
        break;
      }
      case 'merchantAccountName':
        NavigationAction.navigate('MerchantEditView', {
          title,
          type,
          originFrom: 'profile',
        });
        break;
      case 'storeAddress':
        handleAddressNavigation();
        break;
      case 'store':
      case 'npwp':
      case 'selfie':
        NavigationAction.navigate('MerchantEditPhotoView', { title, type });
        break;
      default:
        break;
    }
  };

  /** === VIEW === */
  /** => header */
  const header = () => {
    if (stateUser.detail.data) {
      return <SnbTopNav2.Type1 color="white" title="Profil" testID={'01.1'} />;
    }
    return <SnbTopNav2.Type1 color="red" title="Profil" testID={'01.1'} />;
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

  const renderSeparator = () => {
    return (
      <View
        style={{
          flex: 1,
          borderTopWidth: 1,
          borderColor: colorV2.strokeColor.default,
          marginTop: layout.spacing.sm,
        }}
      />
    );
  };

  /** === RENDER HEADER ITEM SLIDE === */
  const renderItem = (item: any, index: any) => {
    return (
      <View key={index}>
        <SpecialButton.Card
          title={item.title}
          subTitle={item.subTitle}
          height={88}
          action={item.type === 'upgradeVipFailed' ? false : true}
          actionType="button"
          actionTitle={
            item.type === 'upgradeVipProcess' ||
            item.type === 'upgradeVipSuccess'
              ? 'Mengerti'
              : 'Lengkapi'
          }
          iconComponent={<Svg name={item.icon} size={40} />}
          onPress={() => {
            if (
              item.type === 'upgradeVipProcess' ||
              item.type === 'upgradeVipSuccess'
            ) {
              updateBadgeProfile(dispatchUser);
            } else {
              goTo({
                type: item.type,
                title: item.title,
              });
            }
          }}
          loadingButton={
            item.type === 'upgradeVipProcess' ||
            item.type === 'upgradeVipSuccess'
              ? stateUser?.updateBadgeProfile.loading
              : false
          }
          testID={'01.1'}
        />
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
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={UserStyles.imageContainer}>
              {!data?.imageUrl ? (
                <SnbIcon
                  name={'person_circle'}
                  size={52}
                  color={colorV2.iconColor.default}
                />
              ) : (
                <Image source={source} style={UserStyles.image} />
              )}
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SnbText2.Body.Small numberOfLines={1} testID={'01.1'}>
                  {data?.name ||
                    buyerData?.buyerInformation?.buyerAccount?.code}
                </SnbText2.Body.Small>
                <View style={{ marginHorizontal: layout.spacing.xxsm }}>
                  <SnbIcon
                    name={'shield'}
                    size={16}
                    color={
                      ownerData?.accountType === 'basic'
                        ? colorV2.iconColor.default
                        : colorV2.iconColor.blue
                    }
                  />
                </View>
              </View>
              <SnbText2.Paragraph.Tiny testID={'01.1'}>
                {ownerData?.accountType === 'basic' ? 'Akun Basic' : 'Akun VIP'}
              </SnbText2.Paragraph.Tiny>
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
                slideStyle={{
                  paddingHorizontal: layout.spacing.xsm,
                  paddingVertical: layout.spacing.md,
                }}
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
            <View style={{ marginVertical: layout.spacing.lg }}>
              <View style={UserStyles.bodyTitleContainer}>
                <SnbText2.Body.Small>Data Pemilik</SnbText2.Body.Small>
                <SnbText2.Paragraph.Small
                  testID={
                    '01.1'
                  }>{`${data?.ownerProgress.done}/${data?.ownerProgress.total} Selesai`}</SnbText2.Paragraph.Small>
              </View>
              <View
                style={{
                  marginHorizontal: layout.spacing.lg,
                  marginTop: layout.spacing.md,
                }}>
                <View
                  style={{
                    marginTop: layout.spacing.lg,
                  }}>
                  <Content.MenuList
                    title="Data Diri"
                    iconComponent={
                      <SnbIcon
                        name="person"
                        color={colorV2.iconColor.default}
                        size={24}
                      />
                    }
                    actionType="icon"
                    actionIcon="chevron_right"
                    onActionPress={() =>
                      NavigationAction.navigate('MerchantDetailProfileView')
                    }
                  />
                </View>
                {!ownerData?.info.isImageIdOcrValidate && (
                  <View
                    style={{
                      marginVertical: layout.spacing.lg,
                    }}>
                    <Content.MenuList
                      title="Upload Foto KTP"
                      iconComponent={
                        <SnbIcon
                          name="ktp"
                          color={colorV2.iconColor.blue}
                          size={24}
                        />
                      }
                      actionType="string"
                      actionText="Lengkapi"
                      onActionPress={() =>
                        goTo({ type: 'ktp', title: 'Foto KTP' })
                      }
                      background
                    />
                  </View>
                )}
                {!ownerData?.info.isTaxNo && (
                  <View
                    style={{
                      marginTop: !ownerData?.info.isImageIdOcrValidate
                        ? 0
                        : layout.spacing.lg,
                      marginBottom: !ownerData?.info.isSelfieImageUrl
                        ? 0
                        : layout.spacing.lg,
                    }}>
                    <Content.MenuList
                      title="Upload Foto NPWP"
                      iconComponent={
                        <SnbIcon
                          name="ktp"
                          color={colorV2.iconColor.blue}
                          size={24}
                        />
                      }
                      actionType="string"
                      actionText="Lengkapi"
                      onActionPress={() =>
                        goTo({ type: 'npwp', title: 'Foto NPWP' })
                      }
                      background
                    />
                  </View>
                )}
                {!ownerData?.info.isSelfieImageUrl && (
                  <View
                    style={{
                      marginTop: !ownerData?.info.isTaxNo
                        ? layout.spacing.lg
                        : 0,
                      marginBottom: layout.spacing.lg,
                    }}>
                    <Content.MenuList
                      title="Upload Foto Selfie + KTP"
                      iconComponent={
                        <SnbIcon
                          name="ktp"
                          color={colorV2.iconColor.blue}
                          size={24}
                        />
                      }
                      actionType="string"
                      actionText="Lengkapi"
                      onActionPress={() =>
                        goTo({ type: 'selfie', title: 'Foto Selfie + KTP' })
                      }
                      background
                    />
                  </View>
                )}
                {renderSeparator()}
              </View>
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
                <SnbText2.Body.Small>Data Toko</SnbText2.Body.Small>
                <SnbText2.Paragraph.Small>{`${data?.buyerProgress.done}/${data?.buyerProgress.total} Selesai`}</SnbText2.Paragraph.Small>
              </View>
              <View
                style={{
                  marginHorizontal: layout.spacing.lg,
                  marginTop: layout.spacing.md,
                }}>
                <View style={{ marginVertical: 16 }}>
                  <Content.MenuList
                    title="Informasi Toko"
                    iconComponent={
                      <SnbIcon
                        name="store"
                        color={colorV2.iconColor.default}
                        size={24}
                      />
                    }
                    actionType="icon"
                    actionIcon="chevron_right"
                    onActionPress={() =>
                      NavigationAction.navigate('MerchantDetailAccountView')
                    }
                  />
                </View>
                <View style={{ marginBottom: layout.spacing.lg }}>
                  <Content.MenuList
                    title="Alamat Toko"
                    iconComponent={
                      <SnbIcon
                        name="location_store"
                        color={colorV2.iconColor.default}
                        size={24}
                      />
                    }
                    actionType="icon"
                    actionIcon="chevron_right"
                    onActionPress={handleAddressNavigation}
                  />
                </View>
                {!buyerData?.buyerInformation?.buyerAccount?.name && (
                  <View style={{ marginBottom: layout.spacing.lg }}>
                    <Content.MenuList
                      title="Isi Nama Toko"
                      iconComponent={
                        <SnbIcon
                          name="create"
                          color={colorV2.iconColor.blue}
                          size={24}
                        />
                      }
                      actionType="string"
                      actionText="Lengkapi"
                      onActionPress={() =>
                        goTo({
                          type: 'merchantAccountName',
                          title: 'Tambah Nama Toko',
                        })
                      }
                      background
                    />
                  </View>
                )}
                {!ownerData?.info?.isImageBuyer && (
                  <View style={{ marginBottom: layout.spacing.lg }}>
                    <Content.MenuList
                      title="Upload Foto Toko"
                      iconComponent={
                        <SnbIcon
                          name="ktp"
                          color={colorV2.iconColor.blue}
                          size={24}
                        />
                      }
                      actionType="string"
                      actionText="Lengkapi"
                      onActionPress={() =>
                        goTo({
                          type: 'store',
                          title: 'Foto Toko',
                        })
                      }
                      background
                    />
                  </View>
                )}
                {!buyerData?.buyerAddress?.address && (
                  <View style={{ marginBottom: layout.spacing.lg }}>
                    <Content.MenuList
                      title="Isi Alamat Toko"
                      iconComponent={
                        <SnbIcon
                          name="location_store"
                          color={colorV2.iconColor.blue}
                          size={24}
                        />
                      }
                      actionType="string"
                      actionText="Lengkapi"
                      onActionPress={handleAddressNavigation}
                      background
                    />
                  </View>
                )}
                {renderSeparator()}
              </View>
            </View>
          </CopilotView>
        </CopilotStep>

        <View
          style={{
            marginHorizontal: layout.spacing.lg,
            marginTop: layout.spacing.md,
          }}>
          <Content.MenuList
            title="Log Out"
            iconComponent={
              <SnbIcon
                name="exit_to_app"
                color={colorV2.iconColor.default}
                size={24}
              />
            }
            onActionPress={refModalLogout.current?.open}
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
            color="white"
            title="Profil"
            iconName={'exit_to_app'}
            iconAction={() => refModalLogout.current?.open()}
          />
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('@image/sinbad_image/cry_sinbad.png')}
              style={{ height: 192, aspectRatio: 1 }}
            />
            <View
              style={{ alignItems: 'center', marginBottom: layout.spacing.md }}>
              <SnbText2.Headline.Small>
                Terjadi Kesalahan
              </SnbText2.Headline.Small>
            </View>
            <SnbText2.Paragraph.Small align="center">
              {setErrorMessage(
                stateUser.detail.error.code,
                stateUser.detail.error.message,
              )}
            </SnbText2.Paragraph.Small>
            <View style={{ marginVertical: layout.spacing.sm }} />
            <SnbButton2.Link
              iconName="refresh"
              size="medium"
              title="Coba Lagi"
              disabled={false}
              onPress={() => storeDetailAction.detail(dispatchUser)}
            />
          </View>
        </View>
      );
    }

    if (stateUser?.detail?.data) {
      return (
        <View>
          {header()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: layout.spacing.lg }}>
            {contentItem()}
          </ScrollView>
          {/* Modal Profile Completion */}
          <ModalUserProfileCompletion
            isOpen={modalUserProfileCompletion}
            handleNavigateToCart={() => {
              setClickFromCart(true);
              setModalUserProfileCompletion(false);
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
      <ModalLogout ref={refModalLogout} />
      <ModalCompletnessConfirmation
        open={openModalConfirmation}
        onPress={() => completeDataConfirmation()}
        loading={completeDataConfirmationState.loading}
        disabled={completeDataConfirmationState.loading}
        closseAction={() => setOpenModalConfirmation(false)}
      />
    </View>
  );
};

export default copilot(copilotOptions(3, 'profileCoachmark'))(UserView);
