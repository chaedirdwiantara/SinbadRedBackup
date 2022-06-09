import Html from '@core/components/Html';
import React, { FC } from 'react';
import { Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  colorV2,
} from 'react-native-sinbad-ui';
import * as models from '@models';
const { height } = Dimensions.get('window');

/** === INTERFACE === */
interface ModalCheckoutTNCProps {
  isOpen: boolean;
  close: () => void;
  data: models.CheckoutTnc | null;
}

/** === COMPONENT === */
export const ModalCheckoutTNC: FC<ModalCheckoutTNCProps> = ({
  isOpen,
  close,
  data,
}) => {
  const content = () => {
    return (
      <View>
        <ScrollView
          style={{
            paddingVertical: 16,
            paddingHorizontal: 16,
            maxHeight: height * 0.6,
            backgroundColor: colorV2.bgColor.neutral,
          }}
          showsVerticalScrollIndicator={false}>
          {data !== null && data !== undefined && (
            <Html value={data.content} fontSize={12} />
          )}
        </ScrollView>
      </View>
    );
  };
  /** => title */
  const title = () => {
    return (
      <SnbBottomSheetPart.Title
        title="Syarat dan Ketentuan"
        titleType="center"
        swipeIndicator
      />
    );
  };
  /** => navigation */
  const navigation = () => {
    return (
      <SnbBottomSheetPart.Navigation
        iconRight1Name="x"
        onRight1Action={close}
      />
    );
  };

  return (
    <SnbBottomSheet2
      name={'checkoutTermsConditionModal'}
      type={'content'}
      contentHeight={250}
      title={title()}
      open={isOpen}
      snap={true}
      content={content()}
      navigation={navigation()}
    />
  );
};
