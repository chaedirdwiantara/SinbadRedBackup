import Html from '@core/components/Html';
import React, { FC, useState } from 'react';
import { Dimensions, View , Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  SnbText,
  SnbDivider,
  color,
  SnbBottomSheet,
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
  data
}) => {
  const content = () => {
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <ScrollView
            style={{ paddingVertical: 16, maxHeight: height * 0.6 }}
            showsVerticalScrollIndicator={false}>
            {data != null && data != undefined && (
              <Html
                value={data.content}
                fontSize={12}
              />
             )
            }
          </ScrollView>
      </View>
    )
  }
  return (
    <SnbBottomSheet
    open={isOpen}
    content={content()}
    title={'Syarat dan Ketentuan'}
    closeAction={close}
    actionIcon={'close'}
    />
  )
}