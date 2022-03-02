import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '@actions';
import * as models from '@models';

export const useEasyRegistration = () => {
  const dispatch = useDispatch();
  const { global, account } = useSelector((state: any) => state);
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
  ) => {
    let productCategoryIds: string[] = [];
    productCategory.forEach((el) => productCategoryIds.push(el.id));
    const data: models.ICreateBasicAccount = {
      locationId: location?.id || '',
      buyerCategoryId: buyerCategory.id,
      productCategoryIds,
    };
    dispatch(Actions.createBasicAccount(data));
  };

  const getCompleteData = React.useCallback(() => {
    dispatch(Actions.getCompleteData());
  }, []);

  const updateCompleteData = (data: models.IUpdateCompleteData) => {
    dispatch(Actions.updateCompleteData(data));
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
    searchLocationState: global.searchLocations,
    buyerCategories: account.buyerCategories,
    productCategories: account.productCategories,
    createBasicAccountState: account.createBasicAccount,
    completeDataState: account.completeData,
    updateCompleteDataState: account.updateCompleteData,
  };
};
