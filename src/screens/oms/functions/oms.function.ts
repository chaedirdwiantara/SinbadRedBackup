/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};

export { goBack };
