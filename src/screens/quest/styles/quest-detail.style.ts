import { StyleSheet } from 'react-native';
import { color } from 'react-native-sinbad-ui';

const QuestStyles = StyleSheet.create({
  shadowForBox5: {
    borderWidth: 0,
    backgroundColor: color.white,
    shadowColor: color.black100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadowForBox10: {
    borderWidth: 0,
    backgroundColor: color.white,
    shadowColor: color.black100,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  },
  boxInfo: {
    position: 'absolute',
    zIndex: 0,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mainInfo: {
    top: 140,
    marginHorizontal: 16,
    marginBottom: 130,
    borderRadius: 8,
    padding: 16,
    backgroundColor: color.white,
  },
  boxInfoSeparator: {
    borderColor: color.black10,
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'dashed',
    marginVertical: 16,
  },
  rewardContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepperContainer: {
    paddingTop: 32,
    marginHorizontal: 16,
    borderBottomColor: color.black40,
    borderBottomWidth: 1,
  },

  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutContainer: {
    flexDirection: 'row',
    minHeight: 60,
  },
  completeIconBox: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  containerAddInfo: {
    flex: 1,
    padding: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    borderBottomColor: color.black40,
    borderBottomWidth: 1,
  },
  containerAddTitle: {
    flex: 1,
    width: 100,
    flexGrow: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  containerAddIcon: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  footerContent: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    height: 72,
    width: '100%',
    backgroundColor: color.white,
  },
  footerLeft: {
    flex: 1,
    flexGrow: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  footerRight: {
    flex: 1,
    flexGrow: 2,
    padding: 16,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    marginBottom: 16,
  },
  questTitle: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  titleWrapper: {
    marginTop: 24,
    marginHorizontal: 24,
    alignItems: 'center',
  },
  checkboxLabel: {
    margin: 8,
  },
  confirm: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  imageConfirm: {
    marginTop: 16,
    width: 222,
    height: 264,
    resizeMode: 'cover',
  },
  achievementContainer: {
    paddingTop: 32,
    marginHorizontal: 16,
  },
  boxAchievement: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: color.white,
  },
  achievementInfo: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  achievementImageBox: {
    width: 44,
    height: 44,
    borderRadius: 15,
    borderColor: '#E0E0E0',
    backgroundColor: color.black5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  boxAchievementSeparator: {
    borderColor: color.black40,
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'solid',
    marginHorizontal: 16,
  },
});

export default QuestStyles;
