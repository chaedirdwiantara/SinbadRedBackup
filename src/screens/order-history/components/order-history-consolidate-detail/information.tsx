import React from 'react';
import {
  colorV2,
  SnbText2,
  SnbDivider2,
  SnbBadge2,
  Text,
} from '@sinbad/react-native-sinbad-ui';
import { View, StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
  testID?: string;
};

export const Header = (props: HeaderProps) => {
  const { title, testID } = props;
  return <Text.Title text={title} withDivider={true} testID={testID} />;
};

type DescProps = {
  title: string;
  value: string;
  voucher?: boolean;
};

export const Description = (props: DescProps) => {
  const { value, title, voucher } = props;
  return (
    <View style={styles.desc}>
      <Text.DetailPrice
        type="item"
        label={title}
        value={value}
        color={
          voucher ? colorV2.textColor.success : colorV2.textColor.secondary
        }
      />
    </View>
  );
};

export const DescriptionBadge = (props: DescProps) => {
  const { value, title } = props;
  return (
    <View style={styles.descBadge}>
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
    marginTop: 8,
  },
  descBadge: {
    flexDirection: 'row',
    marginTop: 8,
  },
  div: {
    height: 8,
    backgroundColor: colorV2.bgColor.neutral,
  },
});
