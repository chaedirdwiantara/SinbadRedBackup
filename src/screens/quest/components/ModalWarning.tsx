import React, { FC } from 'react';
import { View, Modal, Image } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
import { QuestTaskCompleteStoreStyles } from '../styles';

interface Props {
  open: boolean;
  content: string;
}

const ModalWarning: FC<Props> = (props) => {
  /** === FUNCTION === */
  const { open, content } = props;
  /** === VIEW === */
  /** => render main view */
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => {}}>
      <View style={QuestTaskCompleteStoreStyles.container}>
        <View style={QuestTaskCompleteStoreStyles.card}>
          <View style={QuestTaskCompleteStoreStyles.boxCard}>
            <View style={QuestTaskCompleteStoreStyles.containerImage}>
              <Image
                source={require('../../../assets/icons/quest/error.png')}
                style={{ height: 28, width: 28 }}
              />
            </View>
            <View style={QuestTaskCompleteStoreStyles.contentContainer}>
              <SnbText.B3 align="center">{content}</SnbText.B3>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWarning;
