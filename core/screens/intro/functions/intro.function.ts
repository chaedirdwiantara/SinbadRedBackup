/** === IMPORT FUNCTION === */
import { NavigationAction } from '@navigation';
/** === FUNCTIONS === */
/** => navigation to home */
const goToHome = () => {
  NavigationAction.resetToHome();
};
/** => when scroll */
const whenScrolling = ({ contentOffset, layoutMeasurement }: any) => {
  const calculate = contentOffset.x / layoutMeasurement.width;
  if (calculate % 1 === 0) {
    return calculate + 1;
  }
  return 0;
};

export { goToHome, whenScrolling };
