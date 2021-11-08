/** === IMPORT PACKAGES === */
import React, { FC, Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
import { TextInputMask } from 'react-native-masked-text';
/** === IMPORT STYLE */
import { ModalActionStyle } from '@core/styles';
/** === TYPES === */
interface PriceInputProps {
  value: number;
  onTextChange: (formatted: string, extracted?: string) => void;
  onEditEnd: () => void;
}

interface PriceRangeInputProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: Dispatch<SetStateAction<number>>;
  setMaxPrice: Dispatch<SetStateAction<number>>;
}
/** === COMPONENTS === */
const PriceInput: FC<PriceInputProps> = ({
  value,
  onTextChange,
  onEditEnd,
}) => (
  <TextInputMask
    type="money"
    value={value.toString()}
    options={{
      precision: 0,
      separator: ',',
      delimiter: '.',
      unit: '',
      suffixUnit: '',
    }}
    placeholder=""
    keyboardType="number-pad"
    autoFocus={false}
    includeRawValueInChangeText={true}
    onChangeText={onTextChange}
    onEndEditing={onEditEnd}
    style={[
      ModalActionStyle.text,
      ModalActionStyle.boxInput,
      ModalActionStyle.shadowForBox,
    ]}
  />
);

const PriceRangeInput: FC<PriceRangeInputProps> = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => (
  <View>
    <View>
      <SnbText.B2>Harga</SnbText.B2>
    </View>
    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ justifyContent: 'center', marginRight: 10 }}>
          <SnbText.C1>Rp</SnbText.C1>
        </View>
        <View style={{ justifyContent: 'center', marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <PriceInput
            value={minPrice}
            onTextChange={(_, extracted: any) => {
              setMinPrice(isNaN(extracted) ? 0 : extracted);
            }}
            onEditEnd={() => {
              setMaxPrice(maxPrice < minPrice ? minPrice + 1 : maxPrice);
            }}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
        <SnbText.C1>-</SnbText.C1>
      </View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ justifyContent: 'center', marginRight: 10 }}>
          <SnbText.C1>Rp</SnbText.C1>
        </View>
        <View style={{ flex: 1, marginRight: 2 }}>
          <PriceInput
            value={maxPrice}
            onTextChange={(_, extracted: any) => {
              setMaxPrice(isNaN(extracted) ? 0 : extracted);
            }}
            onEditEnd={() => {
              setMinPrice(minPrice > maxPrice ? 0 : minPrice);
            }}
          />
        </View>
      </View>
    </View>
  </View>
);

export default PriceRangeInput;
