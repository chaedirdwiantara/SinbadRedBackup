/** === IMPORT TYPES ===  */
import {
  LayoutDisplay,
  BottomActionPressHandler,
  BottomActionType,
} from '@core/components/product/list/bottom-action.view';
/** === TYPES ===  */
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

interface GetBottomActionHandlerParams {
  onActionPress: BottomActionPressHandler;
  actionNames: Array<BottomActionType>;
  layoutDisplay: LayoutDisplay;
}
/** === FUNCTIONS ===  */
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
      iconName: layoutDisplay === 'grid' ? 'view_list' : 'view_module',
      title: layoutDisplay === 'grid' ? 'List' : 'Grid',
    });
    actionNames.push('layout');
  }

  if (category) {
    actions.push({ iconName: 'category', title: 'Kategori' });
    actionNames.push('category');
  }

  return { actions, actionNames };
};

export const getBottomActionHandler = ({
  onActionPress,
  actionNames,
  layoutDisplay,
}: GetBottomActionHandlerParams) => {
  return (index: number) => {
    const type = actionNames[index];

    if (type === 'layout') {
      onActionPress({
        type: 'layout',
        value: layoutDisplay === 'grid' ? 'list' : 'grid',
      });
    } else {
      onActionPress({ type });
    }
  };
};
