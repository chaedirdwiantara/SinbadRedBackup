import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from 'react-native';
import { color, SnbText } from 'react-native-sinbad-ui';
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
  /** => pagination */
  const pagination = () => {
    return (
      <View style={styles.pagination}>
        {staticData.map((data, index) => {
          return (
            <View key={index} style={{ marginRight: 4 }}>
              {page === index + 1 ? (
                <View style={styles.dotActive} />
              ) : (
                <View style={styles.dot} />
              )}
            </View>
          );
        })}
      </View>
    );
  };
  /** => see more */
  const seeMore = () => {
    return (
      <TouchableOpacity onPress={props.seeAll} style={styles.buttonSeeMore}>
        <SnbText.B1>Lihat semua</SnbText.B1>
      </TouchableOpacity>
    );
  };
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
        {pagination()}
        {seeMore()}
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
          <Image
            defaultSource={require('../../src/assets/images/banner/sinbad-loading-image-banner.png')}
            source={{ uri: data?.imageUrl }}
            style={styles.imageBanner}
            resizeMode={'stretch'}
          />
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
  return <View style={styles.container}>{process()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  bottomAction: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
    padding: 16,
  },
  pagination: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 16,
    backgroundColor: color.black10,
  },
  dotActive: {
    width: 16,
    height: 8,
    borderRadius: 16,
    backgroundColor: color.white,
  },
  buttonSeeMore: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: color.white,
  },
  imageBanner: {
    height: undefined,
    width: '100%',
    aspectRatio: 8 / 5,
  },
});

export default BannerSlider;
