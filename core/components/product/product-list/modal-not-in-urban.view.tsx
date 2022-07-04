import React, { memo, useRef, useEffect, useMemo } from 'react';
import NotInUrbanModal, { NotInUrbanModalRef } from '../list/NotInUrbanModal';
import { useProductListFunction } from './function/product-list.function';

const Main = () => {
  // hooks
  const { productError } = useProductListFunction();

  // var
  const modalUrbanRef = useRef<NotInUrbanModalRef>(null);
  const message = useMemo(() => productError?.message, [productError?.message]);
  const errorCode = useMemo(() => productError?.code, [productError?.code]);

  /** => if product error code 500700000029 "Sinbad belum beroperasi di lokasi toko Anda" */
  useEffect(() => {
    if (errorCode === 500700000029) {
      modalUrbanRef.current?.trigger(true);
    }
  }, [errorCode, modalUrbanRef]);
  // render
  return <NotInUrbanModal ref={modalUrbanRef} errorSubtitle={message ?? ''} />;
};

export const ModalNotInUrbanView = memo(Main);
