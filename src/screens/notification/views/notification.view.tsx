/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import { SnbContainer, SnbText, SnbTopNav } from 'react-native-sinbad-ui';
import moment from 'moment';
import { goBack } from '../functions';
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

const dataMock = [
  {
    id: '45717',
    userId: '3',
    type: 'order',
    description: 'Status order anda sekarang adalah packing',
    imageUrl: null,
    isRead: true,
    data: null,
    createdAt: '2021-09-16T16:53:09.336Z',
    updatedAt: '2021-10-22T07:20:27.949Z',
    deletedAt: null,
  },
  {
    id: '45714',
    userId: '3',
    type: 'payment',
    description: 'Pembayaran untuk Pesanan S020003000105612 gagal.',
    imageUrl: null,
    isRead: true,
    data: null,
    createdAt: '2021-09-16T12:47:55.543Z',
    updatedAt: '2021-10-22T07:20:27.949Z',
    deletedAt: null,
  },
  {
    id: '44499',
    userId: '3',
    type: 'payment',
    description: 'Pembayaran untuk Pesanan S020003186305452 gagal.',
    imageUrl: null,
    isRead: true,
    data: null,
    createdAt: '2021-08-04T10:52:38.753Z',
    updatedAt: '2021-10-22T07:20:27.949Z',
    deletedAt: null,
  },
  {
    id: '44497',
    userId: '3',
    type: 'payment',
    description:
      'Virtual Account untuk Pesanan S020003186305452 sudah tidak aktif. Pesanan Anda otomatis dibatalkan. Silahkan lakukan pemesanan kembali.',
    imageUrl: null,
    isRead: true,
    data: null,
    createdAt: '2021-08-04T10:52:38.444Z',
    updatedAt: '2021-10-22T07:20:27.949Z',
    deletedAt: null,
  },
  {
    id: '44409',
    userId: '3',
    type: 'payment',
    description:
      'Pesanan S020003186305452 sukses. Klik disini untuk melakukan pembayaran dengan mengikuti petunjuk yang telah disediakan atau Pesanan Anda akan otomatis dibatalkan.',
    imageUrl: null,
    isRead: true,
    data: null,
    createdAt: '2021-08-03T10:52:37.209Z',
    updatedAt: '2021-10-22T07:20:27.949Z',
    deletedAt: null,
  },
  {
    id: '44241',
    userId: '3',
    type: 'payment',
    description: 'Pesanan S010001191305405 sukses.',
    imageUrl: null,
    isRead: true,
    data: null,
    createdAt: '2021-07-30T04:00:11.261Z',
    updatedAt: '2021-10-22T07:20:27.949Z',
    deletedAt: null,
  },
  {
    id: '44158',
    userId: '3',
    type: 'payment',
    description: 'Pesanan S010001191305394 sukses.',
    imageUrl: null,
    isRead: true,
    data: null,
    createdAt: '2021-07-29T08:34:43.493Z',
    updatedAt: '2021-10-22T07:20:27.949Z',
    deletedAt: null,
  },
  {
    id: '44156',
    userId: '3',
    type: 'payment',
    description: 'Pesanan S010001191305393 sukses.',
    imageUrl: null,
    isRead: true,
    data: null,
    createdAt: '2021-07-29T08:33:45.931Z',
    updatedAt: '2021-10-22T07:20:27.949Z',
    deletedAt: null,
  },
  {
    id: '44154',
    userId: '3',
    type: 'payment',
    description: 'Pesanan S010001191305392 sukses.',
    imageUrl: null,
    isRead: true,
    data: null,
    createdAt: '2021-07-29T08:30:47.685Z',
    updatedAt: '2021-10-22T07:20:27.949Z',
    deletedAt: null,
  },
  {
    id: '44056',
    userId: '3',
    type: 'payment',
    description: 'Pesanan S020003191105375 sukses.',
    imageUrl: null,
    isRead: true,
    data: null,
    createdAt: '2021-07-22T12:15:28.300Z',
    updatedAt: '2021-10-22T07:20:27.949Z',
    deletedAt: null,
  },
];

interface IDataObj {
  supplierName: string;
  approvalStatus: string;
  reasons: string;
}

interface IDataMock {
  id: string;
  userId: string;
  type: string;
  description: string;
  imageUrl: string;
  isRead: boolean;
  data: IDataObj;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

/** === COMPONENT === */
const NotificationView: React.FC = () => {
  /** === HOOK === */
  // SET APPROVAL STATUS TITLE
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
  const renderItem = ({ item, index }: { item: IDataMock; index: number }) => {
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
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={NotificationStyle.boxFlatlist}
          data={dataMock}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          // refreshing={this.props.notification.refreshGetNotification}
          // onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.1}
          // onEndReached={this.onHandleLoadMore.bind(this)}
          ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator
        />
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {renderContent()}
      {/* {renderEmpty()} */}
      {/* {<LoadingPage />} */}
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
