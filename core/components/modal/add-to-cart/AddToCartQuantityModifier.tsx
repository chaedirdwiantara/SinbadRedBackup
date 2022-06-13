/** === IMPORT PACKAGES ===  */
import React, {
  FC,
  Dispatch,
  SetStateAction,
  memo,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
/** === IMPORT COMPONENT ===  */
import { View } from 'react-native';
import { SnbText2, colorV2, SnbNumberCounter2 } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTION ===  */
import debounce from 'lodash/debounce';
/** === IMPORT STYLE ===  */
import { AddToCartModalStyle } from '@core/styles';
/** === TYPE ===  */
import { IStockValidaitonSuccess, ProductDetail } from '@model/product';
interface AddToCartQuantityModifierProps {
  loading: boolean;
  disabled: boolean;
  isStockEmpty: boolean;
  orderQty: number;
  onChangeQty: (val: number) => void;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
  isFocus: boolean;
  product: ProductDetail | null;
  dataStock: IStockValidaitonSuccess | null;
}
// VAR
const { textColor } = colorV2;
/** === COMPONENT ===  */
const AddToCartCounter: FC<AddToCartQuantityModifierProps> = ({
  loading,
  disabled,
  isStockEmpty,
  orderQty,
  onChangeQty,
  setIsFocus,
  isFocus,
  product,
  dataStock,
}) => {
  // STATE
  const [counter, setCounter] = useState(0);
  /** === HOOKS ===  */
  // FUNCTION
  const onChangeQtyDebounce = useCallback(
    debounce((qty) => {
      onChangeQty(qty);
    }, 500),
    [onChangeQty],
  );

  const onPlusPres = useCallback(() => {
    const multipleQty = product?.multipleQty || 1;
    // onChangeQty(orderQty + multipleQty);
    setCounter(counter + multipleQty);
    // onChangeQtyDebounce(counter);
  }, [counter, product?.multipleQty]);

  const onMinusPres = useCallback(() => {
    const multipleQty = product?.multipleQty || 1;
    // onChangeQty(orderQty - multipleQty);
    setCounter(counter - multipleQty);
    // onChangeQtyDebounce(counter);
  }, [counter, product?.multipleQty]);

  const handleBlur = useCallback(() => {
    const minQty = product?.minQty || 1;
    const stock = dataStock?.stock || 0;
    const multipleQty = product?.multipleQty || 1;
    const valueAfterMinimum = counter - minQty;
    let qty =
      Math.floor(valueAfterMinimum / multipleQty) * multipleQty + minQty;
    if (counter < minQty) {
      setCounter(minQty);
    } else if (counter > stock) {
      const maxQtyAfterMinimum = stock - minQty;
      qty = Math.floor(maxQtyAfterMinimum / multipleQty) * multipleQty + minQty;
      setCounter(qty);
    } else {
      setCounter(qty);
    }
    setIsFocus(false);
  }, [counter, product?.minQty, dataStock?.stock, product?.multipleQty]);

  const handleChange = useCallback(
    (qty: number) => {
      if (Number.isInteger(qty)) {
        const qtyString = qty.toString();
        if (qtyString.length <= 6) {
          setCounter(qty);
        }
      }
    },
    [onChangeQty],
  );
  // VARIABLE
  const minusDisabled = useMemo(
    () =>
      counter <= (product?.minQty || 0) ||
      counter - (product?.multipleQty || 1) < (product?.minQty || 1) ||
      isFocus,
    [counter, product?.minQty, product?.multipleQty, isFocus],
  );

  const plusDisabled = useMemo(
    () =>
      counter >= (dataStock?.stock || 0) ||
      counter + (product?.multipleQty || 1) > (dataStock?.stock || 0) ||
      isFocus,
    [counter, dataStock?.stock, product?.multipleQty, isFocus],
  );

  const leftStockLabel = useMemo(() => {
    if (isStockEmpty) return 'Stock Habis';
    // menampilkan jumlah stock tersisa
    return `Tersisa ${dataStock?.stock}`;
  }, [dataStock?.stock, isStockEmpty]);
  // EFFECT
  useEffect(() => {
    onChangeQtyDebounce(counter);
  }, [counter]);
  // reset counter if loading
  useEffect(() => {
    if (!loading && product?.minQty) {
      setCounter(product?.minQty || 0);
    }
  }, [product?.minQty, loading]);
  /** => Main */
  return (
    <View style={AddToCartModalStyle.quantityModifierContainer}>
      {dataStock && product && (
        <React.Fragment>
          {(dataStock.stock < 11 || orderQty > dataStock.stock) && (
            <SnbText2.Body.Default color={textColor.selected}>
              {leftStockLabel}
            </SnbText2.Body.Default>
          )}
          <SnbNumberCounter2
            disabled={disabled}
            value={counter}
            onChange={handleChange}
            onIncrease={onPlusPres}
            onDecrease={onMinusPres}
            onFocus={() => setIsFocus(true)}
            onBlur={handleBlur}
            minusDisabled={minusDisabled}
            plusDisabled={plusDisabled}
          />
        </React.Fragment>
      )}
    </View>
  );
};

export const AddToCartQuantityModifier = memo(AddToCartCounter);
