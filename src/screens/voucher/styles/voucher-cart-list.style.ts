import { StyleSheet } from 'react-native';
import { borderV2, color, colorV2, spacingV2 } from 'react-native-sinbad-ui';

export const VoucherCartListStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: color.white,
    marginTop: 8,
  },
  cardContainer: {
    marginBottom: 32,
  },
  emptyContainer: {
    backgroundColor: colorV2.bgColor.light,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
    paddingHorizontal: 49,
    height: '100%',
  },
  emptyImage: {
    width: 240,
    height: 240,
    marginBottom: spacingV2.spacing.xl,
  },
  emptyTitle: {
    marginBottom: spacingV2.spacing.sm,
  },
  footerMiniInfobar: {
    paddingHorizontal: spacingV2.spacing.md,
    paddingVertical: spacingV2.spacing.lg,
    margin: spacingV2.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderV2.radius.full,
    backgroundColor: colorV2.bgColor.yellow,
  },
  iconLeft: {
    marginRight: spacingV2.spacing.sm,
  },
  infobarDescription: {
    flex: 1,
  },
});
