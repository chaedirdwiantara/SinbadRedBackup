/** === IMPORT PACKAGE HERE === */
import React, { useContext } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { SnbContainer } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import HomeHeaderView from './home-header.view';
import { BannerHomeView } from '../../banner/views';
import { BrandHomeView } from '../../brand/views';
import { RecommendationHomeView } from '../../recommendation/views';
import { CategoryHomeView } from '../../category/views';
/** === IMPORT FUNCTION HERE === */
import { useHeaderChange, useRefresh } from '../functions';
import { useGetTotalCartAction } from '@screen/oms/functions';
import { useDataAuth } from '@core/redux/Data';
import { useNotificationTotalActions } from '@screen/notification/functions';
import BottomSheetError from '@core/components/BottomSheetError';
import PushNotification from '@core/components/PushNotification';
import { contexts } from '@contexts';
import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
import HomeStyles from '../styles/home.style';
const CopilotView = walkthroughable(View);
import UpgradeVIPAccountBadge from '@screen/account/views/shared/upgrade-vip-account-badge.component';
import {
  copilotOptions,
  ModalStartCoachmark,
} from '@screen/account/views/shared';
import { renderIF } from '@screen/auth/functions';

/** === COMPONENT === */
const HomeView: React.FC = ({ navigation, start }: any) => {
  /** === STATE === */
  const { dispatchCart } = useContext(contexts.CartContext);
  const [modalError, setModalError] = React.useState(false);
  /** === HOOK === */
  const { stateHeaderChange, actionHeaderChange } = useHeaderChange();
  const { stateRefresh, actionRefresh } = useRefresh();
  const totalCartActions = useGetTotalCartAction();
  const notificationTotalActions = useNotificationTotalActions();
  const { me, meV2 } = useDataAuth();
  /** === FUNCTION FOR HOOK === */
  const changeHeader = (height: number) => {
    height > 100 ? actionHeaderChange(true) : actionHeaderChange(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (me.data !== null) {
        totalCartActions.fetch(dispatchCart);
        notificationTotalActions.fetch();
      }
    });

    return unsubscribe;
  }, [navigation, me.data]);

  React.useEffect(() => {
    if (me.data !== null) {
      totalCartActions.fetch(dispatchCart);
      notificationTotalActions.fetch();
    }
  }, [me.data]);

  React.useEffect(() => {
    if (me.error !== null && me.error.code === undefined) {
      setModalError(true);
    }
  }, [me.error]);
  /** => header */
  const header = () => {
    return (
      <View style={HomeStyles.topNavContainer}>
        <CopilotStep
          text="Cari dan temukan produk terbaik untuk stok toko Anda."
          order={1}
          name="Temukan Produk yang Anda inginkan">
          <CopilotView>
            <HomeHeaderView headerChange={stateHeaderChange} />
          </CopilotView>
        </CopilotStep>
      </View>
    );
  };
  /** => content item */
  const contentItem = () => {
    const isBadgeVIPAvailable =
      typeof meV2.data?.data?.isDataCompleted === 'boolean' &&
      meV2.data?.data?.isDataCompleted === false;

    return (
      <>
        <PushNotification />
        <CopilotStep
          text="Cek promo terbaik setiap hari biar belanja makin hemat."
          order={2}
          name="Promo terbaik Sinbad">
          <CopilotView>
            <BannerHomeView />
          </CopilotView>
        </CopilotStep>
        {renderIF(
          isBadgeVIPAvailable,
          <>
            <CopilotStep
              text="Dapatkan berbagai manfaat dan kemudahan dalam berbelanja."
              order={3}
              name="Jadi anggota VIP Sinbad">
              <CopilotView>
                <UpgradeVIPAccountBadge />
              </CopilotView>
            </CopilotStep>
          </>,
        )}
        <RecommendationHomeView navigationParent={navigation} />
        <CategoryHomeView />
        <BrandHomeView />
        <View style={{ paddingBottom: 100 }} />
      </>
    );
  };
  /** => content */
  const content = () => {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={stateRefresh}
            onRefresh={() => actionRefresh(true)}
          />
        }
        scrollEventThrottle={16}
        onScroll={(event) => changeHeader(event.nativeEvent.contentOffset.y)}
        showsVerticalScrollIndicator={false}>
        {contentItem()}
      </ScrollView>
    );
  };
  /** => modal error connection */
  const bottomSheetError = () => {
    return (
      <BottomSheetError
        open={modalError}
        error={me.error}
        retryAction={() => {
          actionRefresh(true);
          setModalError(false);
        }}
      />
    );
  };

  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {content()}
      {bottomSheetError()}
      <ModalStartCoachmark onStartCoachmark={start} />
    </SnbContainer>
  );
};

export default copilot(copilotOptions(4, 'homeCoachmark'))(HomeView);

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
