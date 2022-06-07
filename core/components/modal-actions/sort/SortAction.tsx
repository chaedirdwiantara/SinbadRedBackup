/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  SnbButton2,
  Option,
  SnbRadioGroup,
  spacingV2,
} from 'react-native-sinbad-ui';
/** === IMPORT FUNCTION */
import { useSortIndex } from '@core/functions/product';
/** === IMPORT TYPE */
import { BottomActionPressHandlerType } from '@core/components/product/list/BottomAction';
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
    show,
  }: {
    type: BottomActionPressHandlerType;
    value: number | null;
    show: boolean;
  }) => void;
}
// var
const { spacing } = spacingV2;
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
    <View>
      <SnbRadioGroup
        value={activeIndex}
        onChange={(index) => setActiveSortIndex(index)}>
        {options.map((option, optionIndex) => (
          <TouchableOpacity
            onPress={() =>
              setActiveSortIndex(
                activeIndex === optionIndex ? null : optionIndex,
              )
            }
            key={option.name}
            style={{ marginTop: spacing.lg }}>
            <Option.Radio
              value={optionIndex}
              label={option.name}
              withDivider={options.length - 1 !== optionIndex}
            />
          </TouchableOpacity>
        ))}
      </SnbRadioGroup>
      <View
        style={{
          marginTop: spacing.xl,
        }}>
        <SnbButton2.Primary
          size="medium"
          title="Terapkan"
          full
          onPress={() =>
            onButtonPress({
              type: 'applySort',
              value: activeIndex,
              show: false,
            })
          }
          disabled={activeIndex === appliedOptionIndex}
        />
      </View>
    </View>
  );
};

export default SortAction;
