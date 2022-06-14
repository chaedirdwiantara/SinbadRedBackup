import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {
  SnbText,
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  SnbBottomSheetPart,
  FooterButton,
  Content,
} from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
import Svg from '@svg';
/** === DATA === */
const errorData = [
  {
    new: '001',
    old: '10',
    service: 'Login',
  },
  {
    new: '002',
    old: '12',
    service: 'Akun',
  },
  {
    new: '003',
    old: '15',
    service: 'Diskon',
  },
  {
    new: '004',
    old: '14',
    service: 'Keranjang Belanja',
  },
  {
    new: '005',
    old: '17',
    service: 'Pemesanan',
  },
  {
    new: '006',
    old: '18',
    service: 'Pembayaran',
  },
  {
    new: '007',
    old: null,
    service: 'Produk',
  },
  {
    new: '008',
    old: null,
    service: 'Gudang Produk',
  },
  {
    new: '009',
    old: null,
    service: 'Sales Management',
  },
  {
    new: '010',
    old: null,
    service: 'Survey',
  },
  {
    new: '011',
    old: null,
    service: 'Salesman KPI',
  },
];
/** === INTERFACE === */
/** => error item */
interface ErrorItemProps {
  message: string;
  errorMessage: string;
  type: string;
  code: number;
}
/** => error */
interface ErrorProps {
  open: boolean;
  error: ErrorItemProps | null;
  closeAction?: () => void;
  retryAction?: () => void;
  backAction?: () => void;
  isCloseable?: boolean;
}
/** === COMPONENT === */
const BottomSheetError: React.FC<ErrorProps> = (props) => {
  /** => ref */
  const modalRef = useRef<SnbBottomSheet2Ref>(null);
  /** => error code to service name */
  const errorCode = (code: number) => {
    const digit = code.toString();
    switch (digit.length) {
      case 11:
        const error11 = errorData.find(
          (e) => e.new === digit[1] + digit[2] + digit[3],
        );
        return error11 ? error11.service : 'Sinbad';
      case 6:
        const error6 = errorData.find((e) => e.old === digit[0] + digit[1]);
        return error6 ? error6.service : 'Sinbad';
      default:
        return 'Sinbad';
    }
  };
  /** => CTA */
  const buttonCallToAction = (code: number) => {
    if (code !== undefined) {
      const digit = code.toString();
      if (digit.length === 11) {
        switch (digit[4] + digit[5]) {
          case '00':
            return buttonClose();
          case '01':
            return buttonBack();
          case '02':
            return buttonBackToHome();
          case '03':
            return buttonRetry();
          case '04':
            return buttonCloseApp();
          case '05':
            return buttonToReLogin();
          case '06':
            return buttonCallSupport();
          default:
            return buttonClose();
        }
      }
      return buttonClose();
    }
    return buttonRetry();
  };
  /** => check message */
  const message = (error: ErrorItemProps) => {
    if (error.code === undefined) {
      return 'Koneksi Anda terputus silahkan coba lagi';
    }
    return error.message;
  };
  /** => check service name */
  const serviceName = () => {
    if (props.error !== null) {
      if (props.error.code === undefined) {
        return 'Koneksi Anda';
      }
      return errorCode(props.error.code);
    }
    return 'Sinbad';
  };
  /**
   * ======================================================
   * BUTTON VARIANT
   * ======================================================
   */
  /** => button back to home */
  const buttonBackToHome = () => {
    return (
      <FooterButton.Single
        title="Kembali ke Beranda"
        shadow={false}
        loading={false}
        loadingButton={false}
        disabled={false}
        buttonPress={() => {
          props.closeAction ? props.closeAction() : null;
          NavigationAction.resetToHome();
        }}
      />
    );
  };
  /** => button relogin */
  const buttonToReLogin = () => {
    return (
      <FooterButton.Single
        title="Login Ulang"
        shadow={false}
        loading={false}
        loadingButton={false}
        disabled={false}
        buttonPress={() => {
          props.closeAction ? props.closeAction() : null;
          NavigationAction.navigate('LoginPhoneView');
        }}
      />
    );
  };
  /** => button call support */
  const buttonCallSupport = () => {
    return (
      <>
        <View style={{ alignItems: 'center' }}>
          <SnbText.H4>Hubungi CS</SnbText.H4>
        </View>
        <View style={styles.callCSButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              props.closeAction ? props.closeAction() : null;
              Linking.openURL('whatsapp://send?phone=+6282260106010').catch(
                (err) =>
                  err
                    ? Linking.openURL('market://details?id=com.whatsapp')
                    : null,
              );
            }}
            style={styles.callCSButton}>
            <Svg name={'whatsapp'} size={64} />
            <View style={{ justifyContent: 'center' }}>
              <SnbText.B2>Chat</SnbText.B2>
              <SnbText.B2>Whatsapp</SnbText.B2>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callCSButton}
            onPress={() => {
              props.closeAction ? props.closeAction() : null;
              Platform.OS === 'android'
                ? Linking.openURL('tel:+6282260106010')
                : Linking.openURL('telprompt:+6282260106010');
            }}>
            <Svg name={'call'} size={64} />
            <View style={{ justifyContent: 'center' }}>
              <SnbText.B2>Telepon</SnbText.B2>
              <SnbText.B2>Seluler</SnbText.B2>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callCSButton}
            onPress={() => {
              props.closeAction ? props.closeAction() : null;
              Linking.openURL('mailto:help@sinbad.co.id');
            }}>
            <Svg name={'mail'} size={64} />
            <View style={{ justifyContent: 'center' }}>
              <SnbText.B2>Kirim</SnbText.B2>
              <SnbText.B2>Email</SnbText.B2>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  /** => button retry */
  const buttonRetry = () => {
    return (
      <FooterButton.Single
        title="Coba Lagi"
        shadow={false}
        loading={false}
        loadingButton={false}
        disabled={false}
        buttonPress={() => (props.retryAction ? props.retryAction() : null)}
      />
    );
  };
  /** => button close app */
  const buttonCloseApp = () => {
    return (
      <FooterButton.Single
        title="Tutup Aplikasi"
        shadow={false}
        loading={false}
        loadingButton={false}
        disabled={false}
        buttonPress={() => BackHandler.exitApp()}
      />
    );
  };
  /** => button back */
  const buttonBack = () => {
    return (
      <FooterButton.Single
        title="Kembali"
        shadow={false}
        loading={false}
        loadingButton={false}
        disabled={false}
        buttonPress={() => (props.backAction ? props.backAction() : null)}
      />
    );
  };
  /** => button close */
  const buttonClose = () => {
    return (
      <FooterButton.Single
        title="Tutup"
        shadow={false}
        loading={false}
        loadingButton={false}
        disabled={false}
        buttonPress={onClose}
      />
    );
  };
  /** ======================================================================= */
  /** => content item */
  const contentItem = () => {
    const src =
      props.error?.code !== undefined
        ? require('@image/sinbad/error-global.png')
        : require('@image/sinbad/no-connection.png');
    return (
      <Content.Illustration
        image={src}
        title={`Terjadi Kendala di ${serviceName()}`}
        description={props.error !== null ? message(props.error) : ''}
      />
    );
  };
  /** => button */
  const button = () => {
    return props.error !== null
      ? buttonCallToAction(props.error.code)
      : buttonClose();
  };
  /** => content */
  const content = () => {
    return <View style={styles.contentContainer}>{contentItem()}</View>;
  };
  /** => title */
  const title = () => {
    return (
      <SnbBottomSheetPart.Title swipeIndicator swipeIndicatorColor="white" />
    );
  };
  /** => navigation */
  const navigation = () => {
    return (
      <SnbBottomSheetPart.Navigation
        iconRight1Name="x"
        onRight1Action={() => {
          props?.closeAction && props?.closeAction();
          modalRef.current?.close();
        }}
      />
    );
  };
  // state Effect
  useEffect(() => {
    if (props.open && props.error?.code !== 401 && props.error !== null) {
      modalRef.current?.open();
    }
  }, [modalRef.current, props.open, props.error]);

  const onClose = useCallback(() => {
    props?.closeAction && props.closeAction();
    modalRef.current?.close();
  }, [modalRef.current]);
  /** => main */
  return (
    <SnbBottomSheet2
      ref={modalRef}
      name={'globalError'}
      type="content"
      contentHeight={400}
      snap={false}
      close={() => {}}
      navigation={props.isCloseable ? navigation() : null}
      title={title()}
      content={content()}
      button={button()}
      isBackDisable
    />
  );
};
/** === STYLE === */
const styles = StyleSheet.create({
  contentContainer: {
    height: '100%',
  },
  contentImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentErrorContainer: {
    width: '20%',
    height: '10%',
    position: 'absolute',
    bottom: '29%',
    right: '35%',
  },
  buttonContainer: {
    paddingBottom: 16,
  },
  errorBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentTitleContainer: {
    paddingHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentMessageContainer: {
    marginTop: 10,
    paddingHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentItemContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  buttonHeight: {
    height: 90,
  },
  callCSButton: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  callCSButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  image: {
    height: '20%',
    aspectRatio: 1 / 1,
  },
});

export default BottomSheetError;
