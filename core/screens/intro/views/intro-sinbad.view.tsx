/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SnbContainer, SnbText, SnbIcon, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION === */
import { goToHome, useSetIntroSinbad, whenScrolling } from '../functions';
/** === IMPORT STYLE HERE === */
import IntroStyle from '../styles/intro.style';
/** === IMPORT DATA === */
import IntroSinbadData from '../data/intro-sinbad.data';
/** === COMPONENT === */
const IntroSinbadView: React.FC = () => {
  /** === HOOK === */
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [page, setPage] = React.useState(1);
  const [layoutWidth, setLayoutWidth] = React.useState(0);
  const { setIntroSinbad } = useSetIntroSinbad();
  /** === EFFECT === */
  /** === VIEW === */
  /** => pagination */
  const pagination = () => {
    return (
      <View style={IntroStyle.introSinbadPagination}>
        <TouchableOpacity
          onPress={() => {
            setIntroSinbad(true);
            goToHome();
          }}>
          <SnbText.B1 color={color.white}>Lewati</SnbText.B1>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          {IntroSinbadData.map((data, index) => {
            return (
              <View key={index} style={{ marginRight: 4 }}>
                {page === index + 1 ? (
                  <View style={IntroStyle.dotActive} />
                ) : (
                  <View style={IntroStyle.dot} />
                )}
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (page === IntroSinbadData.length) {
              setIntroSinbad(true);
              goToHome();
            } else {
              scrollViewRef.current?.scrollTo({
                x: page * layoutWidth,
                animated: true,
              });
            }
          }}>
          <SnbIcon name={'arrow_forward'} size={32} color={color.white} />
        </TouchableOpacity>
      </View>
    );
  };
  /** => content item */
  const contentItem = (item: any, index: number) => {
    return (
      <View
        key={index}
        style={[
          IntroStyle.introSinbadContainer,
          { backgroundColor: item.color },
        ]}>
        <Image
          source={item.image}
          style={{ width: 200, height: 200, marginBottom: 16 }}
        />
        <SnbText.H4 color={color.white}>{item.title}</SnbText.H4>
        <View style={{ marginTop: 16, paddingHorizontal: 50 }}>
          <SnbText.B3 color={color.white} align={'center'}>
            {item.text}
          </SnbText.B3>
        </View>
      </View>
    );
  };
  /** => content */
  /** => main */
  return (
    <SnbContainer color="white">
      <ScrollView
        ref={scrollViewRef}
        onLayout={({ nativeEvent }) => {
          setLayoutWidth(nativeEvent.layout.width);
        }}
        onScroll={({ nativeEvent }) => {
          const pageScroll = whenScrolling(nativeEvent);
          setPage(pageScroll === 0 ? page : pageScroll);
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={0}>
        {IntroSinbadData.map((data, index) => {
          return contentItem(data, index);
        })}
      </ScrollView>
      {pagination()}
    </SnbContainer>
  );
};

export default IntroSinbadView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
