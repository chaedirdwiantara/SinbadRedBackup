import React, { memo, useState, useRef, useCallback, FC } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import { color, SnbText, SnbBadge } from '@sinbad/react-native-sinbad-ui';
import Svg from '@svg';
import { toCurrency } from '@core/functions/global/currency-format';
import { useProductContext } from 'src/data/contexts/product/useProductContext';

type BulkPriceData = {
  label: string;
  priceAfterTax: number;
  priceBeforeTax: number;
  qty: number;
  taxPrice: number;
};

type ListPriceProps = {
  label: string;
  price: number;
};

type BulkPriceListProps = {
  bulkPrices: Array<BulkPriceData>;
};

const ListPrice: FC<ListPriceProps> = (props) => (
  <View style={styles.listBulkPrice}>
    <SnbText.B3 color={color.black60}>{props.label}</SnbText.B3>
    <SnbText.B3>{toCurrency(props.price, { withFraction: false })}</SnbText.B3>
  </View>
);

const EndListPrice: FC<ListPriceProps> = (props) => (
  <View style={styles.listBulkPrice}>
    <SnbText.B3 color={color.red70}>{props.label}</SnbText.B3>
    <View style={styles.cheapPrice}>
      <View style={{ marginRight: 8 }}>
        <SnbBadge.Label type="error" value="Paling Murah!" />
      </View>
      <SnbText.B3 color={color.red70}>
        {toCurrency(props.price, { withFraction: false })}
      </SnbText.B3>
    </View>
  </View>
);

const BulkPricingList: FC<BulkPriceListProps> = ({ bulkPrices }) => {
  const [show, setShow] = useState(true);
  const [fristInitialHeight, setFristInitialHeight] = useState(false);
  const animatedController = useRef(new Animated.Value(1)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState<number>(0);

  // const {
  //   stateProduct: {
  //     detail: { data: dataProductDetail },
  //   },
  // } = useProductContext();

  const bodyHeightAnimate = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const bodyOpacityAnimate = animatedController.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0.5, 1],
  });

  const arrowAngleAnimate = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  const toggleShow = useCallback(() => {
    if (show) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,

        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,

        useNativeDriver: false,
      }).start();
    }
    setShow(!show);
  }, [show]);

  const onLayoutViewListPrice = useCallback(
    (event: LayoutChangeEvent) => {
      if (!fristInitialHeight) {
        setBodySectionHeight(event.nativeEvent.layout.height);
        setTimeout(() => setFristInitialHeight(true), 1000);
      }
      event.persist();
    },
    [fristInitialHeight],
  );

  return (
    <View style={styles.container}>
      {/* title */}
      <TouchableOpacity
        style={styles.containerTitle}
        onPress={toggleShow}
        activeOpacity={1}
        testID="collapse_bulk_pricing_list">
        <SnbText.B2>Harga Grosir</SnbText.B2>
        <Animated.View style={{ transform: [{ rotateZ: arrowAngleAnimate }] }}>
          <Svg name="expand_less" size={15} />
        </Animated.View>
      </TouchableOpacity>
      {/* list bulk pricing */}

      <Animated.View
        style={{ height: bodyHeightAnimate, opacity: bodyOpacityAnimate }}>
        <View style={styles.card} onLayout={onLayoutViewListPrice}>
          {/* title card */}
          <View style={styles.titleBulkPrice}>
            <SnbText.B3>Order</SnbText.B3>
            <SnbText.B3>Harga Grosir</SnbText.B3>
          </View>
          {/* list */}
          {bulkPrices.map((item, index) =>
            bulkPrices.length !== index + 1 ? (
              <ListPrice
                key={item.label + index}
                label={item.label}
                price={item.priceAfterTax}
              />
            ) : (
              <EndListPrice
                key={item.label + index}
                label={item.label}
                price={item.priceAfterTax}
              />
            ),
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 5,
  },
  card: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: color.black40,
    padding: 12,
  },
  titleBulkPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginBottom: 2,
    borderColor: color.black40,
  },
  listBulkPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 2,
    alignItems: 'center',
  },
  cheapPrice: { flexDirection: 'row', alignItems: 'center' },
});

export default memo(BulkPricingList);
