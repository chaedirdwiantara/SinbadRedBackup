import React from 'react';
import {
  colorV2,
  SnbText2,
  SnbDivider2,
  SnbBadge2,
} from '@sinbad/react-native-sinbad-ui';
import { View, StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
};

export const Header = (props: HeaderProps) => {
  const { title } = props;
  return (
    <>
      <SnbText2.Headline.Small>{title}</SnbText2.Headline.Small>
      <View style={{ marginVertical: 8 }}>
        <SnbDivider2 type="solid" />
      </View>
    </>
  );
};

type DescProps = {
  title: string;
  value: string | number;
};

export const Description = (props: DescProps) => {
  const { value, title } = props;
  return (
    <View style={styles.desc}>
      <View style={styles.text}>
        <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
          {title}
        </SnbText2.Paragraph.Default>
      </View>
      <View style={[styles.text, { alignItems: 'flex-end' }]}>
        <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
          {value}
        </SnbText2.Paragraph.Default>
      </View>
    </View>
  );
};

export const DescriptionBadge = (props: DescProps) => {
  const { value, title } = props;
  return (
    <View style={styles.desc}>
      <View style={styles.text}>
        <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
          {title}
        </SnbText2.Paragraph.Default>
      </View>
      <View style={[styles.text, { alignItems: 'flex-end' }]}>
        <SnbBadge2 type="neutral" title={value} />
      </View>
    </View>
  );
};

export const Divider = () => <View style={styles.div} />;

const styles = StyleSheet.create({
  text: { flex: 1, justifyContent: 'center' },
  desc: {
    flexDirection: 'row',
    marginTop: 8,
  },
  div: {
    height: 8,
    backgroundColor: colorV2.bgColor.neutral,
  },
});
