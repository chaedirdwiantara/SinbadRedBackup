import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SnbContainer, SnbText, color } from 'react-native-sinbad-ui';
import Svg from '@svg';

const { width } = Dimensions.get('window');

interface Props {
  data: any;
}

const OnBoardingView: React.FC<Props> = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  /** === RENDER SLIDER PAGINATION DOT === */
  const pagination = () => {
    return (
      <View>
        <Pagination
          dotsLength={props.data.length}
          activeDotIndex={activeIndex}
          dotContainerStyle={{ marginHorizontal: 2 }}
          dotStyle={styles.activeDot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View>
    );
  };
  /** === RENDER MAIN CONTENT ITEM SLIDE === */
  const renderItem = (item: any, index: any) => {
    return (
      <View key={index}>
        <View style={styles.description}>
        <View style={{ marginVertical: 10 }} />
          <Svg name={item.image} size={240} />
          <SnbText.H4 align="center">{item.title}</SnbText.H4>
          <View style={{ marginVertical: 10 }} />
          <SnbText.B3 align="center" color={color.black60}>
            {item.message}
          </SnbText.B3>
        </View>
      </View>
    );
  };
  /** === RENDER MAIN CONTENT SLIDE === */
  const renderData = () => {
    return (
      <View>
        <Carousel
          data={props.data}
          sliderWidth={1 * width}
          itemWidth={width}
          renderItem={({ item, index }) => renderItem(item, index)}
          onSnapToItem={(index) => {
            setActiveIndex(index);
          }}
          enableSnap={true}
          autoplayInterval={3000}
          slideStyle={{ padding: 10 }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          loop
          enableMomentum={false}
          lockScrollWhileSnapping={true}
          loopClonesPerSide={props.data.length}
          autoplay
          activeSlideAlignment={'center'}
        />
        <View style={styles.boxPage}>{pagination()}</View>
      </View>
    );
  };
  /** === MAIN ==== */
  return (
    <SnbContainer color="white">
      <View style={styles.mainContainer}>
        <View>{renderData()}</View>
      </View>
    </SnbContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  boxPage: {
    alignItems: 'center',
  },
  /** Pagination */
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: color.red50,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: color.black40,
  },
  description: {
    alignItems: 'center',
  },
});

export default OnBoardingView;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: tyo
 * createdDate: 02022022
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> create component onBoardSlider
 *
 */
