/** === IMPORT FUNCTION === */
import { NavigationAction } from '@navigation';
/** === FUNCTIONS === */
const goToHome = () => {
  NavigationAction.resetToHome();
};

export { goToHome };
