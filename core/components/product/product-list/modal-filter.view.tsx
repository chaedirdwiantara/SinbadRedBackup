import React, { FC, memo, useCallback, useMemo } from 'react';
import Action from '@core/components/modal-actions';
import ActionSheet from '../ActionSheet';
import { useProductListContext } from './';

type Props = {
  onFetch: (params: { minPrice: number; maxPrice: number }) => void;
};

const Main: FC<Props> = ({ onFetch }) => {
  const { state, trigerModal, setQuery } = useProductListContext();
  const visibleModal = useMemo(() => state.modal.filter, [state.modal.filter]);
  const minPrice = useMemo(
    () => state.query.minPrice ?? 0,
    [state.query.minPrice],
  );
  const maxPrice = useMemo(
    () => state.query.maxPrice ?? 0,
    [state.query.maxPrice],
  );

  const onClearFilter = useCallback(() => {
    setQuery({ maxPrice: 0, minPrice: 0 });
  }, []);

  const onButtonPress = useCallback(
    (params: { value: { minPrice: number; maxPrice: number } }) => {
      const { value } = params;
      const payload = { ...state.query, ...value };
      setQuery(value);
      onFetch(payload);
      trigerModal('filter', false);
    },
    [state.query],
  );

  const onSetMinPrice = useCallback((val: number) => {
    setQuery({ minPrice: val });
  }, []);

  const onSetMaxPrice = useCallback((val: number) => {
    setQuery({ maxPrice: val });
  }, []);

  const onHandleSliderChange = useCallback((val: number[]) => {
    // deprecated
  }, []);
  return (
    <ActionSheet
      withClear
      onClearFilter={onClearFilter}
      open={visibleModal}
      name="filter-modal"
      title="Filter"
      contentHeight={220}
      onBlur={() => trigerModal('filter', false)}
      onClose={() => trigerModal('filter', false)}>
      <Action.Filter
        onButtonPress={onButtonPress}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={onSetMinPrice}
        setMaxPrice={onSetMaxPrice}
        handleSliderChange={onHandleSliderChange}
      />
    </ActionSheet>
  );
};

Main.defaultProps = {
  onFetch: () => {},
};

export const ModalFilterView = memo(Main);
