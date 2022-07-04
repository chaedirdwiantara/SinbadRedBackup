import NeedLoginModal from '@core/components/modal/need-login/NeedLoginModal';
import React, { FC, memo, useMemo } from 'react';
import { useProductListContext } from './';

type Props = {
  testID: string;
};
const App: FC<Props> = ({ testID }) => {
  const { state, trigerModal } = useProductListContext();
  const visibleModalLogin = useMemo(
    () => state.modal.needLogin,
    [state.modal.needLogin],
  );

  return (
    <NeedLoginModal
      testID={'modal-need-login.' + testID}
      onClose={() => trigerModal('needLogin', false)}
      visible={visibleModalLogin}
    />
  );
};

export const ModalNeedLoginView = memo(App);
