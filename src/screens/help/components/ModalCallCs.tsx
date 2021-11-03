import React, { FC, useState } from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import { SnbContainer, SnbText, SnbBottomSheet } from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import HelpCallCsStyle from '../styles/help-CallCs.style';

/** === INTERFACE === */
interface Props {
  open: boolean;
  close?: () => void;
  closeModal?: (data: boolean) => void;
}

const ModalCallCs: FC<Props> = (props) => {
  /** === HOOK === */
  const [phoneNumber] = useState('+6282260106010');
  /** === FUNCTIONAL === */
  const toWhatsAppWithContact = () => {
    props && props.closeModal && props.closeModal(false);
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`).catch((err) => {
      if (err) {
        Linking.openURL('market://details?id=com.whatsapp');
      }
    });
  };
  const toMail = () => {
    props && props.closeModal && props.closeModal(false);
    Linking.openURL('mailto:help@sinbad.co.id');
  };
  /** === VIEW === */
  const content = () => {
    return (
      <View style={HelpCallCsStyle.contentContainer}>
        <TouchableOpacity
          style={HelpCallCsStyle.boxMenu}
          onPress={() => toWhatsAppWithContact()}>
          <Image
            source={require('../../../assets/icons/profile/whatsapp.png')}
            style={HelpCallCsStyle.menuCircleImage}
          />
          <SnbText.B3>Chat</SnbText.B3>
          <SnbText.B3>Whatsapp</SnbText.B3>
        </TouchableOpacity>
        <TouchableOpacity
          style={HelpCallCsStyle.boxMenu}
          onPress={() => toMail()}>
          <Image
            source={require('../../../assets/icons/profile/email.png')}
            style={HelpCallCsStyle.menuCircleImage}
          />
          <SnbText.B3>Kirim</SnbText.B3>
          <SnbText.B3>Email</SnbText.B3>
        </TouchableOpacity>
      </View>
    );
  };
  /** === MAIN === */
  return (
    <SnbContainer color="white">
      <SnbBottomSheet
        open={props.open}
        closeAction={props.close}
        content={content()}
        title={'Hubungi CS'}
        action={true}
        actionIcon={'close'}
      />
    </SnbContainer>
  );
};

export default ModalCallCs;
