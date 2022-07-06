import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '@actions';
import * as models from '@models';
import { StackActions, useNavigation } from '@react-navigation/native';
import { DATA_COMPLETENESS_VIEW } from './screens_name';
import { uniqueId } from '@core/functions/global/device-data';

export const useEasyRegistration = () => {
  const dispatch = useDispatch();
  const { global, account } = useSelector((state: any) => state);
  const { dispatch: navigationDispatch, getState } = useNavigation();

  const backToDataCompleteness = () => {
    const dataCompletenessIndex = getState().routes.findIndex(
      (el) => el.name === DATA_COMPLETENESS_VIEW,
    );
    navigationDispatch(
      StackActions.pop(getState().index - dataCompletenessIndex),
    );
  };

  const getBuyerCategory = React.useCallback(() => {
    dispatch(Actions.getBuyerCategory());
  }, []);

  const getProductCategory = React.useCallback(() => {
    dispatch(Actions.getProductCategory());
  }, []);

  const searchLocation = React.useCallback((keyword: string) => {
    dispatch(Actions.searchLocation({ keyword, page: 1, perPage: 20 }));
  }, []);

  const loadMoreSearchLocation = React.useCallback(
    (keyword: string, page: number, perPage: number) => {
      dispatch(Actions.loadMoreSearchLocation({ keyword, page, perPage }));
    },
    [],
  );

  const resetSearchLocation = React.useCallback(() => {
    dispatch(Actions.resetSearchLocation());
  }, []);

  const resetUpdateCompleteData = React.useCallback(() => {
    dispatch(Actions.resetUpdateCompleteData());
  }, []);

  const createBasicAccount = (
    location: models.ISearchLocationsData | null,
    buyerCategory: models.IBuyerCategory,
    productCategory: any[],
    meV2Data: any,
  ) => {
    let productCategoryIds: string[] = [];
    productCategory.forEach((el) => productCategoryIds.push(el.id));
    const data: models.ICreateBasicAccount = {
      locationId: location?.id || '',
      buyerCategoryId: buyerCategory.id,
      productCategoryIds,
    };

    const params = {
      unique_id: uniqueId,
      owner_id: meV2Data?.data?.data?.user?.id,
      owner_mobile_number: meV2Data?.data?.data?.user?.name,
      store_id: meV2Data?.data?.data?.buyerId,
      store_category: buyerCategory.name,
      product_category: productCategory
        .map((v) => {
          return v.name;
        })
        .join(', '),
      location: `${location?.city}, ${location?.district}, ${location?.urban}`,
    };
    dispatch(Actions.createBasicAccount(data, params));
  };

  const getCompleteData = React.useCallback(() => {
    dispatch(Actions.getCompleteData());
  }, []);

  const refetchCompleteData = React.useCallback(() => {
    dispatch(Actions.refetchCompleteData());
  }, []);

  const updateCompleteData = (data: models.IUpdateCompleteData) => {
    dispatch(Actions.updateCompleteData(data));
  };

  const completeDataConfirmation = () => {
    dispatch(Actions.completeDataConfirmation());
  };

  const resetCompleteDataConfirmation = () => {
    dispatch(Actions.resetCompleteDataConfirmation());
  };

  const useGetUserMedea = () => {
    const { userMedeaData } = useSelector((state: any) => state.auth);
    return {
      getUserMedea: (data: models.IUserMedeaProcess) => {
        dispatch(Actions.getUserMedeaProcess(data));
      },
      getUserMedeaReset: () => {
        dispatch(Actions.getUserMedeaReset());
      },
      userMedeaData,
    };
  };

  return {
    searchLocation,
    createBasicAccount,
    getBuyerCategory,
    getProductCategory,
    loadMoreSearchLocation,
    resetSearchLocation,
    getCompleteData,
    updateCompleteData,
    resetUpdateCompleteData,
    refetchCompleteData,
    backToDataCompleteness,
    completeDataConfirmation,
    resetCompleteDataConfirmation,
    searchLocationState: global.searchLocations,
    buyerCategories: account.buyerCategories,
    productCategories: account.productCategories,
    createBasicAccountState: account.createBasicAccount,
    completeDataState: account.completeData,
    updateCompleteDataState: account.updateCompleteData,
    completeDataConfirmationState: account.completeDataConfirmation,
    useGetUserMedea,
  };
};
