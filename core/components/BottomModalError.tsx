/** === IMPORT LIB HERE === */
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Image, View, ImageSourcePropType } from 'react-native';
import {
  SnbText2,
  SnbButton2,
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbBottomSheet2Ref,
  colorV2,
  spacingV2,
} from 'react-native-sinbad-ui';
/** === INTERFACE === */
interface Props {
  testID?: string;
  errorTitle: string;
  errorSubtitle: string;
  errorImage: ImageSourcePropType;
  errorImageSvg?: ReactNode;
  contentHeight?: number;
  buttonTitle: string;
  buttonOnPress: () => void;
  isOpen: boolean;
  onDismis?: () => void;
}

/** VAR */
const { spacing } = spacingV2;
/** === COMPONENT === */
const BottomModalError: FC<Props> = (props) => {
  const modalRef = useRef<SnbBottomSheet2Ref>(null);

  const onButtonPress = useCallback(() => {
    props.buttonOnPress();
    modalRef.current?.close();
  }, [modalRef.current]);

  const content = useMemo(
    () => (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {props.errorImageSvg ? (
          props.errorImageSvg
        ) : (
          <Image
            source={props.errorImage}
            style={{
              height: 148,
              width: '100%',
              resizeMode: 'contain',
              marginBottom: spacing.lg,
            }}
          />
        )}
        <View style={{ alignItems: 'center', marginHorizontal: spacing.lg }}>
          <SnbText2.Headline.Default>
            {props.errorTitle}
          </SnbText2.Headline.Default>
          <View style={{ marginTop: spacing.lg }}>
            <SnbText2.Paragraph.Default
              align="center"
              color={colorV2.textColor.secondary}>
              {props.errorSubtitle} Maaf, Sinbad belum beroperasi di lokasi toko
              Anda.
            </SnbText2.Paragraph.Default>
          </View>
        </View>
      </View>
    ),
    [props.errorTitle, props.errorImage, props.errorImageSvg],
  );

  useEffect(() => {
    if (props.isOpen) {
      modalRef.current?.open();
    }
  }, [props.isOpen]);
  return (
    <View>
      <SnbBottomSheet2
        name="modal-error"
        snap={false}
        close={props.onDismis}
        type="content"
        contentHeight={props.contentHeight}
        closeFromBackdrop={false}
        ref={modalRef}
        content={content}
        title={
          <SnbBottomSheetPart.Title
            swipeIndicator={false}
            swipeIndicatorColor="white"
          />
        }
        button={
          <View style={{ padding: spacing.lg }}>
            <SnbButton2.Primary
              size="medium"
              full
              title={props.buttonTitle}
              onPress={onButtonPress}
            />
          </View>
        }
      />
    </View>
  );
};
/** === DEFAULT PROPS === */
BottomModalError.defaultProps = {
  testID: '',
  contentHeight: 350,
};
/** === EXPORT COMPONENT === */
export default BottomModalError;
