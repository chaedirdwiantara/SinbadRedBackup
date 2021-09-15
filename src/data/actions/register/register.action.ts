import { CheckPhoneNoAvailability } from '@model/register-data.model';
import * as models from '@models';
import * as types from '@types';

export const checkPhoneNoAvailabilityProcess = (
  contextDispatch: any,
  params: models.CheckPhoneNoAvailability,
): any => {
  contextDispatch({
    type: types.CHECK_PHONE_AVAILABILITY_PROCESS,
    payload: params,
  });
  return {
    type: types.CHECK_PHONE_AVAILABILITY_PROCESS,
    payload: params,
    contextDispatch,
  };
};

export const checkPhoneNoAvailabilitySuccess = (
  contextDispatch: any,
  data: any,
): any => {
  contextDispatch({
    type: types.CHECK_PHONE_AVAILABILITY_SUCCESS,
    payload: data,
  });
  return {
    type: types.CHECK_PHONE_AVAILABILITY_SUCCESS,
    payload: data,
  };
};

export const checkPhoneNoAvailabilityFailed = (
  contextDispatch: any,
  data: any,
): any => {
  contextDispatch({
    type: types.CHECK_PHONE_AVAILABILITY_FAILED,
    payload: data,
  });
  return {
    type: types.CHECK_PHONE_AVAILABILITY_FAILED,
    payload: data,
  };
};
