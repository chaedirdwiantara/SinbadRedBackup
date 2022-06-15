import React, { memo, useState, useRef, useCallback, FC } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import {
  SnbText2,
  SnbBadge2,
  colorV2,
  spacingV2,
} from '@sinbad/react-native-sinbad-ui';
import Svg from '@svg';
import { toCurrency } from '@core/functions/global/currency-format';
// TYPES
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
  onExpand?: (isExpand: boolean) => void;
};
// VAR
const { textColor, strokeColor } = colorV2;
const { spacing } = spacingV2;
// COMPONENT
const ListPrice: FC<ListPriceProps> = (props) => (
  <View style={styles.listBulkPrice}>
    <SnbText2.Paragraph.Small color={textColor.secondary}>
      {props.label}
    </SnbText2.Paragraph.Small>
    <SnbText2.Paragraph.Small>
      {toCurrency(props.price, { withFraction: false })}
    </SnbText2.Paragraph.Small>
  </View>
);

const EndListPrice: FC<ListPriceProps> = (props) => (
  <View style={styles.listBulkPrice}>
    <SnbText2.Body.Small color={textColor.selected}>
      {props.label}
    </SnbText2.Body.Small>
    <View style={styles.cheapPrice}>
      <View style={{ marginRight: 8 }}>
        <SnbBadge2 type="error" title="Paling Murah!" />
      </View>
      <SnbText2.Body.Small color={textColor.selected}>
        {toCurrency(props.price, { withFraction: false })}
      </SnbText2.Body.Small>
    </View>
  </View>
);

const BulkPricingList: FC<BulkPriceListProps> = ({ bulkPrices, onExpand }) => {
  const [show, setShow] = useState(true);
  const [fristInitialHeight, setFristInitialHeight] = useState(false);
  const animatedController = useRef(new Animated.Value(1)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState<number>(0);

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
    onExpand && onExpand(!show);
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
        <SnbText2.Body.Default>Harga Grosir</SnbText2.Body.Default>
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
            <SnbText2.Body.Small>Order</SnbText2.Body.Small>
            <SnbText2.Body.Small>Harga Grosir</SnbText2.Body.Small>
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
    marginHorizontal: spacing.lg,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: spacing.md,
  },
  card: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: strokeColor.default,
    padding: spacing.md,
  },
  titleBulkPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginBottom: 2,
    borderColor: strokeColor.default,
  },
  listBulkPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    alignItems: 'center',
  },
  cheapPrice: { flexDirection: 'row', alignItems: 'center' },
});

export default memo(BulkPricingList);
