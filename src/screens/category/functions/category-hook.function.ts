/** === IMPORT PACKAGES === */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
/** === FUNCTIONS === */
/** === Fetch Category Related === */
const useCategoryAction = () => {
  const dispatch = useDispatch();

  return {
    fetchHome: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.categoryHomeReset());
      dispatch(
        Actions.categoryHomeProcess(contextDispatch, {
          loading: true,
          limit: 0,
          skip: 0,
        }),
      );
    },
    fetchList: (contextDispatch: (action: any) => any) => {
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

/** === Category State Related === */
const useSelected2ndLevelCategory = () => {
  const [selected2ndLevelId, setSelected2ndLevelId] = useState<string | null>(
    null,
  );
  const [selected2ndLevelIndex, setSelected2ndLevelIndex] = useState<
    number | null
  >(null);

  const handle2ndLevelIdChange = (id: string) => {
    if (selected2ndLevelId === id) {
      setSelected2ndLevelId(null);
    } else {
      setSelected2ndLevelId(id);
    }
  };

  const handle2ndLevelIndexChange = (index: number) => {
    if (index === selected2ndLevelIndex) {
      setSelected2ndLevelIndex(null);
    } else {
      setSelected2ndLevelIndex(index);
    }
  };

  return {
    selected2ndLevelId,
    selected2ndLevelIndex,
    handle2ndLevelIdChange,
    handle2ndLevelIndexChange,
  };
};

export { useCategoryAction, useSelected2ndLevelCategory };
