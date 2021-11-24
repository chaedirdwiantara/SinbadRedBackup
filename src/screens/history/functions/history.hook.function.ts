import React, { useState } from 'react';
/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { navigate } from '@core/navigations/RootNavigation';
import { useNavigation } from '@react-navigation/native';
/** === FUNCTION === */
/** => collect data */
/** => get payment status list */
export const usePaymentStatus = () => {
    const dispatch = useDispatch();
    const data = {loading: true,
      limit: 0,
      skip: 0,}
    return {
      list: (
        contextDispatch: (action: any) => any,
      ) => {
        dispatch(
          Actions.paymentStatusListProcess(contextDispatch, {
            loading: true,
            limit: 0,
            skip: 0,
          }),
        );
      },
    };
  };

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ayu (dinar)
 * createDate: 231121
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> add usePaymentStatus
 */