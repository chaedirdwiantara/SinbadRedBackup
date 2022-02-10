/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbButton,
  SnbHtml,
} from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS === */
import { goBack } from '../function';
import { QuestDetailStyles } from '../styles';

/** === COMPONENT === */
const QuestAdditionalInfoView: FC = ({ route }: any) => {
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={
          route.params.type === 'detail'
            ? 'Deskripsi Quest'
            : 'Syarat dan Ketentuan'
        }
        backAction={goBack}
      />
    );
  };
  /** => Render HTML */
  const renderDescriptionHtml = () => {
    const description = route.params.data;
    return (
      <View style={QuestDetailStyles.sectionContainer}>
        <SnbHtml value={description} fontSize={16} />
      </View>
    );
  };
  /** => Render Button */
  const renderButton = () => {
    return (
      <View style={{ height: 75 }}>
        <SnbButton.Single
          type="primary"
          title={'Kembali'}
          onPress={() => goBack()}
          disabled={false}
        />
      </View>
    );
  };
  return (
    <SnbContainer color="white">
      {renderHeader()}
      <View style={{ flex: 1 }}>
        <ScrollView>{renderDescriptionHtml()}</ScrollView>
      </View>
      {renderButton()}
    </SnbContainer>
  );
};

export default QuestAdditionalInfoView;
