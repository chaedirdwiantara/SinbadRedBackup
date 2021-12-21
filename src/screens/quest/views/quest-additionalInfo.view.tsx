/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { SnbContainer, SnbTopNav, SnbButton } from 'react-native-sinbad-ui';
import RenderHtml from 'react-native-render-html';
/** === IMPORT FUNCTIONS === */
import { goBack } from '../function';
import { QuestDetailStyles } from '../styles';

const { width } = Dimensions.get('window');

/** === COMPONENT === */
const QuestAdditionalInfoView: FC = ({ route }: any) => {
  console.log(route, 'ROUTEEE');
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
    const sourceHtml = {
      html: route.params.data,
    };
    return (
      <View style={QuestDetailStyles.sectionContainer}>
        <RenderHtml contentWidth={width} source={sourceHtml} />
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
