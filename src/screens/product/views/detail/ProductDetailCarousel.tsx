/** === IMPORT PACKAGES ===  */
import React, { FC, useRef, useState, useMemo } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { SnbCarousel, SnbCarouselIndicator2 } from 'react-native-sinbad-ui';
/** === IMPORT TYPE ===  */
import * as models from '@models';
/** === IMPORT STYLE ===  */
import { ProductDetailStyle } from '@screen/product/styles';
/** === TYPE ===  */
interface ProductDetailCarouselProps {
  images: Array<models.ProductImage>;
}
/** === CONSTANT ===  */
const { width } = Dimensions.get('window');
/** === COMPONENT ===  */
export const ProductDetailCarousel: FC<ProductDetailCarouselProps> = ({
  images = [],
}) => {
  /** === HOOKS === */
  const carouselRef = useRef();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageUrls = useMemo(() => images.map((image) => image.url), [images]);
  /** === VIEW === */
  /** => Carousel Item */
  const renderCarouselItem = ({ item }: { item: string }) => (
    <Image
      defaultSource={require('../../../../assets/images/sinbadopacity.png')}
      source={{ uri: item }}
      style={{ width: width, height: width }}
      resizeMode="contain"
    />
  );
  /** => Main */
  return (
    <View style={{ height: width }}>
      <View style={{ flex: 1 }}>
        <SnbCarousel
          carouselRef={carouselRef}
          data={imageUrls}
          renderItem={renderCarouselItem}
          itemWidth={width}
          sliderWidth={width}
          setCurrentActive={setActiveImageIndex}
          loop={true}
        />
      </View>
      <View style={ProductDetailStyle.carouselIndicatorContainer}>
        <SnbCarouselIndicator2
          carouselRef={carouselRef}
          dotsLength={images.length}
          activeDotIndex={activeImageIndex}
        />
      </View>
    </View>
  );
};
