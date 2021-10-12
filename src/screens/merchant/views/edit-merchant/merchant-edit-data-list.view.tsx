import React, { FC, useEffect } from 'react';
import {
  SnbTopNav,
  SnbContainer,
  SnbListButtonType2,
} from 'react-native-sinbad-ui';
import { ScrollView } from 'react-native';
/** === IMPORT STYLE HERE === */
import MerchantStyles from '../../styles/merchant.style';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { NavigationAction } from '@navigation';
import { contexts } from '@contexts';
import { MerchantHookFunc } from '../../function';

interface Props {
  route: any;
}

const MerchantEditDataListView: FC<Props> = (props) => {
  /** === HOOK === */
  const numberOfEmployeeListAction =
    MerchantHookFunc.useNumberOfEmployeeListAction();
  const { stateMerchant, dispatchSupplier } = React.useContext(
    contexts.MerchantContext,
  );
  useEffect(() => {
    numberOfEmployeeListAction.numberOfEmployeeList(dispatchSupplier);
  }, []);
  console.log('state:', stateMerchant);
  
  /** === VIEW === */
  /** => header */
  const header = () => {
    if (props.route.params.type === 'employee') {
      return (
        <SnbTopNav.Type3
          type="red"
          title={'Jumlah Karyawan'}
          backAction={() => NavigationAction.back()}
        />
      );
    } else {
      return (
        <SnbTopNav.Type7
          type="red"
          backAction={() => NavigationAction.back()}
          placeholder="Cari Kendaraan"
          onChangeText={(text) => console.log(text)}
          clearText={() => console.log('clear text')}
          enter={() => console.log('enter')}
        />
      );
    }
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView contentContainerStyle={MerchantStyles.mainContainer}>
        <SnbListButtonType2 title={'1-10'} />
      </ScrollView>
    );
  };
  /** this for main view */
  return (
    <SnbContainer color={'grey'}>
      {header()}
      {content()}
    </SnbContainer>
  );
};
export default MerchantEditDataListView;
