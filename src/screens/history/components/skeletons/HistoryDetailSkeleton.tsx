/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { color, styles } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE === */
import { HistoryDetailStyle } from '@screen/history/styles';
/** === TYPE === */
interface SectionItemSkeletonParams {
  childrenWidths: [string, string];
  bottomSpaces?: number;
}
/** === COMPONENT === */
export const HistoryDetailSkeleton: FC = () => {
  const sectionItemSkeleton = ({
    childrenWidths,
    bottomSpaces,
  }: SectionItemSkeletonParams) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: bottomSpaces,
      }}>
      <View
        style={{ height: 12, borderRadius: 15, width: childrenWidths[0] }}
      />
      <View
        style={{ height: 12, borderRadius: 15, width: childrenWidths[1] }}
      />
    </View>
  );

  const lineSeparator = (horizontalSpaces: boolean = true) => (
    <View
      style={{
        paddingHorizontal: horizontalSpaces ? 16 : 0,
        marginBottom: 12,
      }}>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: color.black10,
          marginTop: 8,
        }}
      />
    </View>
  );

  const commonSection = () => (
    <View style={styles.shadowForBox10}>
      <SkeletonAnimator>
        <View style={HistoryDetailStyle.cardHeader}>
          <View style={{ height: 12, borderRadius: 15, width: '40%' }} />
          <View style={{ height: 12, borderRadius: 15, width: '30%' }} />
        </View>
        {lineSeparator()}
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}>
          {sectionItemSkeleton({
            childrenWidths: ['30%', '40%'],
            bottomSpaces: 12,
          })}
          {sectionItemSkeleton({ childrenWidths: ['30%', '35%'] })}
        </View>
      </SkeletonAnimator>
    </View>
  );

  return (
    <View>
      <View
        style={{
          marginBottom: 8,
          marginTop: 10,
          marginHorizontal: 16,
          borderRadius: 8,
          ...styles.shadowForBox10,
        }}>
        <SkeletonAnimator>
          <View style={HistoryDetailStyle.statusContent}>
            <View style={{ width: '80%' }}>
              <View
                style={{
                  height: 14,
                  borderRadius: 15,
                  width: '60%',
                  marginBottom: 12,
                }}
              />
              <View style={{ height: 14, borderRadius: 15, width: '80%' }} />
            </View>
            <View style={{ height: 20, borderRadius: 15, width: '10%' }} />
          </View>
        </SkeletonAnimator>
      </View>
      {commonSection()}
      <View style={{ height: 10, backgroundColor: color.black5 }} />
      <View style={styles.shadowForBox10}>
        <SkeletonAnimator>
          <View style={HistoryDetailStyle.cardHeader}>
            <View style={{ height: 12, borderRadius: 15, width: '50%' }} />
          </View>
          {lineSeparator()}
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: 16,
            }}>
            {sectionItemSkeleton({
              childrenWidths: ['30%', '35%'],
              bottomSpaces: 12,
            })}
            {sectionItemSkeleton({
              childrenWidths: ['35%', '45%'],
              bottomSpaces: 12,
            })}
            {sectionItemSkeleton({
              childrenWidths: ['40%', '40%'],
              bottomSpaces: 12,
            })}
            {sectionItemSkeleton({
              childrenWidths: ['25%', '20%'],
              bottomSpaces: 12,
            })}
            {sectionItemSkeleton({
              childrenWidths: ['30%', '20%'],
              bottomSpaces: 12,
            })}
            {sectionItemSkeleton({
              childrenWidths: ['20%', '35%'],
              bottomSpaces: 12,
            })}
            {sectionItemSkeleton({
              childrenWidths: ['30%', '40%'],
              bottomSpaces: 4,
            })}
            {lineSeparator(false)}
            {sectionItemSkeleton({
              childrenWidths: ['30%', '25%'],
              bottomSpaces: 12,
            })}
            {sectionItemSkeleton({
              childrenWidths: ['40%', '35%'],
            })}
          </View>
        </SkeletonAnimator>
      </View>
      <View style={{ height: 10, backgroundColor: color.black5 }} />
      {commonSection()}
    </View>
  );
};
