/** === IMPORT PACKAGE === */
import React, { FC } from 'react';
import { 
    View, 
    Dimensions,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { SnbIcon, color, SnbText } from 'react-native-sinbad-ui';

/** Third Party Package */
import Modal from 'react-native-modal';

const { height } = Dimensions.get('window');

/** === TYPE === */
interface ModalBottomType1Props {
  title: string;
  typeClose: string;
  close?: () => void;
  isOpen: boolean;
  content: React.ReactNode;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
}

interface ModalBottomType2Props {
  title: string;
  typeClose: string;
  close?: () => void;
  isOpen: boolean;
  content: React.ReactNode;
}

/** === COMPONENT === */
const Type1: FC<ModalBottomType1Props> = (props) => {

    /** PROPS */
    const {
      title,
      typeClose,
      close,
      isOpen,
      content,
      onBackButtonPress,
      onBackdropPress
    } = props

    /** === RENDER TITLE === */
    const renderContentTitle = () => {
      return (
      <View>
        <View style={{ alignItems: 'center' }}>
        <View style={styles.linesSwipeModal} />
        </View>
        <View style={styles.boxContentTitle}>
        <TouchableOpacity style={styles.boxClose} onPress={close}>
          {typeClose === 'cancel' ? (
          <SnbIcon
            name="close"
            color={color.black5}
            size={24}
          />
          ) : (
          <SnbIcon
            name="keyboard-arrow-left"
            color={color.black5}
            size={32}
          />
          )}
        </TouchableOpacity>
        <View>
            <SnbText.C1>{title}</SnbText.C1>
        </View>
        </View>
      </View>
      );
    }

  /** === RENDER BODY === */
  const renderContentBody = () => {
    return <View style={styles.boxContentBody}>{content}</View>;
  }

  /** === RENDER STATUS BAR === */
  const renderContent = () => {
    return (
      <Modal
        isVisible={isOpen}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        swipeDirection={['down']}
        backdropColor={color.black100}
        backdropOpacity={0.4}
        onSwipeMove={close}
        deviceHeight={height}
        style={styles.mainContainer}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropPress}
      >
        <View style={styles.contentContainerType1}>
          {renderContentTitle()}
          {renderContentBody()}
        </View>
      </Modal>
    );
  }

  /** === MAIN === */
  return <View>{renderContent}</View>
}

const Type2: FC<ModalBottomType2Props> = (props) => {

  /** PROPS */
  const {
    title,
    typeClose,
    close,
    isOpen,
    content,
  } = props

  /** === RENDER TITLE === */
  const renderContentTitle = () => {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: 14 }} />
        </View>
        <View style={styles.boxContentTitle}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'btnModalType2Close'}
            style={styles.boxClose}
            onPress={close}
          >
            {typeClose === 'cancel' ? (
              <SnbIcon
                name="close"
                color={color.black5}
                size={24}
              />
            ) : (
              <SnbIcon
                name="keyboard-arrow-left"
                color={color.black5}
                size={32}
              />
            )}
          </TouchableOpacity>
          <View>
            <SnbText.C1>{title}</SnbText.C1>
          </View>
        </View>
      </View>
    );
  }

/** === RENDER BODY === */
const renderContentBody = () => {
  return <View style={styles.boxContentBody}>{content}</View>;
}

/** === RENDER STATUS BAR === */
const renderContent = () => {
  return (
    <Modal
      isVisible={isOpen}
      useNativeDriver={true}
      hasBackdrop={true}
      coverScreen={true}
      backdropColor={color.black100}
      backdropOpacity={0.4}
      deviceHeight={height}
      style={styles.mainContainer}
    >
      <View style={styles.contentContainerType1}>
        {renderContentTitle()}
        {renderContentBody()}
      </View>
    </Modal>
  );
}

/** === MAIN === */
return <View>{renderContent}</View>
}

const styles = StyleSheet.create({
  linesSwipeModal: {
    borderColor: color.black10,
    borderTopWidth: 5,
    borderRadius: 10,
    marginTop: 9,
    width: 63
  },
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  contentContainerType1: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxHeight: 0.8 * height,
    backgroundColor: color.white,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  contentContainerType2: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxHeight: 0.9 * height,
    backgroundColor: color.white,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  boxContentBody: {
    flex: 1,
    paddingTop: 20
  },
  boxContentTitle: {
    marginTop: 18,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  }
});

export const ModalBottom = { Type1, Type2 }

/**
* ============================
* NOTES
* ============================
* createdBy: Maulana Ghozi
* createdDate: 13 October 2021
* updatedBy: 
* updatedDate: 
* updatedFunction:
* 
* 
*/