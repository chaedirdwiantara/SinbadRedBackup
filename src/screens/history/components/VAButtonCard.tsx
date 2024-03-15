/** === IMPORT LIB HERE === */
import React, { FC, useReducer } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  color,
  SnbText,
  SnbButton,
  SnbToolTips,
  SnbIcon,
} from '@sinbad/react-native-sinbad-ui';

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
  loading?: boolean;
  tooltipShown?: boolean;
  toolTipText?: string;
}
/** === COMPONENT === */
const VAButtonCard: FC<Props> = (props: any) => {
  const [tooltipVisible, toggleTooltipVisible] = useReducer(
    (prevVisible) => !prevVisible,
    false,
  );
  const renderButton = () => {
    return (
      <View>
        <SnbButton.Single
          type={props.buttonType ? props.buttonType : 'secondary'}
          title={props.buttonText}
          disabled={props.disabled}
          onPress={props.onPress}
          loading={props.loading}
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SnbText.B4 align={props?.titleAlign || 'center'}>
              {props?.title || null}
            </SnbText.B4>
            {props.tooltipShown ? (
              <TouchableOpacity
                style={{ marginLeft: 8 }}
                onPress={toggleTooltipVisible}>
                <SnbIcon name="help" color={color.black40} size={16} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <View>{renderButton()}</View>
        <View
          style={{
            position: 'absolute',
            top: 20,
            alignSelf: 'flex-end',
          }}>
          {props.tooltipShown ? (
            <SnbToolTips
              show={tooltipVisible}
              tips="default"
              content={
                <SnbText.C1 align={'center'} color={color.white}>
                  Virtual account hanya {'\n'} dapat diaktifkan setelah{'\n'}{' '}
                  pesanan diterima
                </SnbText.C1>
              }
            />
          ) : null}
        </View>
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
VAButtonCard.defaultProps = {
  testID: '',
};
/** === EXPORT COMPONENT === */
export default VAButtonCard;
