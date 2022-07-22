import React, { useEffect } from 'react';
import { colorV2, SnbTextField2 } from '@sinbad/react-native-sinbad-ui';
import { View } from 'react-native';
import {
  useSearchKeyword,
  useVoucherCartListAction,
} from '@screen/voucher/functions';
import { contexts } from '@contexts';

export const VoucherCartSearch = () => {
  /** === HOOK === */
  /** => contexts */
  const { dispatchVoucher } = React.useContext(contexts.VoucherContext);
  /** => redux */
  const getVouchersAction = useVoucherCartListAction();
  /** => custom hooks */
  const { changeKeyword, keyword, debouncedValue } = useSearchKeyword();
  /** => effects */
  useEffect(() => {
    getVouchersAction.list(dispatchVoucher, debouncedValue);
  }, [debouncedValue]);

  /** === VIEW === */

  /** => main */
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        maxHeight: 64,
        backgroundColor: colorV2.bgColor.light,
      }}>
      <SnbTextField2.Text
        onChangeText={changeKeyword}
        value={keyword}
        placeholder="Masukkan Kode Promo"
      />
    </View>
  );
};
