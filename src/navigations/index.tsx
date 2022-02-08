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
import HelpNav from './help.navigation';
import NotificationNav from './notification.navigations';
import SupplierNav from './supplier.navigation';
import RecommendationNav from './recommendation.navigation';
import QuestNav from './quest.navigation';
import Omsv2Nav from './omsv2.navigation';

const index = {
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
  ...HelpNav,
  ...NotificationNav,
  ...SupplierNav,
  ...RecommendationNav,
  ...QuestNav,
  ...Omsv2Nav,
};

export default index;
