/** === IMPORT PACKAGE HERE === */
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => go back */
const goBack = () => {
  NavigationAction.back();
};

/** => Navigation related */
const goToQuestDetail = ({ questId }: { questId: number }) => {
  NavigationAction.navigate('QuestDetailView', { questId });
};

const MoneyFormatSpace = (money: number) => {
  return `Rp ${money
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&.')
    .slice(0, -3)}`;
};

export { goBack, goToQuestDetail, MoneyFormatSpace };
