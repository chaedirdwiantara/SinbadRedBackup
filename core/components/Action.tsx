/** === IMPORT PACKAGE === */
import React, { FC, useState, useEffect} from 'react';
import { 
  View, 
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Keyboard
} from 'react-native';
import { SnbIcon, color, SnbText } from 'react-native-sinbad-ui';
import { toCurrency } from '../functions/global/currency-format'

/** === IMPORT THIRD PARTY PACKAGE */
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { TextInputMask } from 'react-native-masked-text';

/** === TYPE === */
interface ActionSortMenuType1Props {
  sortData: any;
  sortDataIndex: number;
  parentFunction: (any: any) => void;
}

interface ActionFilterMenuType1Props {
  priceGteMasking: string | number;
  priceLteMasking: string | number;
  priceGte: number;
  priceLte: number;
  parentFunction: (any: any) => void;
}

/** KEYBOAD LISTENER */
let keyboardDidShowListener: any;
let keyboardDidHideListener: any;

const { height, width } = Dimensions.get('window');

const SortMenuType1: FC<ActionSortMenuType1Props> = (props) => {
  const [data, setData] = useState<any[]>([]);
  const [sortData, setSortData] = useState(null);
  const [sortDataIndex, setSortDataIndex] = useState<number | null>(null)

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === SEND DATA TO PARENT === */
  const toParentFunction = () => {
    props.parentFunction({
      type: 'sortSelected',
      data: {
        sortDataIndex: sortDataIndex,
        data: sortDataIndex !== null ? sortData : null
      }
    });
  }
  /** === CHECK SELECTED SORT ITEM === */
  const checkSort = (item: any, index: number) => {
    if (index === sortDataIndex) {
      setSortDataIndex(null)
    } else {
      setSortDataIndex(index);
      setSortData(item);
    }
  }

  /**
   * ==========================
   * RENDER VIEW
   * ==========================
   */
  /** === RENDER CONTENT === */
  const renderContent = () => {
    return data.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => checkSort(item, index)}
        >
          <View style={styles.boxContentItemSortType1}>
            <View style={{ flex: 1 }}>
              <SnbText.C1>{item.name}</SnbText.C1>
            </View>
            <View style={styles.boxIconRight}>
              {sortDataIndex === index ? (
                <SnbIcon
                  name="radio-button-checked"
                  color={color.red50}
                  size={24}
                />
              ) : (
                <SnbIcon
                  name="radio-button-unchecked"
                  color={color.black40}
                  size={24}
                />
              )}
            </View>
          </View>
          <View style={[styles.lines, { marginLeft: 16 }]} />
        </TouchableOpacity>
      );
    });
  }

  /** === RENDER BUTTON === */
  const renderButton = () => {
    
    return (
      <TouchableOpacity onPress={toParentFunction} disabled={sortDataIndex === props.sortDataIndex}>
        <SnbText.C1>Terapkan</SnbText.C1>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {renderContent()}
      {renderButton()}
    </View>
  )
}

const FilterMenuType1: FC<ActionFilterMenuType1Props> = (props) => {
  /** === STATE === */
  const [priceGteMasking, setPriceGteMasking] = useState<string | number>(props.priceGteMasking);
  const [priceLteMasking, setPriceLteMasking] = useState<string | number>(props.priceLteMasking);
  const [priceGte, setPriceGte] = useState<number>(props.priceGte);
  const [priceLte, setPriceLte] = useState<number>(props.priceLte);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);

  /**
   * ======================
   * FUNCTIONAL
   * ======================
   */
  /** USE EFFECT */
  useEffect(() => {
    keyboardListener()
    return keyboardRemove()
  },[])

  /** === SEND DATA TO PARENT === */
  const toParentFunction = () => {
    Keyboard.dismiss();
    props.parentFunction({
      type: 'filterSelected',
      data: {
        priceGte: priceGte,
        priceLte: priceLte,
        priceGteMasking: priceGteMasking,
        priceLteMasking: priceLteMasking
      }
    });
  }

  /** === CLEAR STATE === */
  const clearState = () => {
    setPriceGteMasking("");
    setPriceLteMasking("");
    setPriceGte(0);
    setPriceLte(0);
  }

  /**
   * ========================
   * FOR KEYBOARD
   * ========================
   */

  /** KEYBOARD LISTENER */
  const keyboardListener = () => {
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );
  }
  /** KEYBOARD SHOW */
  const keyboardDidShow = () => {
    setShowKeyboard(true);
  };
  /** KEYBOARD HIDE */
  const keyboardDidHide = () => {
    setShowKeyboard(false);
  };
  /** KEYBOARD REMOVE */
  const keyboardRemove = () => {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  }
  /** === MULTISLIDER === */
  const multiSliderValuesChange = (values: number[]) => {
    setPriceGte(values[0]);
    setPriceLte(values[1]);
  };

  const multiFinish = (values: number[]) => {
    setPriceGte(values[0]);
    setPriceLte(values[1]);
  };


  /**
   * ==========================
   * RENDER VIEW
   * ==========================
   */
  /** === RENDER RESET === */
  const renderReset = () => {
    return (
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => clearState()}>
          <SnbText.C1>Reset</SnbText.C1>
        </TouchableOpacity>
      </View>
    );
  }

  /** === RENDER FILTER PRICE === */
  const renderFilterPrice = () => {
    return (
      <View>
        <View>
          <SnbText.C1>Harga</SnbText.C1>
        </View>
        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
            <SnbText.C1>Harga</SnbText.C1>
            </View>
            <View style={{ flex: 1 }}>
              <TextInputMask
                type={'money'}
                value={priceGte.toString()}
                options={{
                  precision: 0,
                  separator: ',',
                  delimiter: '.',
                  unit: '',
                  suffixUnit: ''
                }}
                placeholder=""
                keyboardType="number-pad"
                autoFocus={false}
                includeRawValueInChangeText
                onChangeText={(formatted: any, extracted: any) => {
                  setPriceGteMasking(formatted === '' ? 0 : formatted);
                  setPriceGte(isNaN(extracted) ? 0 : extracted)
                }}
                onEndEditing={() => {
                  setPriceLteMasking(
                    priceLte < priceGte
                    ? priceGte + 1
                    : priceLteMasking
                  );
                  setPriceLte(
                    priceLte < priceGte
                    ? priceGte + 1
                    : priceLte
                  )
                }}
                style={[
                  styles.text,
                  styles.boxInput,
                  styles.shadowForBox
                ]}
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
              <TextInputMask
                type={'money'}
                value={priceLte.toString()}
                options={{
                  precision: 0,
                  separator: ',',
                  delimiter: '.',
                  unit: '',
                  suffixUnit: ''
                }}
                placeholder=""
                keyboardType="number-pad"
                autoFocus={false}
                includeRawValueInChangeText
                onChangeText={(formatted: any, extracted: any) => {
                  setPriceLteMasking(formatted === '' ? 0 : formatted);
                  setPriceLte(isNaN(extracted) ? 0 : extracted);
                }}
                onEndEditing={() => {
                  setPriceGteMasking(
                    priceGte > priceLte
                    ? 0
                    : priceGteMasking,
                  );
                  setPriceGte(
                    priceGte > priceLte
                    ? 0
                    : priceGte
                  )
                }}
                style={[
                  styles.text,
                  styles.boxInput,
                  styles.shadowForBox
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  /** === RENDER FILTER SLIDER === */
  const renderFilterSliderPrice = () => {
    const widthTemp = 0.85 * width;
    return (
      <View style={{ alignItems: 'center' }}>
        <MultiSlider
          trackStyle={{
            width: '100%'
          }}
          selectedStyle={{
            backgroundColor: color.red50
          }}
          unselectedStyle={{
            backgroundColor: color.black10
          }}
          markerStyle={{
            backgroundColor: color.red50
          }}
          min={0}
          max={5000000}
          values={[priceGte, priceLte]}
          sliderLength={widthTemp}
          onValuesChangeFinish={multiFinish}
          onValuesChange={multiSliderValuesChange}
          enabledOne
          enabledTwo
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: -10
          }}
        >
          <SnbText.C1>{toCurrency(priceGte)}</SnbText.C1>
          <SnbText.C1>{toCurrency(priceLte)}</SnbText.C1>
        </View>
      </View>
    );
  }

  /** === RENDER CONTENT === */
  const renderContent = () => {
    return (
      <ScrollView style={styles.boxContentItemFilterType1}>
        {renderReset()}
        {renderFilterPrice()}
        {renderFilterSliderPrice()}
      </ScrollView>
    );
  }

  /** === RENDER BUTTON === */
  const renderButton = () => {
    return (
      <TouchableOpacity onPress={toParentFunction}>
        <SnbText.C1>Terapkan</SnbText.C1>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.mainContainer,
        { maxHeight: showKeyboard ? 0.4 * height : 0.8 * height }
      ]}
    >
      {/* <StatusBarRedOP50 /> */}
      {renderContent()}
      {renderButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  lines: {
    borderTopWidth: 1,
    borderColor: color.black10
  },
  mainContainer: {
    flex: 1,
    backgroundColor: color.white
  },
  boxContentItemSortType1: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  boxContentItemFilterType1: {
    paddingHorizontal: 20,
    paddingBottom: 16
  },
  boxIconRight: {
    position: 'absolute',
    right: 20
  },
  boxInput: {
    borderWidth: 1,
    paddingHorizontal: 8,
    height: 37,
    paddingBottom: 8,
    width: '100%'
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    color: color.black40
  },
  shadowForBox: {
    borderWidth: 0,
    backgroundColor: color.white,
    shadowColor: color.black5,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },
});

export const Action = { SortMenuType1, FilterMenuType1 }

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: Maulana Ghozi
 * createdDate:
 * updatedBy: 
 * updatedDate: 
 * updatedFunction:
 *
 */