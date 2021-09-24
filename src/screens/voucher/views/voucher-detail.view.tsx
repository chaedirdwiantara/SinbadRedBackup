import React, { FC } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import {
  color,
  SnbCardInfoType2,
  SnbContainer,
  SnbProgress,
  SnbText,
  SnbTopNav,
} from 'react-native-sinbad-ui';
import { goBack } from '../functions';
import { VoucherCartListStyles } from '../styles';
import moment from 'moment';
/** === DUMMIES === */
const dummies = {
  id: 1,
  imageUrl: 'string',
  expiredAt: '2021-07-31T16:59:00.000Z',
  voucherDescription:
    'SINBAD mengadakan diskon hingga 5% untuk pembelian ovaltine classic 20GR. Jangan sampai ketinggalan promo dari SINBAD! SINBAD mengadakan diskon hingga 5% untuk pembelian ovaltine classic 20GR. Jangan sampai ketinggalan promo dari SINBAD!',
  termsAndCondition: ['1', '2'],
  instructions: ['1'],
  voucherName: 'Voucher Cashback 10% Hanya di Sinbad',
  voucherHeader: 'Voucher Discount',
  voucherCode: 'VCH20',
};
const SnbTextSeeMore = (props) => {
  const [isShowAll, setShowAll] = React.useState(false);
  const [isShowToggle, setShowToggle] = React.useState(false);

  const handleToggleShow = () => {
    setShowAll(!isShowAll);
  };

  return (
    <View style={props.containerStyle}>
      <Text
        numberOfLines={isShowAll ? undefined : props.maxLine}
        ellipsizeMode={'tail'}
        onTextLayout={({ nativeEvent: { lines } }) => {
          if (lines.length > props.maxLine) {
            setShowToggle(true);
          }
        }}>
        {props.content}
      </Text>
      {isShowToggle ? (
        <TouchableOpacity
          onPress={() => handleToggleShow()}
          style={{ marginTop: 8 }}>
          <SnbText.B1 color={props.toggleColor}>
            {isShowAll ? props.toggleShowLess : props.toggleShowMore}
          </SnbText.B1>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};
/** === COMPONENT === */
const VoucherDetailView: FC = ({ route }: any) => {
  /** === HOOK === */
  /** => effect */
  React.useEffect(() => {}, []);
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3 type={'red'} backAction={() => goBack()} title={''} />
    );
  };
  /** => banner */
  const renderBanner = () => {
    return (
      <Image
        source={{
          uri: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/open-mic-night-facebook-event-banner-design-template-5a951f3dcd85d692ef014b7594d11498_screen.jpg?ts=1566599540',
        }}
        style={{
          height: 149,
          width: '100%',
        }}
      />
    );
  };
  /** => loading */
  const renderLoading = () => {
    return (
      <View style={VoucherCartListStyles.singleContainer}>
        <SnbProgress size={40} />
      </View>
    );
  };
  /** => voucher card information */
  const renderVoucherCardInformation = () => {
    return (
      <View style={{ marginTop: -40 }}>
        <SnbCardInfoType2.Header title={dummies.voucherName}>
          <SnbCardInfoType2.Row
            label={'Berlaku Sampai'}
            text={moment(new Date(dummies.expiredAt)).format('DD MMMM YYYY')}
          />
          <SnbCardInfoType2.Row
            label={'Kode Voucher'}
            text={dummies.voucherCode}
          />
        </SnbCardInfoType2.Header>
      </View>
    );
  };
  /** => voucher description */
  const renderVoucherDescription = () => {
    return (
      <SnbTextSeeMore
        containerStyle={{ marginHorizontal: 16, paddingVertical: 16 }}
        maxLine={3}
        toggleColor={color.red50}
        toggleShowMore={'Lihat Semua'}
        toggleShowLess={'Lihat Lebih Sedikit'}
        content={<SnbText.B1>{dummies.voucherDescription}</SnbText.B1>}
      />
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {renderBanner()}
      {renderVoucherCardInformation()}
      {renderVoucherDescription()}
    </SnbContainer>
  );
};

export default VoucherDetailView;
