/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
/** === FUNCTION === */
/** => call action */
const useCategoryAction = () => {
  const dispatch = useDispatch();
  return {
    home: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.categoryHomeReset());
      dispatch(
        Actions.categoryHomeProcess(contextDispatch, {
          loading: true,
          limit: 0,
          skip: 0,
        }),
      );
    },
    level: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.categoryLevelReset());
      dispatch(
        Actions.categoryLevelProcess(contextDispatch, {
          loading: true,
          limit: 0,
          skip: 0,
        }),
      );
    },
  };
};
/** => set level 2 id */
const useSetLevel2 = () => {
  const [selectedLevel2Id, setSelectedLevel2Id] = React.useState<string | null>(
    null,
  );
  const [selectedSecondLevelIndex, setSelectedSecondLevelIndex] =
    React.useState<number | null>(null);

  return {
    selectedLevel2Id,
    selectedSecondLevelIndex,
    setSelectLevel2Id: (id: string) => {
      if (selectedLevel2Id === id) {
        setSelectedLevel2Id(null);
      } else {
        setSelectedLevel2Id(id);
      }
    },
    setSecondLevelIndex: (index: number) => {
      if (index === selectedSecondLevelIndex) {
        setSelectedSecondLevelIndex(null);
      } else {
        setSelectedSecondLevelIndex(index);
      }
    },
  };
};
/** === EXPORT === */
export { useCategoryAction, useSetLevel2 };
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
