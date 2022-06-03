import PropTypes from 'prop-types';
import { SnbRecord, SnbSetAttribute } from '@core/report/moengage/index';
import ReactMoE from 'react-native-moengage';

export function trackUserLogin(props) {
  const { data, eventName } = props;
  ReactMoE.setAlias(data.data.user.id);
  ReactMoE.setUserUniqueID(data.data.user.id);
  ReactMoE.setUserName(data.data.user.name);
  ReactMoE.setUserContactNumber(data.mobilePhone);

  const neededData = {
    owner_mobile_number: data.mobilePhone,
  };
  SnbRecord(eventName, neededData);
  SnbSetAttribute(neededData);
}

export function trackUserLogout(props) {
  const { data, eventName } = props;

  const neededData = {
    owner_mobile_number: data.mobilePhone,
  };
  SnbRecord(eventName, neededData);
  ReactMoE.logout();
}

trackUserLogin.propTypes = {
  loginType: PropTypes.string,
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      fullName: PropTypes.string,
      mobilePhoneNo: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

trackUserLogout.propTypes = {
  data: PropTypes.shape({
    user_phone_number: PropTypes.string,
  }),
};
