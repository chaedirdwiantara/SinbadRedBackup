import {
  borderV2,
  colorV2,
  SnbText2,
  spacingV2 as layout,
  SnbIcon,
} from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface OTPInputProps {
  pinCount?: number;
  containerStyle?: object;
  boxStyle?: object;
  inputStyle?: object;
  testID?: string;
  clearInputs?: boolean;
  onCodeChanged?: (code: string) => void;
  autoFocusOnLoad?: boolean;
  otpSuccess?: boolean;
  onCodeFilled?: (result: boolean, code: string) => void;
  code?: string;
  valMessage?: string;
  showMessage?: boolean;
  type: 'default' | 'error' | 'success';
}

const fields: TextInput[] | null[] = [];

const OTPInput: FC<OTPInputProps> = (props = defaultProps) => {
  const {
    containerStyle,
    inputStyle,
    pinCount,
    testID,
    onCodeChanged,
    clearInputs,
    boxStyle,
    autoFocusOnLoad,
    otpSuccess,
    onCodeFilled,
    code,
    valMessage,
    showMessage,
    type,
  } = props;
  const textInputCount = new Array(pinCount).fill(0);
  const [digits, setDigits] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (onCodeChanged) {
      onCodeChanged(digits.join(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  React.useEffect(() => {
    if (pinCount && code && code.length >= pinCount) {
      setDigitsFromCode(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  React.useEffect(() => {
    bringUpKeyBoardIfNeeded();
    setDigitsFromCode(code);
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      blurAllFields,
    );
    return keyboardDidHideListener.remove;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setDigitsFromCode(code: any) {
    const regexp = new RegExp(`^\\d{${pinCount}}$`);
    if (regexp.test(code)) {
      setDigits(code.split(''));
      blurAllFields();
      onCodeFilled && onCodeFilled(true, code);
    }
  }

  function bringUpKeyBoardIfNeeded() {
    const focusIndex = digits.length ? digits.length - 1 : 0;
    if (pinCount && focusIndex < pinCount && autoFocusOnLoad) {
      focusField(focusIndex);
    }
  }

  function focusField(index: number) {
    if (index < fields.length) {
      const input = fields[index] as TextInput;
      input.focus();
    }
  }

  function handleChangeText(index: number, text: string) {
    let newdigits: string[] = digits.slice();
    const oldTextLength = newdigits[index] ? newdigits[index].length : 0;
    const newTextLength = text.length;
    /* istanbul ignore if */
    if (newTextLength - oldTextLength === pinCount) {
      text = text.replace(/[^0-9]/g, '');
      newdigits = text.split('').slice(oldTextLength, newTextLength);
      setDigits(newdigits);
    } else {
      /* istanbul ignore if */
      if (text.length === 0) {
        /* istanbul ignore if */
        if (newdigits.length > 0) {
          newdigits = newdigits.slice(0, newdigits.length - 1);
        }
      } else {
        text = text.replace(/[^0-9]/g, '');
        /* istanbul ignore else */
        text?.split('')?.forEach((value) => {
          /* istanbul ignore if */
          if (pinCount && index < pinCount) {
            newdigits[index] = value;
            index += 1;
          }
        });
        index -= 1;
      }
      setDigits(newdigits);
    }

    let result = newdigits.join('');
    if (pinCount && result.length >= pinCount) {
      onCodeFilled && onCodeFilled(true, result);
      focusField(pinCount - 1);
      blurAllFields();
    } else {
      if (pinCount && text.length > 0 && index < pinCount - 1) {
        onCodeFilled && onCodeFilled(false, result);
        focusField(index + 1);
      }
    }
  }

  function blurAllFields() {
    fields.forEach((field: TextInput | null) => (field as TextInput)?.blur());
  }

  /* istanbul ignore next */
  function handleKeyPressTextInput(index: number, key: string) {
    if (key === 'Backspace') {
      if (!digits[index] && index > 0) {
        handleChangeText(index - 1, '');
        focusField(index - 1);
      }
    }
  }

  function handleValidationWhenClear() {
    if (!clearInputs) {
      let filledPinCount = digits.filter(
        /* istanbul ignore next */
        (digit) => {
          return digit !== null && digit !== undefined;
        },
      ).length;
      if (pinCount) {
        focusField(Math.min(filledPinCount, pinCount - 1));
      }
    } else {
      focusField(0);
      setDigits([]);
    }
  }

  const renderMessage = () => {
    return (
      <View style={styles.messageContainer}>
        <SnbIcon
          name={otpSuccess ? 'check_circle' : 'x_circle'}
          size={12}
          color={otpSuccess ? colorV2.iconColor.green : colorV2.iconColor.error}
        />
        <View style={{ marginHorizontal: layout.spacing.xxsm }} />
        <SnbText2.Paragraph.Tiny
          color={
            otpSuccess ? colorV2.textColor.success : colorV2.textColor.error
          }>
          {valMessage
            ? valMessage
            : otpSuccess
            ? 'Kode verifikasi diterima'
            : 'Kode verifikasi tidak sesuai'}
        </SnbText2.Paragraph.Tiny>
      </View>
    );
  };

  return (
    <View
      style={[containerStyle]}
      accessible
      accessibilityLabel={testID}
      testID={testID}>
      <TouchableWithoutFeedback
        accessible
        accessibilityLabel={`${testID}.touchableWithoutFeedback`}
        style={{ height: 200 }}
        onPress={handleValidationWhenClear}>
        <View style={[boxStyle]}>
          {textInputCount.map((_, index) => {
            return (
              <View pointerEvents="none" key={index + 'view'}>
                <TextInput
                  accessible
                  testID={`${testID}.otpInput${index}`}
                  accessibilityLabel={`${testID}.otpInput${index}`}
                  key={index}
                  selectionColor={colorV2.strokeColor.error}
                  style={[
                    inputStyle,
                    {
                      borderColor:
                        type === 'error'
                          ? colorV2.strokeColor.error
                          : type === 'success'
                          ? colorV2.strokeColor.success
                          : colorV2.strokeColor.default,
                    },
                  ]}
                  value={digits[index] || ''}
                  onChangeText={(text) => handleChangeText(index, text)}
                  ref={(ref) => {
                    fields[index] = ref;
                  }}
                  keyboardType="number-pad"
                  onKeyPress={
                    /* istanbul ignore next */
                    ({ nativeEvent: { key } }) => {
                      handleKeyPressTextInput(index, key);
                    }
                  }
                />
              </View>
            );
          })}
        </View>
      </TouchableWithoutFeedback>
      {showMessage && renderMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    borderColor: colorV2.strokeColor.default,
    margin: layout.spacing.lg,
    borderRadius: borderV2.radius.md,
    backgroundColor: colorV2.bgColor.light,
    shadowColor: colorV2.bgColor.dark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  defaultBoxStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: layout.spacing.lg,
  },
  defaultInput: {
    borderWidth: 1,
    borderColor: colorV2.strokeColor.default,
    textAlign: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    fontSize: 16,
    width: 48,
  },
  messageContainer: {
    marginLeft: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageIcon: {
    alignSelf: 'center',
    marginRight: 4,
  },
});

const defaultProps: OTPInputProps = {
  pinCount: 5,
  containerStyle: styles.defaultContainer,
  inputStyle: styles.defaultInput,
  clearInputs: false,
  boxStyle: styles.defaultBoxStyle,
  autoFocusOnLoad: false,
  otpSuccess: false,
  type: 'default',
};

OTPInput.defaultProps = defaultProps;

export default OTPInput;
