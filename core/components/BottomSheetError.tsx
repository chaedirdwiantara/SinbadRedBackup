import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { SnbBottomSheet, SnbButton, SnbText } from 'react-native-sinbad-ui';
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
}
/** === COMPONENT === */
const BottomSheetError: React.FC<ErrorProps> = (props) => {
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
          return buttonToLogin();
        case '06':
          return buttonCallSupport();
        default:
          return buttonClose();
      }
    } else if (code === 401) {
      return buttonToLogin();
    }
    return buttonClose();
  };
  /** => check message */
  const message = (error: ErrorItemProps) => {
    if (error.code === 401) {
      return 'Anda sudah logout silahkan login lagi';
    }
    return error.message;
  };
  /** => check service name */
  const serviceName = () => {
    if (props.error !== null) {
      return errorCode(props.error.code);
    }
    return 'Sinbad';
  };
  /** => button back to home */
  const buttonBackToHome = () => {
    return (
      <SnbButton.Single
        title={'Kembali ke Beranda'}
        onPress={() => {
          props.closeAction ? props.closeAction() : null;
          NavigationAction.resetToHome();
        }}
        type={'primary'}
      />
    );
  };
  /** => button relogin */
  const buttonToLogin = () => {
    return (
      <SnbButton.Single
        title={'Login Ulang'}
        onPress={() => {
          props.closeAction ? props.closeAction() : null;
          NavigationAction.navigate('LoginPhoneView');
        }}
        type={'primary'}
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
      <SnbButton.Single
        title={'Coba Lagi'}
        onPress={() => (props.retryAction ? props.retryAction() : null)}
        type={'primary'}
      />
    );
  };
  /** => button close app */
  const buttonCloseApp = () => {
    return (
      <SnbButton.Single
        title={'Tutup Aplikasi'}
        onPress={() => BackHandler.exitApp()}
        type={'primary'}
      />
    );
  };
  /** => button back */
  const buttonBack = () => {
    return (
      <SnbButton.Single
        title={'Kembali'}
        onPress={() => (props.backAction ? props.backAction() : null)}
        type={'primary'}
      />
    );
  };
  /** => button close */
  const buttonClose = () => {
    return (
      <SnbButton.Single
        title={'Tutup'}
        onPress={() => (props.closeAction ? props.closeAction() : null)}
        type={'primary'}
      />
    );
  };
  /** => button */
  const button = () => {
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.buttonHeight}>
          {props.error !== null
            ? buttonCallToAction(props.error.code)
            : buttonClose()}
        </View>
      </View>
    );
  };
  /** => content item message */
  const contentItemMessage = () => {
    return (
      <View style={styles.contentMessageContainer}>
        <SnbText.B1 align={'center'}>
          {props.error !== null ? message(props.error) : ''}
        </SnbText.B1>
      </View>
    );
  };
  /** => content item title */
  const contentItemTitle = () => {
    return (
      <View style={styles.contentTitleContainer}>
        <SnbText.H3
          align={'center'}>{`Terjadi Kendala di ${serviceName()}`}</SnbText.H3>
      </View>
    );
  };
  /** => content item image */
  const contentItemImage = () => {
    return (
      <View style={styles.contentImageContainer}>
        <Image
          source={require('@image/sinbad/error-global.png')}
          style={styles.image}
        />
        <View style={styles.contentErrorContainer}>
          <View style={styles.errorBox}>
            <SnbText.C2>
              {props.error !== null ? props.error?.code : ''}
            </SnbText.C2>
          </View>
        </View>
      </View>
    );
  };
  /** => content item */
  const contentItem = () => {
    return (
      <View style={styles.contentItemContainer}>
        {contentItemImage()}
        {contentItemTitle()}
        {contentItemMessage()}
      </View>
    );
  };
  /** => content */
  const content = () => {
    return (
      <View style={styles.contentContainer}>
        {contentItem()}
        {button()}
      </View>
    );
  };
  /** => main */
  return (
    <SnbBottomSheet open={props.open} content={content()} size={'halfscreen'} />
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
    paddingHorizontal: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentMessageContainer: {
    flex: 1,
    paddingHorizontal: '15%',
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
    height: '75%',
    aspectRatio: 1 / 1,
  },
});

export default BottomSheetError;
