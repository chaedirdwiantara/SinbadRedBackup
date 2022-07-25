import { colorV2, spacingV2 } from '@sinbad/react-native-sinbad-ui';
import { StyleSheet } from 'react-native';

export const VoucherAccordionStyles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingBottom: 9,
    marginBottom: spacingV2.spacing.lg,
    borderBottomColor: colorV2.strokeColor.default,
    borderBottomWidth: 1,
  },
  container: {
    backgroundColor: colorV2.bgColor.light,
  },
});
