import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '@actions';
import * as models from '@models';

export const useEasyRegistration = () => {
  const dispatch = useDispatch();
  const { global, easyRegistration } = useSelector((state: any) => state);

  const getBuyerCategory = React.useCallback(() => {
    dispatch(Actions.getBuyerCategory());
  }, []);

  const getProductCategory = React.useCallback(() => {
    dispatch(Actions.getProductCategory());
  }, []);

  const searchLocation = React.useCallback((keyword: string) => {
    dispatch(
      Actions.searchLocation({ keyword, skip: 0, limit: 100, loading: true }),
    );
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

  return {
    searchLocation,
    searchLocationState: global.searchLocation,
    buyerCategories: easyRegistration.buyerCategories,
    productCategories: easyRegistration.productCategories,
    createBasicAccountState: easyRegistration.createBasicAccount,
    createBasicAccount,
    getBuyerCategory,
    getProductCategory,
  };
};
