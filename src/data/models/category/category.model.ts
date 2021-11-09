export interface CategoryHome {
  id: string;
  name: string;
  icon: string;
  hasChild: boolean;
}

export interface CategoryLevel3 {
  id: string;
  name: string;
  icon: string;
}

export interface CategoryLevel2 {
  id: string;
  name: string;
  icon: string;
  children: CategoryLevel3[];
}

export interface CategoryLevel {
  id: string;
  name: string;
  icon: string;
  children: CategoryLevel2[];
}
