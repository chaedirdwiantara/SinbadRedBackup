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
    flex: 1,
    backgroundColor: colorV2.bgColor.light,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 49,
  },
  emptyImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 1,
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
