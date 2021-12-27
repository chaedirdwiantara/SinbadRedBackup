import React, { FC, useState } from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import {
  SnbContainer,
  SnbText,
  SnbIconHint,
  color,
} from 'react-native-sinbad-ui';
import { QuestDetailStyles } from '../styles';

interface DataProps {
  iconName: string;
  title: string;
  subTitle: string;
  status: string;
}
interface Props {
  activeIndex: number;
  completeIndex: number;
  data: DataProps[];
}

const StepperStatusDetail: FC<Props> = (props) => {
  /** === FUNCTION === */
  /** => check active */
  const checkActive = (index, item) => {
    let iconName = item.iconName;
    let bgColor = color.black10;
    let iconColor = color.black40;
    if (item.status === 'on_progress') {
      iconName = 'query_builder';
      bgColor = color.yellow50;
      iconColor = color.white;
    }
    return { bgColor, iconColor, iconName };
  };
  /** => check complete */
  const checkComplete = (index) => {
    if (index < props.completeIndex) {
      return true;
    }
    return false;
  };
  /** => check task done */
  const taskCompleted = () => {
    const filter = props.data.filter((item) => !item.title.includes('+1'));
    let res = 0;
    filter.forEach((item) => {
      if (item.status === 'done') {
        res += 0;
      } else {
        res += 1;
      }
    });

    return res === 0 ? true : false;
  };
  /** === VIEW === */
  /** render icon template */
  const renderIconTemplete = (index, item) => {
    return (
      <View
        style={[
          QuestDetailStyles.iconContainer,
          {
            backgroundColor:
              item.status === 'done'
                ? color.green60
                : checkActive(index, item).bgColor,
          },
        ]}>
        {item.status === 'done' ? (
          <SnbIconHint
            iconName={'check'}
            size={16}
            iconColor={color.white}
            badgeColor={'red'}
          />
        ) : (
          <SnbIconHint
            iconName={checkActive(index, item).iconName}
            size={16}
            iconColor={checkActive(index, item).iconColor}
            badgeColor={'red'}
          />
        )}
      </View>
    );
  };
  /** => render layout */
  const renderLayout = (index, item, taskCompleted) => {
    // render icon voucher
    if (index === props.data.length - 1) {
      return (
        <View style={QuestDetailStyles.layoutContainer}>
          <View
            style={{
              justifyContent: 'center',
              width: 40,
              alignItems: 'center',
            }}>
            <View style={{ position: 'absolute', top: 0, zIndex: 1000 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: taskCompleted ? color.green60 : color.black10,
                  borderWidth: 2,
                  backgroundColor: taskCompleted ? color.green60 : color.white,
                }}>
                <Image
                  style={{ height: 25, width: 25 }}
                  source={require('../../../assets/icons/quest/quest_coupon_yellow.png')}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              paddingTop: !item.subTitle ? 8 : 0,
              marginLeft: 4,
            }}>
            <SnbText.B4>{item.title}</SnbText.B4>
            <SnbText.B3 color={color.black60}>{item.subTitle}</SnbText.B3>
          </View>
        </View>
      );
    } else {
      // render icon task
      return (
        <View style={QuestDetailStyles.layoutContainer}>
          <View
            style={{
              justifyContent: 'center',
              width: 40,
              alignItems: 'center',
            }}>
            <View style={{ position: 'absolute', top: 0, zIndex: 1000 }}>
              {renderIconTemplete(index, item)}
            </View>
            {index !== props.data.length - 1 ? (
              <View
                style={{
                  width: 3,
                  flex: 1,
                  backgroundColor:
                    item.status === 'done' && index === props.data.length - 2
                      ? color.green60
                      : item.status === 'done'
                      ? color.green60
                      : checkActive(index + 1, item).bgColor,
                }}
              />
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              paddingTop: !item.subTitle ? 8 : 0,
              marginLeft: 8,
            }}>
            <SnbText.B4>{item.title}</SnbText.B4>
            <SnbText.B3 color={color.black60}>{item.subTitle}</SnbText.B3>
          </View>
        </View>
      );
    }
  };
  /** => render main view */
  return (
    <SnbContainer color="white">
      {props.data.map((data, index) => {
        return (
          <View key={index}>{renderLayout(index, data, taskCompleted())}</View>
        );
      })}
    </SnbContainer>
  );
};

export default StepperStatusDetail;
