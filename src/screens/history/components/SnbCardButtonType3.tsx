/** === IMPORT LIB HERE === */
import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { color, SnbText } from '@sinbad/react-native-sinbad-ui';

/** === INTERFACE === */
interface Props {
  testID?: string;
  subTitle1?: string;
  subTitle2?: string;
  bottomText: string;
  textRight?: string;
  color?: string;
  left?: any;
  title?: string;
  disabled?: boolean;
  type?: 'check' | 'goTo' | 'waiting';
  bgColor?: string;
  centerTitle?: boolean;
  textColor?: string;
  onPress?: () => void;
}
/** === COMPONENT === */
const SnbCardButtonType3: FC<Props> = (props: any) => {
  const renderMid = () => {
    return (
      <View
        style={[
          styles.titleContainer,
          {
            alignItems: props.centerTitle ? 'center' : 'baseline',
            opacity: props.disabled ? 0.5 : 1,
          },
        ]}>
        <SnbText.H4 color={props?.textColor}>{props.subTitle1}</SnbText.H4>
        {renderSubTitle()}
      </View>
    );
  };
  const renderSubTitle = () => {
    return (
      <View>
        {props.subTitle1 ? (
          <View style={{ marginTop: 4 }}>
            <SnbText.B3 color={props?.textColor}>{props.subTitle2}</SnbText.B3>
          </View>
        ) : null}
      </View>
    );
  };
  const renderBottom = () => {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <SnbText.C2 color={color.red50}>
          {props.bottomText ? props.bottomText : null}
        </SnbText.C2>
      </TouchableOpacity>
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
        <View style={{ marginBottom: 8 }}>
          <SnbText.B4>{props.title ? props.title : null} :</SnbText.B4>
        </View>
        <View style={styles.subCardBody}>
          {props.left ? props.left() : null}
          {renderMid()}
        </View>
        {renderBottom()}
      </View>
    </View>
  );
};
/** === STYLES === */
const styles = StyleSheet.create({
  cardBody: {
    borderRadius: 5,
    marginHorizontal: 16,
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
SnbCardButtonType3.defaultProps = {
  testID: '',
};
/** === EXPORT COMPONENT === */
export default SnbCardButtonType3;
