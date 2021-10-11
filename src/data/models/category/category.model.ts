/** === CATEGORY HOME === */
export interface CategoryHome {
  id: string;
  name: string;
  icon: string;
  hasChild: boolean;
}
/** === CATEGORY PAGE LEVEL 3 ===  */
export interface CategoryLevel3 {
  id: string;
  name: string;
  icon: string;
  hasChild: false;
  child: [];
}
/** === CATEGORY PAGE LEVEL 2 ===  */
export interface CategoryLevel2 {
  id: string;
  name: string;
  icon: string;
  hasChild: boolean;
  child: CategoryLevel3[];
}
/** === CATEGORY PAGE LEVEL 1 ===  */
export interface CategoryLevel {
  id: string;
  name: string;
  icon: string;
  hasChild: boolean;
  child: CategoryLevel2[];
}
