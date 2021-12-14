import React, { FC, useEffect } from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
import { ScrollView, BackHandler } from 'react-native';
import { NavigationAction } from '@navigation';
/** MODULE PAGE */
import MerchantEditPartialView from './merchant-edit-partial.view';
import { MerchantHookFunc } from '../../function';
import { contexts } from '@contexts';

interface Props {
  route: any;
}

const MerchantEditView: FC<Props> = (props) => {
  /** === HOOK === */
  const editMerchantAction = MerchantHookFunc.useEditMerchant();
  const editProfileAction = MerchantHookFunc.useEditProfile();
  const { dispatchSupplier } = React.useContext(contexts.MerchantContext);
  //hardware back handler
  useEffect(() => {
    const backAction = () => {
      NavigationAction.back();
      editMerchantAction.reset(dispatchSupplier);
      editProfileAction.reset(dispatchSupplier);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={props.route.params.title}
        backAction={() => {
          NavigationAction.back();
          editMerchantAction.reset(dispatchSupplier);
          editProfileAction.reset(dispatchSupplier);
        }}
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
