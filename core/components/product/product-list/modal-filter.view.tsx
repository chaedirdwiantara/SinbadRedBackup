import React, { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import Action from '@core/components/modal-actions';
import ActionSheet from '../ActionSheet';
import { useProductListContext } from './function/product-list.util';

type Props = {
  onFetch: (params: { minPrice: number; maxPrice: number }) => void;
  testID: string;
};

const Main: FC<Props> = ({ onFetch, testID }) => {
  const filterRef = useRef<{ reset: () => void }>(null);
  const [idSortFilter, setIdSortFilter] = useState<string | undefined>('');
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
    setQuery({ maxPrice: 0, minPrice: 0, sortBy: undefined, sort: undefined });
    setIdSortFilter('');
    filterRef.current?.reset();
  }, [filterRef.current?.reset]);

  const onButtonPress = useCallback(
    (params: { value: typeof state.query; idSort?: string }) => {
      const { value, idSort } = params;
      const payload = { ...state.query, ...value };
      setQuery(value);
      onFetch(payload);
      trigerModal('filter', false);
      setIdSortFilter(idSort);
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
      testID={'modal-filter.' + testID}
      withClear
      onClearFilter={onClearFilter}
      open={visibleModal}
      name="filter-modal"
      title="Filter"
      contentHeight={340}
      onBlur={() => trigerModal('filter', false)}
      onClose={() => trigerModal('filter', false)}>
      <Action.Filter
        ref={filterRef}
        testID={'modal-filter.' + testID}
        idSortFilter={idSortFilter}
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

const ModalFilterView = memo(Main);

export default ModalFilterView;
