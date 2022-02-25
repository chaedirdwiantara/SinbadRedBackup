/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { ScrollView, RefreshControl, View, Dimensions } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbButton,
  color,
} from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import HomeHeaderView from './home-header.view';
import { BannerHomeView } from '../../banner/views';
import { BrandHomeView } from '../../brand/views';
import { RecommendationHomeView } from '../../recommendation/views';
import { CategoryHomeView } from '../../category/views';
/** === IMPORT FUNCTION HERE === */
import { useHeaderChange, useRefresh } from '../functions';
import { useGetTokenNotLogin } from '@core/functions/firebase/get-fcm.function';
import { setFlagByDeviceId } from '@core/functions/firebase/flag-rtdb.function';
import { useCartTotalProductActions } from '@screen/oms/functions';
import { useDataTotalProductCart, useDataAuth } from '@core/redux/Data';
import { useCheckoutMaster } from '@screen/oms/functions';
import { useNotificationTotalActions } from '@screen/notification/functions';
import BottomSheetError from '@core/components/BottomSheetError';
import PushNotification from '@core/components/PushNotification';
import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
import HomeStyles from '../styles/home.style';
const CopilotView = walkthroughable(View);
/** === COMPONENT === */
const HomeView: React.FC = ({ navigation, start }: any) => {
  /** === STATE === */
  const [modalError, setModalError] = React.useState(false);
  /** === HOOK === */
  const { stateHeaderChange, actionHeaderChange } = useHeaderChange();
  const { stateRefresh, actionRefresh } = useRefresh();
  const { data } = useDataTotalProductCart();
  const { setCartId } = useCheckoutMaster();
  const cartTotalProductActions = useCartTotalProductActions();
  const notificationTotalActions = useNotificationTotalActions();
  const { me } = useDataAuth();
  useGetTokenNotLogin();
  setFlagByDeviceId();
  /** === FUNCTION FOR HOOK === */
  const changeHeader = (height: number) => {
    height > 100 ? actionHeaderChange(true) : actionHeaderChange(false);
  };

  React.useEffect(() => {
    start();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (me.data !== null) {
        cartTotalProductActions.fetch();
        notificationTotalActions.fetch();
      }
    });

    return unsubscribe;
  }, [navigation, me.data]);

  React.useEffect(() => {
    if (me.data !== null) {
      cartTotalProductActions.fetch();
      notificationTotalActions.fetch();
    }
  }, [me.data]);

  /** => listen changes data cart id */
  React.useEffect(() => {
    if (data && data.cartId) {
      setCartId({ cartId: data.cartId });
    }
  }, [data.cartId]);

  React.useEffect(() => {
    if (me.error !== null && me.error.code === undefined) {
      setModalError(true);
    }
  }, [me.error]);
  /** => header */
  const header = () => {
    return (
      <View style={HomeStyles.topNavContainer}>
        <CopilotStep text="" order={1} name="searchbar">
          <CopilotView>
            <HomeHeaderView headerChange={stateHeaderChange} />
          </CopilotView>
        </CopilotStep>
      </View>
    );
  };
  /** => content item */
  const contentItem = () => {
    return (
      <>
        <PushNotification />
        <CopilotStep text="" order={2} name="banner">
          <CopilotView>
            <BannerHomeView />
          </CopilotView>
        </CopilotStep>
        <CopilotStep text="" order={3} name="category">
          <CopilotView>
            <RecommendationHomeView navigationParent={navigation} />
          </CopilotView>
        </CopilotStep>
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
    </SnbContainer>
  );
};

const { width } = Dimensions.get('screen');

type ICopilotProps = {
  isFirstStep: boolean;
  isLastStep: boolean;
  handleNext: () => void;
  handlePrev: () => void;
  handleStop: () => void;
  currentStep: any;
};

const copilotOptions: any = (totalCoachMark: number) => {
  const Tooltip: React.FC<ICopilotProps> = ({
    handleNext,
    currentStep,
    isLastStep,
    handleStop,
    handlePrev,
    isFirstStep,
  }) => {
    return (
      <View style={{ flex: 1, borderRadius: 16, paddingBottom: 16 }}>
        <SnbText.H4>Temukan produk yang Anda inginkan</SnbText.H4>
        <View style={{ marginVertical: 4 }} />
        <SnbText.B1>
          Beragam produk berkualitas bisa Anda cari dengan mudah.
        </SnbText.B1>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {Array.from(Array(totalCoachMark).keys()).map((_, idx) => {
              return (
                <View
                  key={idx}
                  style={{
                    height: 8,
                    width: 8,
                    backgroundColor:
                      currentStep?.order - 1 === idx
                        ? color.red70
                        : color.black40,
                    marginRight: 4,
                    borderRadius: 8,
                  }}
                />
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {!isFirstStep && !isLastStep && (
              <>
                <SnbButton.Dynamic
                  size="small"
                  buttonColor={color.blue60}
                  type="tertiary"
                  title="Kembali"
                  onPress={handlePrev}
                />
                <View style={{ marginHorizontal: 2 }} />
              </>
            )}
            <SnbButton.Dynamic
              size="small"
              type="primary"
              title={isLastStep ? 'Selesai' : 'Lanjut'}
              onPress={() => {
                if (isLastStep) {
                  handleStop();
                } else {
                  handleNext();
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return {
    animated: true,
    overlay: 'view',
    tooltipComponent: Tooltip,
    tooltipStyle: {
      borderRadius: 12,
      width: width - 16,
    },
    stepNumberComponent: () => <View />,
  };
};

export default copilot(copilotOptions(3))(HomeView);

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
