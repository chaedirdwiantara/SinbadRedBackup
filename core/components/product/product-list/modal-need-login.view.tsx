import NeedLoginModal from '@core/components/modal/need-login/NeedLoginModal';
import React, { memo, useMemo } from 'react';
import { useProductListContext } from './';

const App = () => {
  const { state, trigerModal } = useProductListContext();
  const visibleModalLogin = useMemo(
    () => state.modal.needLogin,
    [state.modal.needLogin],
  );

  return (
    <NeedLoginModal
      onClose={() => trigerModal('needLogin', false)}
      visible={visibleModalLogin}
    />
  );
};

export const ModalNeedLoginView = memo(App);
