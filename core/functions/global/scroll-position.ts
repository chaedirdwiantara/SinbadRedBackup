/** === IMPORT PACKAGES ===  */
import { NativeScrollEvent } from 'react-native';
/** === FUNCTIONS ===  */
export const scrollHasReachedEnd = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  return (
    Math.round(layoutMeasurement.height + contentOffset.y) ===
    Math.round(contentSize.height)
  );
};
