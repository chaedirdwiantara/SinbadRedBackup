import React, { FC } from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
import { ScrollView } from 'react-native';
import { NavigationAction } from '@navigation';
/** MODULE PAGE */
import MerchantEditPartialView from './merchant-edit-partial.view';

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
      case 'merchantOwnerPhoneNo':
      case 'merchantAccountName':
      case 'merchantAccountPhoneNo':
        return (
          <MerchantEditPartialView type={props.route.params.type} showButton />
        );
      default:
        break;
    }
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
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
