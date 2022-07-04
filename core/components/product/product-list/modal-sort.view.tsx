import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import ActionSheet from '../ActionSheet';
import Action from '@core/components/modal-actions';
import { useProductListContext } from './';

// TYPES
interface Props {
  onFetch: (params: { sortBy: string; sort: 'desc' | 'asc' }) => void;
}
type Options = {
  name: string;
  sortBy: string;
  sort: 'desc' | 'asc' | undefined;
};
// VAR
const options: Array<Options> = [
  {
    name: 'Harga Tinggi ke Rendah',
    sortBy: 'price',
    sort: 'desc',
  },
  {
    name: 'Harga Rendah ke Tinggi',
    sortBy: 'price',
    sort: 'asc',
  },
];

const App: FC<Props> = (props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { state, trigerModal, setQuery } = useProductListContext();

  const isModalOpen = useMemo(() => state.modal.sort, [state.modal.sort]);

  const onBlur = useCallback(() => {
    if (isModalOpen) {
      trigerModal('sort', false);
    }
  }, [isModalOpen]);

  const onButtonPress = useCallback(
    (params: { value: number | null }) => {
      const { sort, sortBy } = options[params.value ?? 0];
      trigerModal('sort', false);
      setActiveIndex(params.value);
      setQuery({ sort, sortBy });
      props.onFetch({ ...state.query, sort, sortBy });
    },
    [props.onFetch, state.query],
  );

  return (
    <ActionSheet
      open={isModalOpen}
      name="sort-modal"
      title="Urutkan"
      contentHeight={220}
      onBlur={onBlur}
      onClose={onBlur}>
      <Action.Sort
        appliedOptionIndex={activeIndex}
        options={options}
        onButtonPress={onButtonPress}
      />
    </ActionSheet>
  );
};

export const ModalSortView = memo(App);
