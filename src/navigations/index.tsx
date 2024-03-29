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
import OmsNav from './oms.navigation';
import OrderHistoryNav from './order-history.navigation';
import AccountNav from './account.navigation';

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
  ...OmsNav,
  ...OrderHistoryNav,
  ...AccountNav,
};

export default index;
