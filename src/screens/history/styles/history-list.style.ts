import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

export const HistoryStyle = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cardTimeBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 18,
    backgroundColor: color.red50,
    borderRadius: 2,
  },
  cardContainer: {
    marginTop: 4,
    marginBottom: 12,
    marginHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  cardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  cardBody: {
    flexDirection: 'row',
    marginBottom: 8,
    padding: 8,
    marginHorizontal: 16,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  cardActionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  cardAdditionalInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 8,
    backgroundColor: color.yellow10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
