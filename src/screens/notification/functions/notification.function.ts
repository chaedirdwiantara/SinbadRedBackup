/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};

export { goBack };
