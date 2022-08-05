import React, { FC, useEffect } from 'react';
import { colorV2, SnbTextField2 } from '@sinbad/react-native-sinbad-ui';
import { View } from 'react-native';
import {
  useSearchKeyword,
  useVoucherCartListAction,
} from '@screen/voucher/functions';
import { contexts } from '@contexts';

interface VoucherCartSearchProps {
  totalOrder: number;
  loading: boolean;
}

export const VoucherCartSearch: FC<VoucherCartSearchProps> = ({
  totalOrder,
  loading,
}) => {
  /** === HOOK === */
  /** => contexts */
  const { dispatchVoucher } = React.useContext(contexts.VoucherContext);
  /** => redux */
  const getVouchersAction = useVoucherCartListAction();
  /** => custom hooks */
  const { changeKeyword, keyword, debouncedValue } = useSearchKeyword();
  /** => effects */
  useEffect(() => {
    if (
      (debouncedValue.length >= 3 || debouncedValue.length === 0) &&
      !loading
    ) {
      getVouchersAction.list(dispatchVoucher, {
        totalOrder,
        ...(debouncedValue && { uniqueCode: debouncedValue }),
      });
    }
  }, [debouncedValue, loading]);

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
