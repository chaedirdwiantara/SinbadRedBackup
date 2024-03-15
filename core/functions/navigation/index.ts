/** === IMPORT PACKAGE HERE === */
import {
  navigate,
  back,
  backToFirst,
  goToMenu,
  backToPage,
  resetToHome,
  resetToIntroSinbad,
  resetToForceUpdate,
  resetToMaintenance,
  resetToBannedAccount,
  getRoutes,
  restartApp,
} from '../../navigations/RootNavigation';
import {
  useGetNavParams,
  useCustomBackHardware,
  useFocusEffect,
} from './navigation-hook.function';
/** === EXPORT ALL === */
export const NavigationAction = {
  navigate,
  back,
  backToFirst,
  goToMenu,
  backToPage,
  resetToHome,
  resetToIntroSinbad,
  resetToForceUpdate,
  resetToMaintenance,
  getRoutes,
  useGetNavParams,
  useCustomBackHardware,
  useFocusEffect,
  resetToBannedAccount,
  restartApp,
};
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
