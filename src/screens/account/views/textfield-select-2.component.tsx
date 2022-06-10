/** === IMPORT LIB HERE === */
import { colorV2, SnbIcon, SnbText2 } from '@sinbad/react-native-sinbad-ui';
import React, { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
/** === INTERFACE === */
interface Props {
  testID?: string;
  noBorder?: boolean;
  type: 'read' | 'disabled' | 'success' | 'error' | 'default';
  rightType?: 'icon' | 'text';
  rightText?: string;
  rightIcon?: string;
  labelText?: string;
  mandatory?: boolean;
  valMsgSuccess?: string;
  valMsgError?: string;
  helpText?: string;
  value: string;
  placeholder?: string;
  onPress: () => void;
}
/** === COMPONENT === */
const TextFieldSelect: FC<Props> = (props) => {
  /** === STATE === */
  let [borderColor] = useState(colorV2.strokeColor.disable);
  let [backgroundColor] = useState(colorV2.bgColor.light);
  let [textIconColor] = useState(colorV2.iconColor.default);
  /** === FUNCTION === */
  /** => check if type exist */
  switch (props.type) {
    case 'read':
      borderColor = colorV2.bgColor.light;
      backgroundColor = colorV2.bgColor.neutral;
      textIconColor = colorV2.textColor.default;
      break;
    case 'disabled':
      borderColor = colorV2.strokeColor.disable;
      backgroundColor = colorV2.bgColor.neutral;
      textIconColor = colorV2.iconColor.default;
      break;
    case 'success':
      borderColor = colorV2.strokeColor.success;
      backgroundColor = colorV2.bgColor.light;
      textIconColor = colorV2.textColor.default;
      break;
    case 'error':
      borderColor = colorV2.strokeColor.error;
      backgroundColor = colorV2.bgColor.light;
      textIconColor = colorV2.textColor.default;
      break;
    case 'default':
      borderColor = colorV2.strokeColor.disable;
      backgroundColor = colorV2.bgColor.light;
      textIconColor = colorV2.textColor.default;
      break;
  }
  /** === VIEW === */
  /** => label text */
  const labelText = () => {
    return 'labelText' in props && props.labelText !== '' ? (
      <View style={styles.labelTextContainer}>
        {'mandatory' in props && props.type !== 'disabled' ? (
          <SnbText2.Body.Default color={colorV2.iconColor.error}>
            *
          </SnbText2.Body.Default>
        ) : null}
        <SnbText2.Body.Default
          color={
            props.type === 'disabled'
              ? colorV2.textColor.disable
              : colorV2.textColor.default
          }>
          {props.labelText}
        </SnbText2.Body.Default>
      </View>
    ) : (
      <View />
    );
  };
  /** => help text */
  const helpText = () => {
    return 'helpText' in props && props.helpText !== '' ? (
      <View style={{ marginTop: 4 }}>
        <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
          {props.helpText}
        </SnbText2.Paragraph.Default>
      </View>
    ) : (
      <View />
    );
  };
  /** => help */
  const help = () => {
    return (
      <View style={styles.helpContainer}>
        <View style={{ flex: 1 }}>{helpText()}</View>
      </View>
    );
  };
  /** => validation Success */
  const validationSuccess = () => {
    return 'valMsgSuccess' in props &&
      props.valMsgSuccess !== '' &&
      props.type === 'success' ? (
      <View style={styles.validationContainer}>
        <SnbIcon name="check_circle" size={16} color={borderColor} />
        <View style={{ marginRight: 8 }} />
        <SnbText2.Paragraph.Default color={borderColor}>
          {props.valMsgSuccess}
        </SnbText2.Paragraph.Default>
      </View>
    ) : (
      <View />
    );
  };
  /** => validation Error */
  const validationError = () => {
    return 'valMsgError' in props &&
      props.valMsgError !== '' &&
      props.type === 'error' ? (
      <View style={styles.validationContainer}>
        <SnbIcon name="x" size={16} color={borderColor} />
        <View style={{ marginRight: 8 }} />
        <SnbText2.Paragraph.Default color={borderColor}>
          {props.valMsgError}
        </SnbText2.Paragraph.Default>
      </View>
    ) : (
      <View />
    );
  };
  /** => main view */
  return (
    <View testID={props.testID}>
      {labelText()}
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          styles.mainContainer,
          {
            borderWidth: props.noBorder ? 0 : 1,
            backgroundColor,
            borderColor,
          },
        ]}>
        {props.value ? (
          <SnbText2.Paragraph.Default color={textIconColor}>
            {props.value}
          </SnbText2.Paragraph.Default>
        ) : (
          <SnbText2.Paragraph.Default color={colorV2.textColor.placeholder}>
            {props.placeholder}
          </SnbText2.Paragraph.Default>
        )}
        <View style={{ justifyContent: 'flex-end' }}>
          {props.rightType === 'text' && props.rightText ? (
            <SnbText2.Paragraph.Default color={colorV2.textColor.placeholder}>
              {props.rightText}
            </SnbText2.Paragraph.Default>
          ) : props.rightType === 'icon' && props.rightIcon ? (
            <SnbIcon
              color={colorV2.iconColor.dark}
              name={props.rightIcon}
              size={18}
            />
          ) : null}
        </View>
      </TouchableOpacity>
      {validationSuccess()}
      {validationError()}
      {help()}
    </View>
  );
};
/** === STYLES === */
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderRadius: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  labelTextContainer: {
    marginBottom: 4,
    flexDirection: 'row',
  },
  validationContainer: {
    marginTop: 4,
    flexDirection: 'row',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
/** === DEFAULT PROPS === */
TextFieldSelect.defaultProps = {
  testID: '',
};
/** === EXPORT COMPONENT === */
export default TextFieldSelect;
