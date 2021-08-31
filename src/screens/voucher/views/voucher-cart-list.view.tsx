import React, { FC } from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
import { VoucherFunc } from '../functions';

const VoucherCartListView: FC = () => {
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        type="red"
        title="Pakai Voucher"
        backAction={() => VoucherFunc.goBack()}
      />
    </SnbContainer>
  );
};

export default VoucherCartListView;
