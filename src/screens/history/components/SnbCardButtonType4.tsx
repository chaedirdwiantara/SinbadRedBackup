/** === IMPORT LIB HERE === */
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { color, SnbText, SnbButton } from '@sinbad/react-native-sinbad-ui';

/** === INTERFACE === */
interface Props {
  buttonText: string;
  testID?: string;
  title?: string;
  titleAlign?: 'right' | 'center' | 'left';
  disabled?: boolean;
  buttonType?: string;
  bgColor?: string;
  onPress?: () => void;
}
/** === COMPONENT === */
const SnbCardButtonType4: FC<Props> = (props: any) => {
  const renderButton = () => {
    return (
      <View>
        <SnbButton.Single
          type={props.buttonType ? props.buttonType : 'secondary'}
          title={props.buttonText}
          disabled={props.disabled}
          onPress={props.onPress}
        />
      </View>
    );
  };
  return (
    <View
      style={[
        styles.shadowStyle,
        {
          backgroundColor: props.bgColor ? props.bgColor : color.white,
          flex: 1,
          marginHorizontal: 4,
          borderRadius: 5,
        },
      ]}
      testID={props.testID}>
      <View style={styles.cardBody}>
        <View style={{ marginBottom: 8, marginLeft: 10 }}>
          <SnbText.B4 align={props?.titleAlign || 'center'}>
            {props?.title || null}
          </SnbText.B4>
        </View>
        <View>{renderButton()}</View>
      </View>
    </View>
  );
};
/** === STYLES === */
const styles = StyleSheet.create({
  cardBody: {
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 16,
  },
  titleContainer: {
    flex: 1,
    alignContent: 'flex-start',
    alignSelf: 'center',
  },
  rightContainer: {
    alignSelf: 'center',
    marginLeft: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadowStyle: {
    shadowColor: color.black100,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  subCardBody: {
    flexDirection: 'row',
  },
});
/** === DEFAULT PROPS === */
SnbCardButtonType4.defaultProps = {
  testID: '',
};
/** === EXPORT COMPONENT === */
export default SnbCardButtonType4;
