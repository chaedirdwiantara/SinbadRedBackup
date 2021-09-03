import React, { FC } from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
import { ScrollView, View } from 'react-native';
import { NavigationAction } from '@navigation';

interface Props {
  route: any;
}

const MerchantEditView: FC<Props> = (props) => {
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={props.route.params.title}
        backAction={() => NavigationAction.back()}
      />
    );
  };
  /** THIS FOR SWITCH VIEW */
  const switchView = () => {
    switch (props.route.params.type) {
      case 'merchantCompletenessInformation':
      case 'merchantClassification':
      case 'merchantOwnerIdNo':
      case 'merchantOwnerName':
      case 'merchantOwnerEmail':
      case 'merchantOwnerTaxNo':
      case 'merchantAddress':
      case 'merchantOwnerPhoneNo':
      case 'merchantAccountName':
      case 'merchantAccountPhoneNo':
        return <View />;
      //   case 'merchantOwnerImageTax':
      //     return (
      //       <MerchantEditPartialView
      //         type={this.props.navigation.state.params.type}
      //         showButton={false}
      //         showButtonOpenCamera
      //         typeCamera={'tax'}
      //       />
      //     );
      //   case 'merchantOwnerImageId':
      //     return (
      //       <MerchantEditPartialView
      //         type={this.props.navigation.state.params.type}
      //         showButton={false}
      //         showButtonOpenCamera
      //         typeCamera={'id'}
      //       />
      //     );
      //   case 'merchantOwnerImageSelfie':
      //     return (
      //       <MerchantEditPartialView
      //         type={this.props.navigation.state.params.type}
      //         showButton={false}
      //         showButtonOpenCamera
      //         typeCamera={'selfie'}
      //       />
      //     );
      //   case 'merchantAccountImage':
      //     return (
      //       <MerchantEditPartialView
      //         type={this.props.navigation.state.params.type}
      //         showButton={false}
      //         showButtonOpenCamera
      //         typeCamera={'merchant'}
      //       />
      //     );
      //   default:
      //     break;
    }
  };
  /** => content */
  const content = () => {
    console.log('nih:', props.route.params);

    return (
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        {switchView()}
      </ScrollView>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'white'}>
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default MerchantEditView;
