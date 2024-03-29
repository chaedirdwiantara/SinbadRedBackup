import React, { FC, useState, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbListButtonType2,
  color,
} from 'react-native-sinbad-ui';
import DeviceInfo from 'react-native-device-info';
import ModalCallCs from '../components/ModalCallCs';
import { useCallCsModal } from '../functions';
import { NavigationAction } from '@navigation';
import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
import { copilotOptions } from '@screen/account/views/shared';
import { useCoachmark } from '@screen/account/functions';
/** === IMPORT STYLE HERE === */
import HelpStyle from '../styles/help.style';
/** === CONSTANT === */
const CopilotView = walkthroughable(View);

const HelpView: FC = ({ start }: any) => {
  const [menu] = useState([
    {
      name: 'Hubungi Customer Services',
      goTo: 'call_cs',
    },
    {
      name: 'FAQ',
      goTo: 'faq',
    },
    // {
    //   name: 'Clear Cache',
    //   goTo: 'clear_cache',
    // },
  ]);
  /** === HOOK === */
  const callCsModal = useCallCsModal();
  const { coachmarkState } = useCoachmark();

  //function for start couchmark
  useEffect(() => {
    if (typeof coachmarkState.data?.helpCoachmark === 'boolean') {
      if (coachmarkState?.data?.helpCoachmark === false) {
        setTimeout(() => {
          start();
        }, 100);
      }
    }
  }, [coachmarkState?.data?.helpCoachmark]);

  const handleClearCache = () => {};

  const goTo = (page: string) => {
    switch (page) {
      case 'call_cs':
        callCsModal.setOpen(true);
        break;
      case 'faq':
        NavigationAction.navigate('HelpFaqView');
        break;
      case 'clear_cache':
        handleClearCache();
        break;
      default:
        break;
    }
  };

  const closeModal = (data: boolean) => {
    callCsModal.setOpen(data);
  };
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
        <View key={index} style={{ paddingHorizontal: 16 }}>
          <SnbListButtonType2
            title={item.name}
            onPress={() => goTo(item.goTo)}
          />
        </View>
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

  //walkthrough couchmark
  const couchmarkWalkthrough = () => {
    if (
      typeof coachmarkState?.data?.helpCoachmark === 'boolean' &&
      coachmarkState?.data?.helpCoachmark === false
    ) {
      return (
        <View>
          <View style={{ flex: 1 }}>
            <CopilotStep
              text="Hubungi customer service kami yang siap membantu masalah Anda."
              order={1}
              name="Perlu bantuan?">
              <CopilotView
                style={{
                  height: 50,
                  width: '100%',
                  position: 'absolute',
                  elevation: -100,
                }}
              />
            </CopilotStep>
          </View>
          <View style={{ flex: 1 }}>
            <CopilotStep
              text="Pertanyaan yang sering ditanyakan bisa Anda temukan di sini."
              order={2}
              name="Cari jawaban di sini">
              <CopilotView
                style={{
                  height: 50,
                  width: '100%',
                  position: 'absolute',
                  marginTop: 50,
                  elevation: -100,
                }}
              />
            </CopilotStep>
          </View>
        </View>
      );
    }
  };

  /** === RENDER CONTENT === */
  const renderContent = () => {
    return (
      <ScrollView>
        {renderContentHeader()}
        {couchmarkWalkthrough()}
        {renderContentMenu()}
        {renderContentVersion()}
      </ScrollView>
    );
  };
  /** === RENDER MODAL CALL CS === */
  const renderCallCsModal = () => {
    return (
      <ModalCallCs
        open={callCsModal.isOpen}
        close={() => callCsModal.setOpen(false)}
        closeModal={(ref: boolean) => closeModal(ref)}
      />
    );
  };

  /** === MODALS */
  const renderModals = () => {
    return renderCallCsModal();
  };
  /** === MAIN === */
  return (
    <SnbContainer color="white">
      {header()}
      {renderContent()}
      {renderModals()}
    </SnbContainer>
  );
};

export default copilot(copilotOptions(2, 'helpCoachmark'))(HelpView);
