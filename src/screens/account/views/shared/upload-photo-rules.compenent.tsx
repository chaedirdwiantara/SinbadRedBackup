import React from 'react';
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Brightness } from 'react-native-color-matrix-image-filters';
import {
  colorV2,
  SnbButton2,
  SnbText2,
  borderV2,
  spacingV2 as layout,
} from '@sinbad/react-native-sinbad-ui';
import Svg from '@svg';

interface Props {
  rulesTitle: string;
  rules: string[];
  imgSrc: string | ImageSourcePropType;
  action: () => void;
  buttonLabel?: string;
  title?: string | undefined;
  blurRadius?: number;
  resizeMode?: ImageResizeMode;
  listType?: 'number' | 'icon';
  type: 'horizontal' | 'vertical';
  isTiltImage?: boolean;
  brightnessAmount?: number;
  testID?: string;
}

const UploadPhotoRules: React.FC<Props> = (props) => {
  const {
    title,
    imgSrc,
    rulesTitle,
    rules,
    blurRadius,
    resizeMode,
    action,
    buttonLabel,
    type,
    isTiltImage,
    brightnessAmount,
  } = props;
  const source = typeof imgSrc === 'string' ? { uri: imgSrc } : imgSrc;

  function renderVerticalGuidance() {
    return (
      <>
        <View
          style={{
            backgroundColor: colorV2.bgColor.green,
            padding: isTiltImage ? layout.spacing.xl : 0,
            borderRadius: borderV2.radius.sm,
          }}>
          <Image
            source={source}
            resizeMode={resizeMode}
            style={[styles.imageContainer, !isTiltImage && { height: 240 }]}
          />
          <View
            style={{
              position: 'absolute',
              right: layout.spacing.sm,
              bottom: layout.spacing.sm,
            }}>
            <Svg name="check_circle" size={24} />
          </View>
        </View>
        <View style={{ marginVertical: layout.spacing.sm }} />
        <Brightness amount={brightnessAmount || 1.2}>
          <View
            style={{
              padding: isTiltImage ? layout.spacing.xl : 0,
              backgroundColor: colorV2.bgColor.red,
              borderRadius: borderV2.radius.sm,
            }}>
            <Image
              source={source}
              resizeMode={resizeMode}
              blurRadius={blurRadius}
              style={[
                styles.imageContainer,
                isTiltImage && { transform: [{ rotate: '10deg' }] },
                !isTiltImage && { height: 240 },
              ]}
            />
            <View
              style={{
                position: 'absolute',
                right: layout.spacing.sm,
                bottom: layout.spacing.sm,
              }}>
              <Svg name="x_circle" size={24} />
            </View>
          </View>
        </Brightness>
      </>
    );
  }

  function renderHorizontalGuidance() {
    return (
      <>
        <View style={styles.container}>
          <ImageBackground
            source={source}
            resizeMode={resizeMode}
            style={[
              styles.imageContainer,
              { backgroundColor: colorV2.bgColor.green },
            ]}>
            <View
              style={{
                marginRight: layout.spacing.sm,
                marginBottom: layout.spacing.sm,
              }}>
              <Svg name="check_circle" size={24} />
            </View>
          </ImageBackground>
          <View style={{ marginHorizontal: layout.spacing.lg }} />
          <Brightness amount={1.4} style={{ flex: 1 }}>
            <ImageBackground
              source={source}
              resizeMode={resizeMode}
              blurRadius={blurRadius}
              style={[
                styles.imageContainer,
                { backgroundColor: colorV2.bgColor.red },
              ]}>
              <View
                style={{
                  marginRight: layout.spacing.sm,
                  marginBottom: layout.spacing.sm,
                }}>
                <Svg name="x_circle" size={24} />
              </View>
            </ImageBackground>
          </Brightness>
        </View>
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: layout.spacing.lg, flex: 1 }}>
          {title && (
            <View style={{ marginVertical: layout.spacing.sm }}>
              <SnbText2.Headline.Small>{title}</SnbText2.Headline.Small>
            </View>
          )}
          {type === 'horizontal'
            ? renderHorizontalGuidance()
            : renderVerticalGuidance()}
          <View style={{ marginVertical: layout.spacing.lg }}>
            <SnbText2.Headline.Small>{rulesTitle}</SnbText2.Headline.Small>
            <View style={{ marginVertical: layout.spacing.xxsm }} />
            {rules?.map((el: string, index: number) => {
              return (
                <View key={index}>
                  <SnbText2.Paragraph.Tiny>
                    {props.listType === 'number' ? `${index + 1}.` : '✔'} {el}
                  </SnbText2.Paragraph.Tiny>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: layout.spacing.lg }}>
        <SnbButton2.Primary
          title={buttonLabel || ''}
          disabled={false}
          onPress={action}
          size="medium"
          full
          testID={props.testID}
        />
      </View>
    </View>
  );
};

UploadPhotoRules.defaultProps = {
  blurRadius: 8,
  resizeMode: 'center',
  buttonLabel: 'Ambil Foto',
  type: 'horizontal',
  isTiltImage: false,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: layout.spacing.lg,
  },
  imageContainer: {
    flex: 1,
    borderRadius: borderV2.radius.sm,
    height: 160,
    width: undefined,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default UploadPhotoRules;
