import {
  MerchantDetailProfileView,
  MerchantDetailAccountView,
  MerchantDetailInformationView,
  MerchantSupplierInformationView,
  MerchantDetailAddressView,
} from '@screen/merchant/views/detail-merchant';
import {
  MerchantEditView,
  MerchantEditDataListView,
} from '@screen/merchant/views/edit-merchant';

const MerchantNav = {
  MerchantDetailProfileView: {
    component: MerchantDetailProfileView,
  },
  MerchantDetailInformationView: {
    component: MerchantDetailInformationView,
  },
  MerchantDetailAccountView: {
    component: MerchantDetailAccountView,
  },
  MerchantEditView: {
    component: MerchantEditView,
  },
  MerchantSupplierInformationView: {
    component: MerchantSupplierInformationView,
  },
  MerchantDetailAddressView: {
    component: MerchantDetailAddressView,
  },
  MerchantEditDataListView: {
    component: MerchantEditDataListView,
  },
};

export default MerchantNav;
