/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};
/** => go to banner list */
const goToBanner = () => {
  NavigationAction.navigate('BannerListView');
};
/** => go to banner Detail */
const goToBannerDetail = (id: number) => {
  NavigationAction.navigate('BannerDetailView', { bannerId: id });
};

export { goBack, goToBanner, goToBannerDetail };
