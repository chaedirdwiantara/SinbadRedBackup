import OmsNav from './oms.navigation';
import AuthNav from './auth.navigation';
import SharedNav from './shared.navigation';
import UserNav from './user.navigation';
import MerchantNav from './merchant.navigation';
import CategoryNav from './category.navigation';
import ProductNav from './product.navigation';
import PromoNav from './promo.navigation';
import BannerNav from './banner.navigation';
import HistoryNav from './history.navigation';
import BrandNav from './brand.navigations';
import SearchNav from './search.navigation';
import VoucherNav from './voucher.navigation';

const index = {
  ...OmsNav,
  ...AuthNav,
  ...SharedNav,
  ...UserNav,
  ...MerchantNav,
  ...CategoryNav,
  ...ProductNav,
  ...PromoNav,
  ...BannerNav,
  ...HistoryNav,
  ...BrandNav,
  ...SearchNav,
  ...VoucherNav,
};

export default index;
