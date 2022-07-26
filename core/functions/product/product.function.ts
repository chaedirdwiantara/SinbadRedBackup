/** === IMPORT FUNCTION ===  */
import { NavigationAction } from '@navigation';
/** === IMPORT TYPES ===  */
import {
  LayoutDisplay,
  BottomActionPressHandler,
} from '@core/components/product/list/BottomAction';
/** === TYPES ===  */
type BottomActionType = 'sort' | 'filter' | 'layout' | 'category';
interface BuildBottomActionParams {
  sort?: boolean;
  filter?: boolean;
  layout?: boolean;
  category?: boolean;
  sortActive?: boolean;
  filterActive?: boolean;
  layoutDisplay?: LayoutDisplay;
}

interface BottomActionItem {
  iconName: string;
  title: string;
  dotShow?: boolean;
}

interface ProductDetailParams {
  id: string;
  warehouseId: string;
}

interface BuildBottomActionHandlerParams {
  onActionPress: BottomActionPressHandler;
  actionNames: Array<BottomActionType>;
}
/** === FUNCTIONS ===  */
/** === Bottom Action Related ===  */
export const buildBottomAction = ({
  sort = false,
  filter = false,
  layout = false,
  category = false,
  sortActive = false,
  filterActive = false,
  layoutDisplay = 'grid',
}: BuildBottomActionParams) => {
  const actions: Array<BottomActionItem> = [];
  const actionNames: Array<BottomActionType> = [];

  if (sort) {
    actions.push({ iconName: 'sort', title: 'Urutkan', dotShow: sortActive });
    actionNames.push('sort');
  }

  if (filter) {
    actions.push({
      iconName: 'filter_list',
      title: 'Filter',
      dotShow: filterActive,
    });
    actionNames.push('filter');
  }

  if (layout) {
    actions.push({
      iconName: layoutDisplay === 'grid' ? 'view_module' : 'view_list',
      title: layoutDisplay === 'grid' ? 'Grid' : 'List',
    });
    actionNames.push('layout');
  }

  if (category) {
    actions.push({ iconName: 'category', title: 'Kategori' });
    actionNames.push('category');
  }

  return { actions, actionNames };
};

export const buildBottomActionHandler = ({
  onActionPress,
  actionNames,
}: BuildBottomActionHandlerParams) => {
  return (index: number) => {
    const type = actionNames[index];
    onActionPress({ type });
  };
};

/** === Navigation Related ===  */
export const goBack = () => {
  NavigationAction.back();
};

export const goToHome = () => {
  NavigationAction.navigate('HomeView');
};

export const goToSearch = () => {
  NavigationAction.navigate('SearchView');
};

export const goToShoppingCart = () => {
  NavigationAction.navigate('OmsShoppingCartView');
};

export const goToProductDetail = ({ id, warehouseId }: ProductDetailParams) => {
  NavigationAction.navigate('ProductDetailView', { id, warehouseId });
};

export const backToLogin = () => {
  NavigationAction.navigate('LoginPhoneView');
};

export const goToCheckout = () => {
  NavigationAction.navigate('OmsCheckoutView');
};

export const goToPaymentMethod = () => {
  NavigationAction.navigate('OmsPaymentMethod');
};
