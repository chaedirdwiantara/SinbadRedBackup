/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to banner list */
const goToBanner = () => {
  NavigationAction.navigate('BannerView');
};
/** => go to banner list */
const goToBannerDetail = () => {
  NavigationAction.navigate('BannerDetailView');
};

export { goBack, goToBanner, goToBannerDetail };
