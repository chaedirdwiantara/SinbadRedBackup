/** === IMPORT PACKAGE HERE ===  */
import React, { useState } from 'react';
import { View, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbTopNav,
  SnbBottomSheet,
  SnbButton,
} from 'react-native-sinbad-ui';
import moment from 'moment';
import { goBack, useNotificationAction } from '../functions';
import { useNotificationContext } from 'src/data/contexts/notification/useNotificationContext';
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
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { stateNotification, dispatchNotification } = React.useContext(
    contexts.NotificationContext,
  );
  const {
    stateNotification: {
      list: { data: listNotificationData, total: listNotificationTotal },
    },
  } = useNotificationContext();
  const notificationAction = useNotificationAction();
  const notificationListState = stateNotification.list;
  /** => effect */
  React.useEffect(() => {
    notificationAction.list(dispatchNotification);
  }, []);

  const onHandleLoadMore = () => {
    if (listNotificationData) {
      if (listNotificationData.length < listNotificationTotal) {
        notificationAction.loadMore(
          dispatchNotification,
          stateNotification.list,
        );
      }
    }
  };

  const onHandleRefresh = () => {
    notificationAction.refresh(dispatchNotification);
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
    let title = '-';
    let image = dataIcon.special_offer.image;
    if (item.type) {
      title = dataIcon[item.type]?.title;
      image = dataIcon[item.type]?.image;
    }
    let message = item.body;
    switch (item?.type) {
      case 'registration': {
        title = 'Hai user_sinbad!';
        break;
      }
      case 'verification': {
        title = setApprovalStatusTitle(item?.data?.approvalStatus);
        message = item.data ? item.body : SINBAD_REJECT_MESSAGE;
        break;
      }
      default:
        break;
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (item.type === 'registration' || item.type === 'verification') {
            setModalTitle(title);
            setModalMessage(message);
            setApprovalStatus(item?.data?.approvalStatus);
            setShowModal(true);
          }
        }}>
        <View style={NotificationStyle.boxNotification} key={index}>
          <View>
            <Image source={image} style={NotificationStyle.image44Contain} />
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
  /** => render modal */
  const renderModal = () => {
    return (
      <SnbBottomSheet
        open={showModal}
        closeAction={() => setShowModal(false)}
        content={renderModalContent()}
        title={' '}
        actionIcon={'close'}
      />
    );
  };
  /** => render message with supplier name */
  const renderMessageWithSupplierName = () => {
    return (
      <View>
        <SnbText.B3>Akun anda telah ditambahkan oleh supplier</SnbText.B3>
        <View style={{ marginVertical: 2 }} />
        <SnbText.B3>
          <SnbText.H4>
            {notificationListState.data?.supplierName || 'Unknown Supplier'}.
          </SnbText.H4>{' '}
          Yuk nikmati pilihan produk terbarumu
        </SnbText.B3>
      </View>
    );
  };
  /** => render message */
  const renderMessage = () => (
    <SnbText.B3 align="center">{modalMessage}</SnbText.B3>
  );
  /** => render modal */
  const renderModalContent = () => {
    let image = require('../../../assets/images/sinbad_image/smile_sinbad.png');
    let title = 'Lihat Informasi Supplier';
    if (approvalStatus === 'rejected') {
      image = require('../../../assets/images/sinbad_image/cry_sinbad.png');
    }
    if (approvalStatus === undefined) {
      image = require('../../../assets/images/sinbad_image/failed_error.png');
      title = 'Lihat Profil';
    }

    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={image}
            style={{ width: 240, height: 160 }}
            resizeMode="contain"
          />
          <SnbText.H4>{modalTitle}</SnbText.H4>
          <View style={{ paddingHorizontal: 16 }}>
            {notificationListState.data?.supplierName && approvalStatus === ''
              ? renderMessageWithSupplierName()
              : renderMessage()}
          </View>
        </View>
        <View style={{ marginVertical: 16 }} />
        <View style={{ width: '100%' }}>
          <SnbButton.Single
            type="primary"
            title={title}
            disabled={false}
            onPress={() => {
              setShowModal(false);
              if (approvalStatus) {
                console.log('go to MerchantSupplierInformationView');
              } else {
                console.log('go to ProfileView');
              }
            }}
          />
        </View>
      </View>
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
        notificationListState.data.length > 0 ? (
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
      {!notificationListState.loading &&
      notificationListState.data.length !== 0 ? (
        content()
      ) : (
        <LoadingPage />
      )}
      {renderModal()}
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
