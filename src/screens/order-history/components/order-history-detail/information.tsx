import React from 'react';
import { colorV2, Text, SnbButton2 } from '@sinbad/react-native-sinbad-ui';
import { View, StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
  testID?: string;
};

export const Header = (props: HeaderProps) => {
  const { title, testID } = props;
  return <Text.Title text={title} withDivider={true} testID={testID} />;
};

type HeaderLinkProps = {
  title: string;
  linkTitle: string;
  testID?: string;
  linkOnPress: () => void;
};

export const HeaderWithLink = (props: HeaderLinkProps) => {
  const { title, linkTitle, testID, linkOnPress } = props;
  return (
    <Text.Title
      text={title}
      withDivider={true}
      testID={testID}
      actionComponent={
        <SnbButton2.Link
          title={linkTitle}
          size="medium"
          onPress={linkOnPress}
        />
      }
    />
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
      <Text.DetailPrice type="item" label={title} value={value} />
    </View>
  );
};

export const Divider = () => <View style={styles.div} />;

const styles = StyleSheet.create({
  text: { flex: 1 },
  desc: {
    marginTop: 8,
  },
  div: {
    height: 8,
    backgroundColor: colorV2.bgColor.neutral,
  },
});
