import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SnbBottomSheet, SnbButton, SnbText } from 'react-native-sinbad-ui';
/** === INTERFACE === */
/** => error */
interface ValidationErrorProps {
  open: boolean;
  closeAction?: () => void;
}
/** === COMPONENT === */
const ValidationError: React.FC<ValidationErrorProps> = ({
  open,
  ...props
}) => {
  /** ======================================================================= */
  /** => content item image */
  const contentItemImage = () => {
    const src = require('@image/sinbad_image/cry_sinbad.png');
    return (
      <View style={styles.contentImageContainer}>
        <Image source={src} style={styles.image} />
      </View>
    );
  };
  /** => content item title */
  const contentItemTitle = () => {
    return (
      <View style={styles.contentTitleContainer}>
        <SnbText.H4 align={'center'}>Perubahan Produk di Keranjang</SnbText.H4>
      </View>
    );
  };
  /** => content item message */
  const contentItemMessage = () => {
    return (
      <View style={styles.contentMessageContainer}>
        <SnbText.B3 align={'center'}>
          Coba periksa ulang keranjang Anda dikarenakan terdapat perubahan data
          pada produk
        </SnbText.B3>
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
  /** => button */
  const button = () => {
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.buttonHeight}>
          <SnbButton.Single
            title={'Saya Mengerti'}
            onPress={() => {
              props?.closeAction && props?.closeAction();
            }}
            type={'primary'}
          />
        </View>
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
    <SnbBottomSheet
      open={open}
      content={content()}
      size={'halfscreen'}
      closeAction={props?.closeAction}
      actionIcon={'close'}
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
    height: '75%',
    aspectRatio: 1 / 1,
  },
});

export default ValidationError;
