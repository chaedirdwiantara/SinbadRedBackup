/** === IMPORT LIB HERE === */
import React, { FC } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { SnbText, color, SnbIcon } from 'react-native-sinbad-ui';
/** === INTERFACE === */
interface Props {
  testID?: string;
  open?: boolean;
  content: string;
}
/** === COMPONENT === */
const ModalErrorWarning: FC<Props> = (props) => {
  return (
    <>
      <View testID={props.testID}>
        <Modal
          visible={props.open}
          transparent
          animationType="fade"
          statusBarTranslucent>
          <View style={styles.mainContainer}>
            <View style={styles.card}>
              <View style={styles.boxCard}>
                <View style={styles.titleContainer}>
                  <SnbIcon name={'feedback'} size={30} color={color.black60} />
                </View>
                <View style={styles.contentContainer}>
                  <SnbText.B3 align="center" color={color.black80}>
                    {props.content}
                  </SnbText.B3>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
/** === STYLES === */
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'relative',
    height: '100%',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: color.white,
    borderRadius: 12,
    marginHorizontal: '18%',
  },
  boxCard: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxRed: {
    width: '47%',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
  },
  boxWhite: {
    width: '47%',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: color.white,
  },
});

/** === EXPORT COMPONENT === */
export default ModalErrorWarning;
