import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SnbText2, color } from 'react-native-sinbad-ui';

const { width } = Dimensions.get('window');

interface Props {
  data: any;
}

const OnBoardingView: React.FC<Props> = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  /** === RENDER SLIDER PAGINATION DOT === */
  const pagination = () => {
    return (
      <Pagination
        dotsLength={props.data.length}
        activeDotIndex={activeIndex}
        dotContainerStyle={{ marginHorizontal: 2 }}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  };
  /** === RENDER MAIN CONTENT ITEM SLIDE === */
  const renderItem = (item: any, index: any) => {
    return (
      <View key={index} style={styles.description}>
        <Image
          resizeMode="contain"
          source={item.image}
          style={{ height: 240 }}
        />
        <View style={{ marginVertical: 12 }} />
        <SnbText2.Headline.Large align="center">
          {item.title}
        </SnbText2.Headline.Large>
        <View style={{ marginVertical: 4 }} />
        <View style={{ paddingHorizontal: 32 }}>
          <SnbText2.Paragraph.Large align="center" color={color.black60}>
            {item.message}
          </SnbText2.Paragraph.Large>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
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
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        loop
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        loopClonesPerSide={props.data.length}
        autoplay
        activeSlideAlignment={'center'}
      />
      {pagination()}
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'flex-end',
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
