import OmsNav from './oms.navigation';
import AuthNav from './auth.navigation';
import SharedNav from './shared.navigation';
import UserNav from './user.navigation';
import MerchantNav from './merchant.navigation';
import CategoryNav from './category.navigation';
import ProductNav from './product.navigation';
import PromoNav from './promo.navigation';
import BannerNav from './banner.navigation';

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
};

export default index;
