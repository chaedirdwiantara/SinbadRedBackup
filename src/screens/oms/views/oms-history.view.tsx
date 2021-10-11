/** === IMPORT PACKAGE HERE === */
import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '../../../data/actions';
import { RootState } from '../../../data/reducers';
import { goToHistoryDetail } from '../functions';
/** === COMPONENT === */
const OmsHistoryView: FC = () => {
  /** === HOOK === */
  // const data = useSelector((state: RootState) => state.oms);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(data.newOrder);
  // });
  /** === FUNCTION === */
  // const changeStateFunc = () => {
  //   dispatch(Actions.omsNewOrderNotif({ newOrder: !data.newOrder }));
  // };
  /** === VIEW === */
  /** => header */
  const header = () => {
    return <SnbTopNav.Type1 type="red" title="Pesanan" />;
  };
  /** => test to change state */
  const changeState = () => {
    return (
      <TouchableOpacity onPress={() => goToHistoryDetail('order')}>
        <SnbText.B1>Change state</SnbText.B1>
      </TouchableOpacity>
    );
  };
  /** => content */
  const content = () => {
    return (
      <>
        <SnbText.B1>Pesanan Page</SnbText.B1>
        {changeState()}
        {console.log('adfadsfasdfasdf')}
      </>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
    </SnbContainer>
  );
};

export default OmsHistoryView;

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
