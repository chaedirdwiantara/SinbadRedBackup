import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  color,
  SnbImageCompressor,
  SnbCarouselIndicator2,
} from 'react-native-sinbad-ui';
const { width } = Dimensions.get('window');
import * as models from '@models';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { usePrevious } from '@core/functions/hook/prev-value';
/** === INTERFACE === */
interface PropsData {
  data: models.BannerSliderSuccessProps[];
  loading: boolean;
  seeAll: () => void;
  goToDetail: (data: models.BannerSliderSuccessProps) => void;
}

const BannerSlider: React.FC<PropsData> = (props) => {
  /** === STATE === */
  const [staticData, setStaticData] = React.useState(props.data);
  const [scrollData, setScrollData] = React.useState<
    models.BannerSliderSuccessProps[]
  >([props.data[props.data.length - 1], ...props.data, props.data[0]]);
  const [page, setPage] = React.useState(0);
  const [layoutWidth, setLayoutWidth] = React.useState(0);
  const [contentOffsetWidth, setContentOffsetWidth] = React.useState(0);
  const [useScroll, setUseScroll] = React.useState(false);
  /** == HOOK === */
  const prevOffsetWidth = usePrevious(contentOffsetWidth);
  const carouselRef = React.useRef();
  const scrollViewRef = React.useRef<ScrollView>(null);
  const autoScrollTime: any = React.useRef(null);
  const endDragTime: any = React.useRef(null);
  /** === EFFECT === */
  React.useEffect(() => {
    setStaticData(props.data);
    setScrollData([
      props.data[props.data.length - 1],
      ...props.data,
      props.data[0],
    ]);
  }, [props.data]);

  React.useEffect(() => {
    clearAutoScrollTime();
    clearEndDragTime();
    return () => {
      clearAutoScrollTime();
      clearEndDragTime();
    };
  }, []);

  React.useEffect(() => {
    if (page !== staticData.length + 1 && !useScroll) {
      clearAutoScrollTime();
      clearEndDragTime();
      autoScrollTime.current = setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: layoutWidth * (page + 1),
          animated: true,
        });
      }, 3000);
    } else if (page === staticData.length + 1) {
      scrollViewRef.current?.scrollTo({
        x: layoutWidth,
        animated: false,
      });
      setPage(1);
    } else if (page === 0 && useScroll) {
      scrollViewRef.current?.scrollTo({
        x: layoutWidth * staticData.length,
        animated: false,
      });
      setPage(staticData.length);
    }
  }, [page]);

  React.useEffect(() => {
    if (prevOffsetWidth < contentOffsetWidth) {
      calculatePage('next');
    } else if (prevOffsetWidth > contentOffsetWidth && useScroll) {
      calculatePage('prev');
    }
  }, [contentOffsetWidth]);
  /** === FUNCTION === */
  /** => calculate page */
  const calculatePage = (type: 'next' | 'prev') => {
    const a = contentOffsetWidth / layoutWidth;
    if (type === 'next') {
      const b = Math.abs(a - (page + 1));
      if (b <= 0.0001) {
        setPage(page + 1);
      }
    } else {
      const b = Math.abs(a - (page - 1));
      if (b <= 0.0001) {
        setPage(page - 1);
      }
    }
  };
  /** => when layout scroll */
  const whenScrolling = ({ contentOffset, layoutMeasurement }: any) => {
    setContentOffsetWidth(contentOffset.x);
    setLayoutWidth(layoutMeasurement.width);
  };
  /** => clear auto scroll time */
  const clearAutoScrollTime = () => {
    if (autoScrollTime.current) {
      clearTimeout(autoScrollTime.current);
    }
  };
  /** => clear drag time */
  const clearEndDragTime = () => {
    if (endDragTime.current) {
      clearTimeout(endDragTime.current);
    }
  };
  /** => first page */
  const scrollToInitialPosition = (nativeEvent: any) => {
    scrollViewRef.current?.scrollTo({
      x: nativeEvent.layout.width,
      animated: true,
    });
  };
  /** === VIEW === */
  /** => content item more */
  const contentMoreItem = () => {
    return (
      <ScrollView
        ref={scrollViewRef}
        onScroll={({ nativeEvent }) => whenScrolling(nativeEvent)}
        onScrollBeginDrag={() => {
          setUseScroll(true);
          clearAutoScrollTime();
          clearEndDragTime();
        }}
        onScrollEndDrag={() => {
          endDragTime.current = setTimeout(() => {
            if (page + 1 === staticData.length + 1) {
              scrollViewRef.current?.scrollTo({
                x: layoutWidth * (page + 1),
                animated: true,
              });
              setUseScroll(false);
            } else {
              scrollViewRef.current?.scrollTo({
                x: layoutWidth * (page + 1),
                animated: true,
              });
              setUseScroll(false);
              setPage(page + 1);
            }
          }, 5000);
        }}
        onLayout={({ nativeEvent }) => scrollToInitialPosition(nativeEvent)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={0}>
        {scrollData.map((data, index) => {
          return contentItem(data, index);
        })}
      </ScrollView>
    );
  };
  /** => bottomAction */
  const bottomAction = () => {
    return (
      <View style={styles.bottomAction}>
        <SnbCarouselIndicator2
          carouselRef={carouselRef}
          dotsLength={staticData.length}
          activeDotIndex={page - 1}
          buttonTitle="Lihat Semua"
          onPressButton={props.seeAll}
        />
      </View>
    );
  };
  /** => content item */
  const contentItem = (
    data: models.BannerSliderSuccessProps,
    index: number,
  ) => {
    return (
      <View key={index} style={{ width }}>
        <TouchableWithoutFeedback onPress={() => props.goToDetail(data)}>
          <View>
            <SnbImageCompressor
              defaultSource={require('../../src/assets/images/banner/sinbad-default-banner.png')}
              uri={data?.imageUrl}
              style={styles.imageBanner}
              res={500}
              resizeMode={'contain'}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  /** => content one */
  const contentOne = () => {
    return contentItem(props.data[0], 0);
  };
  /** => content more */
  const contentMore = () => {
    return (
      <>
        {contentMoreItem()}
        {bottomAction()}
      </>
    );
  };
  /** => loading */
  const loading = () => {
    return (
      <Image
        source={require('../../src/assets/images/banner/sinbad-default-banner.png')}
        style={styles.imageBanner}
      />
    );
  };
  /** => process */
  const process = () => {
    return props.loading ? loading() : content();
  };
  /** => content */
  const content = () => {
    return props.data.length === 0
      ? loading()
      : props.data.length > 1
      ? contentMore()
      : contentOne();
  };
  /** => main */
  return <>{process()}</>;
};

const styles = StyleSheet.create({
  bottomAction: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
  },
  imageBanner: {
    height: undefined,
    width: '100%',
    aspectRatio: 2 / 1,
  },
});

export default BannerSlider;
