import { useCallback, useEffect, useMemo } from 'react';
import { useStockReminderContext } from 'src/data/contexts/product';
import { useProductContext } from 'src/data/contexts/product/useProductContext';
import { useStockReminderActions } from './product-hook.function';

type Props = {
  id: string;
  warehouseId: string;
};
export const useOutOfStockUtil = (props: Props) => {
  const { getBulkReminder, createReminder, deleteReminder } =
    useStockReminderActions({
      productId: props.id,
      warehouseId: Number(props.warehouseId),
    });
  const {
    stateProduct: {
      detail: { data: dataProduct },
    },
  } = useProductContext();

  const {
    stateStockReminder: {
      list: { data: listStockReminder },
    },
    dispatchStockReminder,
  } = useStockReminderContext();

  // get stock reminder spesific id & warehouse
  const stockReminder = useMemo(
    () =>
      listStockReminder.find(
        ({ productId, warehouseId }) =>
          `${productId}${warehouseId}` == `${props.id}${props.warehouseId}`,
      ),
    [listStockReminder, props.id, props.warehouseId],
  );
  // label infobox if stock empty
  const infoBoxReminderLabel = useMemo(
    () =>
      stockReminder?.stockRemind
        ? 'Anda akan mendapatkan pemberitahuan saat stok sudah tersedia kembali.'
        : "Dapatkan pemberitahuan saat produk tersedia kembali dengan menekan 'Ingatkan Saya'.",
    [stockReminder?.stockRemind],
  );
  // icon button if stock reminder false
  const iconReminder = useMemo(() => {
    if (!dataProduct?.isStockAvailable && !stockReminder?.stockRemind)
      return 'notification';
    return '';
  }, [dataProduct?.isStockAvailable, stockReminder?.stockRemind]);
  // label text main button
  const buttonLabelReminder = useMemo(() => {
    if (dataProduct?.isStockAvailable) return 'Tambah Ke Keranjang';
    if (stockReminder?.stockRemind) return 'Hapus Pengingat';
    return 'Ingatkan Saya';
  }, [dataProduct?.isStockAvailable, stockReminder?.stockRemind]);
  // type condition main button
  const buttonTypeReminder: 'primary' | 'secondary-outline' = useMemo(() => {
    if (dataProduct?.isStockAvailable || !stockReminder?.stockRemind)
      return 'primary';
    return 'secondary-outline';
  }, [dataProduct?.isStockAvailable, stockReminder?.stockRemind]);

  // function
  // create reminder
  const onCreateReminder = useCallback(() => {
    createReminder(dispatchStockReminder);
  }, []);
  // remove reminder
  const onRemoveReminder = useCallback(() => {
    deleteReminder(dispatchStockReminder);
  }, []);
  // side effect get bulk reminder if product detail not have stock reminder
  useEffect(() => {
    if (!stockReminder) {
      const payload = [
        { productId: props.id, warehouseId: Number(props.warehouseId) },
      ];
      getBulkReminder(dispatchStockReminder, payload);
    }
  }, [stockReminder, props.id, props.warehouseId]);

  return {
    stockReminder,
    infoBoxReminderLabel,
    iconReminder,
    buttonLabelReminder,
    buttonTypeReminder,
    onCreateReminder,
    onRemoveReminder,
  };
};
