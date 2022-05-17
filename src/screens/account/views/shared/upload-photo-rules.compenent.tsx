import React from 'react';
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  View,
  StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native';
import { ImageBackground } from 'react-native';
import { Brightness } from 'react-native-color-matrix-image-filters';
import { color, SnbButton, SnbText } from '@sinbad/react-native-sinbad-ui';
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
  } = props;
  const source = typeof imgSrc === 'string' ? { uri: imgSrc } : imgSrc;

  function renderVerticalGuidance() {
    return (
      <>
        <View
          style={{
            backgroundColor: color.green10,
            padding: isTiltImage ? 24 : 0,
            borderRadius: 4,
          }}>
          <Image
            source={source}
            resizeMode={resizeMode}
            style={[styles.imageContainer, !isTiltImage && { height: 240 }]}
          />
          <View style={{ position: 'absolute', right: 8, bottom: 8 }}>
            <Svg name="check_circle" size={24} />
          </View>
        </View>
        <View style={{ marginVertical: 8 }} />
        <Brightness amount={1.2}>
          <View
            style={{
              padding: isTiltImage ? 24 : 0,
              backgroundColor: color.red10,
              borderRadius: 4,
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
            <View style={{ position: 'absolute', right: 8, bottom: 8 }}>
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
            style={[styles.imageContainer, { backgroundColor: color.green10 }]}>
            <View style={{ marginRight: 8, marginBottom: 8 }}>
              <Svg name="check_circle" size={24} />
            </View>
          </ImageBackground>
          <View style={{ marginHorizontal: 16 }} />
          <Brightness amount={1.4} style={{ flex: 1 }}>
            <ImageBackground
              source={source}
              resizeMode={resizeMode}
              blurRadius={blurRadius}
              style={[styles.imageContainer, { backgroundColor: color.red10 }]}>
              <View style={{ marginRight: 8, marginBottom: 8 }}>
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
        <View style={{ padding: 16, flex: 1 }}>
          {title && (
            <View style={{ marginVertical: 8 }}>
              <SnbText.B3>{title}</SnbText.B3>
            </View>
          )}
          {type === 'horizontal'
            ? renderHorizontalGuidance()
            : renderVerticalGuidance()}
          <View style={{ marginVertical: 16 }}>
            <SnbText.H4>{rulesTitle}</SnbText.H4>
            <View style={{ marginVertical: 4 }} />
            {rules?.map((el: string, index: number) => {
              return (
                <View key={index} style={{ marginVertical: 4 }}>
                  <SnbText.B3>
                    {props.listType === 'number' ? `${index + 1}.` : '✔'} {el}
                  </SnbText.B3>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={{ height: 72 }}>
        <SnbButton.Single
          title={buttonLabel}
          disabled={false}
          onPress={action}
          type="primary"
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
    marginVertical: 16,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 4,
    height: 160,
    width: undefined,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default UploadPhotoRules;
