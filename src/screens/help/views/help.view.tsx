import React, { FC, useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbButton,
  color,
} from 'react-native-sinbad-ui';
import DeviceInfo from 'react-native-device-info';
/** === IMPORT STYLE HERE === */
import HelpStyle from '../styles/help.style';

const HelpView: FC = () => {
  const [menu] = useState([
    {
      name: 'Hubungi Customer Services',
      goTo: 'call_cs',
    },
    {
      name: 'FAQ',
      goTo: 'faq',
    },
    {
      name: 'Clear Cache',
      goTo: 'clear_cache',
    },
  ]);
  /** === HOOK === */
  /** === VIEW === */
  /** === HEADER === */
  const header = () => {
    return <SnbTopNav.Type1 type="red" title="Bantuan" />;
  };
  /** === RENDER CONTENT HEADER ===*/
  const renderContentHeader = () => {
    return (
      <View style={HelpStyle.headerContainer}>
        <Image
          style={[HelpStyle.image145Contain, { marginBottom: 10 }]}
          source={require('../../../assets/images/sinbad_image/help_sinbad.png')}
        />
        <SnbText.B4 align="center">Sobat Sinbad butuh bantuan ?</SnbText.B4>
        <SnbText.B4 align="center">
          Silahkan bertanya, akan kami bantu menyelesaikan pertanyaan sobat !
        </SnbText.B4>
      </View>
    );
  };
  /** === RENDER MENU CONTENT === */
  const renderContentMenu = () => {
    return menu.map((item, index) => {
      return (
        <>
          <View key={index} style={{ paddingHorizontal: 16 }}>
            <SnbButton.Dynamic
              title={item.name}
              type="tertiary"
              size="small"
              position="left"
              disabled={false}
              contentColor={color.black100}
              loading={false}
              onPress={() => console.log(`pressed ${item.name}`)}
            />
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: color.black10,
              marginLeft: 16,
            }}
          />
        </>
      );
    });
  };
  /** === RENDER VERSION CONTENT === */
  const renderContentVersion = () => {
    const envName = (w = DeviceInfo.getApplicationName()) => {
      let words = w.split(' ');
      if (words.length === 2) {
        return words[1]; // return Development, Staging, ""
      } else {
        return '';
      }
    };

    const textVersion = `${envName()} Versi ${DeviceInfo.getVersion()} ${DeviceInfo.getBuildNumber()}`;

    return (
      <View style={{ padding: 16 }}>
        <SnbText.B3 color={color.black100}>{textVersion}</SnbText.B3>
      </View>
    );
  };
  /** === RENDER CONTENT === */
  const renderContent = () => {
    return (
      <ScrollView>
        {renderContentHeader()}
        {renderContentMenu()}
        {renderContentVersion()}
      </ScrollView>
    );
  };
  /** === MAIN === */
  return (
    <SnbContainer color="white">
      {header()}
      {renderContent()}
    </SnbContainer>
  );
};

export default HelpView;
