/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbButton } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT */
import { SortActionOption } from './SortActionOption';
/** === IMPORT FUNCTION */
import { useSortIndex } from '@core/functions/product';
/** === IMPORT TYPE */
import { BottomActionPressHandlerType } from '@core/components/product/list/BottomAction';
/** === IMPORT STYLE */
import { ModalActionStyle } from '@core/styles';
/** === TYPES */
export interface SortOption {
  name: string;
  sortBy: string;
  sort: string;
}

interface SortActionProps {
  options: Array<SortOption>;
  appliedOptionIndex: number | null;
  onButtonPress: ({
    type,
    value,
  }: {
    type: BottomActionPressHandlerType;
    value: number | null;
  }) => void;
}
/** === COMPONENT */
const SortAction: FC<SortActionProps> = ({
  options,
  appliedOptionIndex,
  onButtonPress,
}) => {
  /** === HOOK === */
  const { activeIndex, setActiveSortIndex } = useSortIndex(appliedOptionIndex);
  /** === VIEW === */
  return (
    <View style={ModalActionStyle.mainContainer}>
      {options.map((option, optionIndex) => (
        <SortActionOption
          key={option.name}
          option={option}
          optionIndex={optionIndex}
          activeIndex={activeIndex}
          setActiveIndex={setActiveSortIndex}
        />
      ))}
      <View style={{ marginTop: 32, height: 72 }}>
        <SnbButton.Single
          type="primary"
          title="Simpan"
          onPress={() =>
            onButtonPress({
              type: 'applySort',
              value: activeIndex,
            })
          }
          disabled={activeIndex === appliedOptionIndex}
        />
      </View>
    </View>
  );
};

export default SortAction;
