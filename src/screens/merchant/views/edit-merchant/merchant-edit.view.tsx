import React, { FC, useEffect } from 'react';
import { SnbContainer, SnbTopNav2 } from 'react-native-sinbad-ui';
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
      <SnbTopNav2.Type3
        color="white"
        title={props.route.params.title}
        backAction={() => {
          NavigationAction.back();
          editMerchantAction.reset(dispatchSupplier);
          editProfileAction.reset(dispatchSupplier);
        }}
        testID={props.route.params.testID}
      />
    );
  };
  /** THIS FOR SWITCH VIEW */
  const switchView = () => {
    return (
      <MerchantEditPartialView
        type={props.route.params.type}
        source={props.route.params.source}
        sourceData={props.route.params.sourceData}
        showButton
        originFrom={props.route.params?.originFrom}
        testID={props.route.params.testID}
      />
    );
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
