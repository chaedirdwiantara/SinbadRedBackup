/** === IMPORT LIB HERE === */
import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  color as colors,
  SnbText2,
  SnbTextSeeMoreType1,
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
  pressBadge1?: () => void;
  pressBadge2?: () => void;
  separator?: boolean;
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
          <SnbText2.Paragraph.Small>{props.title}</SnbText2.Paragraph.Small>
        </View>
        {props.subTitle1 ? (
          <View style={styles.textSubtitle1}>
            <SnbTextSeeMoreType1 line={1}>
              <SnbText2.Paragraph.Small>
                {props.subTitle1}
              </SnbText2.Paragraph.Small>
            </SnbTextSeeMoreType1>
          </View>
        ) : null}
        {props.subTitle2 ? (
          <View style={styles.textSubtitle2}>
            <SnbText2.Paragraph.Small>
              {props.subTitle2}
            </SnbText2.Paragraph.Small>
          </View>
        ) : null}
      </View>
    );
  };
  const renderRight = () => {
    return (
      <View style={styles.rightContainer}>
        <SnbText2.Paragraph.Small
          color={props.colorTextRight ? props.colorTextRight : colors.black100}>
          {props.textRight}
        </SnbText2.Paragraph.Small>
        <View style={{ marginLeft: 16 }}>
          {props.rightItem ? props.rightItem : null}
        </View>
      </View>
    );
  };
  const badgeCompletness1 = () => {
    return (
      <View
        style={[
          styles.badgeContainer,
          {
            marginTop: 16,
          },
        ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {props.leftBadgeItem1}
          <View style={{ marginLeft: 16 }}>
            <SnbText2.Paragraph.Small>
              {props.badgesTitle1}
            </SnbText2.Paragraph.Small>
          </View>
        </View>
        <TouchableOpacity
          onPress={props.pressBadge1}
          style={{ marginLeft: 16, justifyContent: 'flex-end' }}>
          <SnbText2.Body.Small color={colors.blue50}>
            Lengkapi
          </SnbText2.Body.Small>
        </TouchableOpacity>
      </View>
    );
  };
  const badgeCompletness2 = () => {
    return (
      <View
        style={[
          styles.badgeContainer,
          {
            marginTop: 16,
          },
        ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {props.leftBadgeItem2}
          <View style={{ marginLeft: 16 }}>
            <SnbText2.Paragraph.Small>
              {props.badgesTitle2}
            </SnbText2.Paragraph.Small>
          </View>
        </View>
        <TouchableOpacity
          onPress={props.pressBadge2}
          style={{ marginLeft: 16, justifyContent: 'flex-end' }}>
          <SnbText2.Body.Small color={colors.blue50}>
            Lengkapi
          </SnbText2.Body.Small>
        </TouchableOpacity>
      </View>
    );
  };
  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View>
      <TouchableOpacity
        style={{ marginTop: 16, opacity: props.disabled ? 0.5 : 1 }}
        onPress={props.onPress}
        disabled={props.disabled}>
        <View style={styles.mainContainer}>
          {renderLeft()}
          {renderMid()}
          {renderRight()}
        </View>
      </TouchableOpacity>
      {props.badges1 ? badgeCompletness1() : null}
      {props.badges2 ? badgeCompletness2() : null}
      {props.separator ? renderSeparator() : null}
    </View>
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
  badgeContainer: {
    backgroundColor: colors.blue10,
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
});
/** === EXPORT COMPONENT === */
export default SnbListButton;
