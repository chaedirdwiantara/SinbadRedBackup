import { StyleSheet } from 'react-native';
import { spacingV2 as layout } from '@sinbad/react-native-sinbad-ui';

const loginPhoneStyles = StyleSheet.create({
  choosenText: {
    marginVertical: layout.spacing['3xl'],
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: layout.spacing.lg,
  },
  line: {
    height: 1,
    backgroundColor: 'red',
    flex: 1,
  },
  registerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: layout.spacing.xl,
  },
});

export default loginPhoneStyles;
