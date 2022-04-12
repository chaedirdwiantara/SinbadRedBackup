/** === IMPORT LIB HERE === */
import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  color as colors,
  SnbText,
  SnbTextSeeMoreType1,
  SnbIcon,
} from 'react-native-sinbad-ui';
/** === INTERFACE === */
interface Props {
  disabled?: boolean;
  onPress?: () => void;
  leftItem: React.ReactNode;
  rightItem?: React.ReactNode;
  title: string;
  subTitle1?: string;
  subTitle2?: string;
  textRight?: string;
  colorTextRight?: string;
  badges1?: boolean;
  badgesTitle1?: string;
  badges2?: boolean;
  badgesTitle2?: string;
  leftBadgeItem1?: React.ReactNode;
  leftBadgeItem2?: React.ReactNode;
}
/** === COMPONENT === */
const SnbListButton: FC<Props> = (props) => {
  const renderLeft = () => {
    return <View style={styles.leftContainer}>{props.leftItem}</View>;
  };
  const renderMid = () => {
    return (
      <View style={styles.midContainer}>
        <View>
          <SnbText.B4>{props.title}</SnbText.B4>
        </View>
        {props.subTitle1 ? (
          <View style={styles.textSubtitle1}>
            <SnbTextSeeMoreType1 line={1}>
              <SnbText.C1>{props.subTitle1}</SnbText.C1>
            </SnbTextSeeMoreType1>
          </View>
        ) : null}
        {props.subTitle2 ? (
          <View style={styles.textSubtitle2}>
            <SnbText.C1>{props.subTitle2}</SnbText.C1>
          </View>
        ) : null}
      </View>
    );
  };
  const renderRight = () => {
    return (
      <View style={styles.rightContainer}>
        <SnbText.B4
          color={props.colorTextRight ? props.colorTextRight : colors.black100}>
          {props.textRight}
        </SnbText.B4>
        <View style={{ marginLeft: 16 }}>
          {props.rightItem ? props.rightItem : null}
        </View>
      </View>
    );
  };
  const badgeCompletness1 = () => {
    return (
      <View
        style={{
          backgroundColor: colors.blue10,
          flexDirection: 'row',
          margin: 16,
          borderRadius: 8,
        }}>
        {props.leftBadgeItem1}
        <SnbText.B3>{props.badgesTitle1}</SnbText.B3>
        <TouchableOpacity style={{ padding: 16 }}>
          <SnbText.B4 color={colors.blue50}>Lengkapi</SnbText.B4>
        </TouchableOpacity>
      </View>
    );
  };
  const badgeCompletness2 = () => {
    return (
      <View style={{ backgroundColor: colors.blue40 }}>
        <SnbIcon name={'ktp'} color={colors.blue50} />
        <SnbText.B3>{props.badgesTitle2}</SnbText.B3>
      </View>
    );
  };
  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <TouchableOpacity
      style={{ marginTop: 16, opacity: props.disabled ? 0.5 : 1 }}
      onPress={props.onPress}
      disabled={props.disabled}>
      <View style={styles.mainContainer}>
        {renderLeft()}
        {renderMid()}
        {renderRight()}
      </View>
      {props.badges1 ? badgeCompletness1() : null}
      {props.badges2 ? badgeCompletness2() : null}
      {renderSeparator()}
    </TouchableOpacity>
  );
};
/** === STYLES === */
const styles = StyleSheet.create({
  mainContainer: {
    color: colors.white,
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  separator: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: colors.black10,
    marginLeft: 16,
    marginTop: 10,
  },
  leftContainer: {
    alignContent: 'flex-start',
    marginRight: 16,
    alignSelf: 'center',
  },
  leftImage: {
    width: 50,
    height: 50,
  },
  midContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  textSubtitle1: {
    marginLeft: -20,
  },
  textSubtitle2: {
    marginBottom: 4,
  },
  rightContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
/** === EXPORT COMPONENT === */
export default SnbListButton;
