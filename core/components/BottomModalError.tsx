/** === IMPORT LIB HERE === */
import React, { FC } from 'react';
import { Image, View, ImageSourcePropType } from 'react-native';
import { SnbText, SnbButton, SnbBottomSheet } from 'react-native-sinbad-ui';
/** === INTERFACE === */
interface Props {
  testID?: string;
  errorTitle: string;
  errorSubtitle: string;
  errorImage: ImageSourcePropType;
  buttonTitle: string;
  buttonOnPress: () => void;
  isOpen: boolean;
}
/** === COMPONENT === */
const BottomModalError: FC<Props> = (props) => {
  const content = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={props.errorImage}
          style={{
            height: 148,
            width: '100%',
            resizeMode: 'contain',
            marginBottom: 16,
          }}
        />
        <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
          <SnbText.H4>{props.errorTitle}</SnbText.H4>
          <SnbText.B1 align="center">{props.errorSubtitle}</SnbText.B1>
        </View>
        <View style={{ marginTop: 32, height: 75 }}>
          <SnbButton.Single
            title={props.buttonTitle}
            onPress={() => props.buttonOnPress()}
            type={'primary'}
          />
        </View>
      </View>
    );
  };
  return (
    <View>
      <SnbBottomSheet content={content()} open={props.isOpen} />
    </View>
  );
};
/** === DEFAULT PROPS === */
BottomModalError.defaultProps = {
  testID: '',
};
/** === EXPORT COMPONENT === */
export default BottomModalError;
