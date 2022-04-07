/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbDialog } from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
/** === INTERFACE ===  */
interface ModalRemoveProductProps {
  okAction: () => void;
  cancelAction: () => void;
  isOpen: boolean;
}
/** === COMPONENT ===  */
export const ModalRemoveProduct: FC<ModalRemoveProductProps> = ({
  okAction,
  cancelAction,
  isOpen,
}) => {
  const { stateCart } = React.useContext(contexts.CartContext);
  return (
    <SnbDialog
      open={isOpen}
      title="Konfirmasi"
      content="Apakah Anda yakin untuk menghapus barang"
      okText="Tidak"
      cancelText="Ya"
      ok={() => cancelAction()}
      cancel={() => okAction()}
      loading={stateCart.remove.loading}
    />
  );
};
