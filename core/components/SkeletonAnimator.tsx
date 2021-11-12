/** === IMPORT PACKAGES === */
import React, { FC, useRef, useEffect, Children, ReactElement } from 'react';
import { View, Animated, Easing } from 'react-native';
import { color } from 'react-native-sinbad-ui';
/** === TYPE === */
interface SkeletonAnimatorProps {
  backgroundColor?: string;
  minOpacity?: number;
  maxOpacity?: number;
}
/** === CONSTANT === */
const animationConfig = {
  duration: 1500,
  useNativeDriver: true,
  easing: Easing.ease,
};
/** === COMPONENTS === */
export const SkeletonAnimator: FC<SkeletonAnimatorProps> = ({
  backgroundColor = color.black10,
  minOpacity = 0.4,
  maxOpacity = 1,
  children,
}) => {
  /** === HOOKS AND DERIVED === */
  const opacityValue = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 1,
          ...animationConfig,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          ...animationConfig,
        }),
      ]),
    ),
  ).current;

  useEffect(() => {
    animationRef.start();

    return () => animationRef.stop();
  }, []);
  /** === VIEW === */
  /** => Children */
  const renderChildren = (element: ReactElement) => {
    return Children.map(element, (child, childIndex) => {
      const { style: childStyle } = child.props;

      if (child.props.children) {
        return (
          <View key={childIndex} style={childStyle}>
            {renderChildren(child.props.children as ReactElement)}
          </View>
        );
      } else {
        return (
          <View key={childIndex} style={[childStyle, { backgroundColor }]} />
        );
      }
    });
  };
  /** => Main */
  return (
    <Animated.View
      style={{
        opacity: opacityValue.interpolate({
          inputRange: [0, 1],
          outputRange: [maxOpacity, minOpacity],
        }),
      }}>
      {renderChildren(children as ReactElement)}
    </Animated.View>
  );
};
