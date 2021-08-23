import React from 'react';
import { Animated } from 'react-native';
import { SnbSvgIcon } from 'react-native-sinbad-ui';
import { useNavigation } from '@react-navigation/native';

const SinbadIconBottomNav = () => {
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const { dangerouslyGetState } = useNavigation();
  const { index, routes } = dangerouslyGetState();

  if (routes[index].name === 'OmsShoppingCartView') {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 0,
      duration: 200,
    }).start();
  } else {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 10,
    }).start();
  }
  return (
    <Animated.View style={{ paddingBottom: 30, opacity: fadeAnim }}>
      <SnbSvgIcon name="sinbad" size={40} />
    </Animated.View>
  );
};

export default SinbadIconBottomNav;
