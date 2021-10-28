/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import { SnbContainer, SnbText, SnbTopNav } from 'react-native-sinbad-ui';
import moment from 'moment';
import { goBack, useNotificationAction } from '../functions';
import { contexts } from '@contexts';
import * as models from '@models';
import NotificationEmptyView from './notification-empty.view';
import LoadingPage from '@core/components/LoadingPage';
import NotificationStyle from '../styles/notification.style';

const dataIcon = {
  order: {
    image: require('../../../assets/icons/notifications/order.png'),
    title: 'Order',
  },
  partial_order: {
    image: require('../../../assets/icons/notifications/order.png'),
    title: 'Order',
  },
  promo: {
    image: require('../../../assets/icons/notifications/promo.png'),
    title: 'Promo',
  },
  voucher: {
    image: require('../../../assets/icons/notifications/voucher.png'),
    title: 'Voucher',
  },
  payment: {
    image: require('../../../assets/icons/notifications/pembayaran.png'),
    title: 'Pembayaran',
  },
  verification: {
    image: require('../../../assets/icons/notifications/verifikasi.png'),
    title: 'Status Verifikasi',
  },
  special_offer: {
    image: require('../../../assets/icons/notifications/penawaranspesial.png'),
    title: 'Penawaran Spesial',
  },
  registration: {
    image: require('../../../assets/icons/notifications/verifikasi.png'),
    title: 'Supplier Store Registration',
  },
  'Sinbad Quest': {
    image: require('../../../assets/icons/notifications/quest.png'),
    title: 'Sinbad Quest',
  },
  'Catatan Utang': {
    image: require('../../../assets/icons/notifications/catatan_utang.png'),
    title: 'Catatan Utang',
  },
  'Rekening Bank': {
    image: require('../../../assets/icons/notifications/verifikasi.png'),
    title: 'Rekening Bank',
  },
  'Pengembalian Dana': {
    image: require('../../../assets/icons/notifications/pembayaran.png'),
    title: 'Pengembalian Dana',
  },
  'Pengembalian Dana Berhasil': {
    image: require('../../../assets/icons/notifications/pembayaran.png'),
    title: 'Pengembalian Dana Berhasil',
  },
};

const SINBAD_REJECT_MESSAGE =
  'Sinbad gagal melakukan verifikasi toko Anda. Yuk, periksa kembali halaman profile dan lengkapi data Anda.';

/** === COMPONENT === */
const NotificationView: React.FC = () => {
  /** === HOOK === */
  const { stateNotification, dispatchNotification } = React.useContext(
    contexts.NotificationContext,
  );
  const notificationAction = useNotificationAction();
  const notificationListState = stateNotification.list;
  /** => effect */
  React.useEffect(() => {
    notificationAction.list(dispatchNotification);
  }, []);

  const onHandleLoadMore = () => {
    if (stateNotification.list.data) {
      if (stateNotification.list.data.length < stateNotification.list.total) {
        notificationAction.loadMore(
          dispatchNotification,
          stateNotification.list,
        );
      }
    }
  };

  const onHandleRefresh = () => {
    notificationAction.reset(dispatchNotification);
    notificationAction.list(dispatchNotification);
  };
  /** => set approval status title */
  const setApprovalStatusTitle = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Toko Berhasil Diverifikasi';
      case 'pending':
      case 'updating':
      case 'guest': {
        return 'Toko Dalam Proses Verifikasi';
      }
      default:
        return 'Toko Gagal Diverifikasi';
    }
  };
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Pemberitahuan'}
        backAction={() => goBack()}
      />
    );
  };
  /** => render empty */
  const renderEmpty = () => {
    return (
      <NotificationEmptyView
        title={'Pemberitahuan Kosong'}
        description={'Tunggu info terbaru Sinbad Yah !'}
      />
    );
  };
  /** => render item */
  const renderItem = ({
    item,
    index,
  }: {
    item: models.NotificationListSuccessProps;
    index: number;
  }) => {
    let title = dataIcon[item.type]?.title;
    let message = item.description;
    switch (item?.type) {
      case 'registration': {
        title = 'Hai user_sinbad!';
        break;
      }
      case 'verification': {
        title = setApprovalStatusTitle(item?.data?.approvalStatus);
        message = item.data ? item.description : SINBAD_REJECT_MESSAGE;
        break;
      }
      default:
        break;
    }

    return (
      <TouchableWithoutFeedback>
        <View style={NotificationStyle.boxNotification} key={index}>
          <View>
            <Image
              source={dataIcon[item.type]?.image}
              style={NotificationStyle.image44Contain}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 16 }}>
            <View style={NotificationStyle.boxNotificationItemHeader}>
              <SnbText.H4>{title}</SnbText.H4>
              <SnbText.C1>
                {item?.createdAt
                  ? moment(new Date(item.createdAt)).format('DD-MM-YYYY HH:mm')
                  : '-'}
              </SnbText.C1>
            </View>
            <View style={{ flex: 1 }}>
              <SnbText.B3>{message}</SnbText.B3>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  /** => render separator */
  const renderSeparator = () => {
    return <View style={[NotificationStyle.lines, { marginLeft: 16 }]} />;
  };
  /** => render content */
  const renderNotificationList = () => {
    return (
      <View>
        <FlatList
          contentContainerStyle={NotificationStyle.boxFlatlist}
          data={notificationListState.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshing={notificationListState.refresh}
          onRefresh={onHandleRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={onHandleLoadMore}
          ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator
        />
      </View>
    );
  };
  /** => render content */
  const content = () => {
    return (
      <View style={{ flex: 1 }}>
        {!notificationListState.loading &&
        notificationListState.data.length !== 0 ? (
          <View>{renderNotificationList()}</View>
        ) : (
          renderEmpty()
        )}
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {notificationListState.loading ? <LoadingPage /> : content()}
    </SnbContainer>
  );
};

export default NotificationView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: bagaspp (team)
 * createDate: 22102021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
