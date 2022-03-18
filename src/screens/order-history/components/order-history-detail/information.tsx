import React from 'react';
import { color, SnbText } from '@sinbad/react-native-sinbad-ui';
import { View, StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
};

export const Header = (props: HeaderProps) => {
  const { title } = props;
  return (
    <>
      <SnbText.B2>{title}</SnbText.B2>
      <View style={styles.divHeader} />
    </>
  );
};

type DescProps = {
  title: string;
  value: string;
};

export const Description = (props: DescProps) => {
  const { value, title } = props;
  return (
    <View style={styles.desc}>
      <View style={styles.text}>
        <SnbText.B3 color={color.black60} align="left">
          {title}
        </SnbText.B3>
      </View>
      <View style={styles.text}>
        <SnbText.B3 color={color.black60} align="right">
          {value}
        </SnbText.B3>
      </View>
    </View>
  );
};

export const Divider = () => <View style={styles.div} />;

const styles = StyleSheet.create({
  divHeader: {
    backgroundColor: color.black10,
    height: 1,
    marginVertical: 8,
  },
  text: { flex: 1 },
  desc: {
    flexDirection: 'row',
    marginTop: 8,
  },
  div: {
    height: 10,
    backgroundColor: color.black10,
  },
});
